import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useLogout from '../Hooks/useLogout';

const Dashboard = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const [activeTab, setActiveTab] = useState('usage');
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);

  // Constants - FIXED: ₹0.10 per extraction, not 0.01
  const EXTRACTION_COST = 0.10; // ₹0.10 per extraction

  // State for real data
  const [userData, setUserData] = useState({
    credits: 0,
    totalExtractions: 0,
    apiKey: '',
    apiKeyCreated: '',
    name: '',
    email: ''
  });

  const [usageHistory, setUsageHistory] = useState([]);
  const [recentFields, setRecentFields] = useState([]);
  const [stats, setStats] = useState({
    totalExtractions: 0,
    totalCreditsUsed: 0,
    successfulExtractions: 0,
    failedExtractions: 0,
    thisMonth: 0
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

  // Create axios instance with auth header
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add token to requests
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch user data
        const userResponse = await api.get('/auth/me');
        const user = userResponse.data.user;
        const apiKey = userResponse.data.apiKey;
        
        setUserData({
          credits: user.credits || 0,
          totalExtractions: 0,
          apiKey: apiKey || '',
          apiKeyCreated: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A',
          name: user.name || '',
          email: user.email || ''
        });

        // Fetch usage stats
        const statsResponse = await api.get('/usage/stats');
        setStats(statsResponse.data);

        // Fetch usage history
        const usageResponse = await api.get('/usage/user?limit=20');
        const usage = usageResponse.data.usage || [];
        setUsageHistory(usage);

        // Calculate total extractions
        const totalExtractions = usage.length;
        
        setUserData(prev => ({
          ...prev,
          totalExtractions: totalExtractions
        }));

        // Calculate this month's extractions
        const now = new Date();
        const thisMonth = usage.filter(item => {
          const itemDate = new Date(item.createdAt);
          return itemDate.getMonth() === now.getMonth() && 
                 itemDate.getFullYear() === now.getFullYear();
        }).length;

        setStats(prev => ({
          ...prev,
          thisMonth: thisMonth
        }));

        // Extract recent fields from usage
        const fieldsMap = new Map();
        usage.forEach(item => {
          if (item.fields) {
            Object.keys(item.fields).forEach(field => {
              const count = fieldsMap.get(field) || 0;
              fieldsMap.set(field, count + 1);
            });
          }
        });

        const fieldsArray = Array.from(fieldsMap.entries())
          .map(([field, count]) => ({
            field,
            count,
            lastUsed: usage.find(u => u.fields && u.fields[field])?.createdAt || 'N/A'
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10);

        setRecentFields(fieldsArray);

        // Fetch payment history
        await fetchPaymentHistory();

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        if (err.response?.status === 401) {
          navigate('/login');
        } else {
          setError('Failed to load dashboard data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  // Fetch payment history
  const fetchPaymentHistory = async () => {
    try {
      const response = await api.get('/payment/history');
      if (response.data.success) {
        setPaymentHistory(response.data.transactions);
      }
    } catch (err) {
      console.error('Error fetching payment history:', err);
    }
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(userData.apiKey);
    alert('API key copied to clipboard!');
  };

  // RAZORPAY PAYMENT HANDLER
  const handleRazorpayPayment = async (amount) => {
    try {
      setProcessingPayment(true);
      console.log('💰 Starting payment for ₹', amount);

      // Step 1: Check if Razorpay is loaded
      if (!window.Razorpay) {
        console.log('Razorpay not loaded, loading script...');
        await loadRazorpayScript();
      }

      // Step 2: Create order on backend
      console.log('Creating order for amount:', amount);
      const orderResponse = await api.post('/payment/create-order', { amount });
      
      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.details || 'Failed to create order');
      }

      const { order, key_id } = orderResponse.data;
      console.log('Order created:', order);

      // Step 3: Prepare Razorpay options
      const options = {
        key: key_id,
        amount: order.amount,
        currency: order.currency,
        name: 'DigiMithra Autofill AI',
        description: `Add ₹${amount} credits`,
        order_id: order.id,
        image: 'https://digimithra.com/logo.png',
        handler: async (response) => {
          console.log('Payment successful:', response);
          
          try {
            // Step 4: Verify payment on backend
            const verifyResponse = await api.post('/payment/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: amount
            });

            if (verifyResponse.data.success) {
              alert(`✅ Payment successful! ₹${amount} credits added to your account.`);
              
              // Refresh user data
              const userResponse = await api.get('/auth/me');
              setUserData(prev => ({
                ...prev,
                credits: userResponse.data.user.credits
              }));

              // Refresh payment history
              await fetchPaymentHistory();
              
              setShowRechargeModal(false);
            } else {
              alert('❌ Payment verification failed');
            }
          } catch (error) {
            console.error('Verification error:', error);
            alert('Failed to verify payment');
          } finally {
            setProcessingPayment(false);
          }
        },
        prefill: {
          name: userData.name,
          email: userData.email,
        },
        theme: {
          color: '#000000'
        },
        modal: {
          ondismiss: () => {
            console.log('Payment modal dismissed');
            setProcessingPayment(false);
          },
          confirm_close: true
        }
      };

      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', (response) => {
        console.error('Payment failed:', response.error);
        alert(`Payment failed: ${response.error.description}`);
        setProcessingPayment(false);
      });

      razorpay.open();

    } catch (err) {
      console.error('Razorpay error:', err);
      alert(`Payment failed: ${err.response?.data?.details || err.message}`);
      setProcessingPayment(false);
    }
  };

  // Helper function to load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        console.log('Razorpay script loaded');
        resolve();
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay script');
        reject(new Error('Failed to load Razorpay script'));
      };
      document.body.appendChild(script);
    });
  };

  const handleRegenerateApiKey = async () => {
    try {
      const response = await api.post('/user/regenerate-api-key');
      setUserData(prev => ({
        ...prev,
        apiKey: response.data.apiKey
      }));
      localStorage.setItem('apiKey', response.data.apiKey);
      setShowRegenerateModal(false);
      alert('API key regenerated successfully!');
    } catch (err) {
      console.error('Regenerate API key error:', err);
      alert('Failed to regenerate API key');
    }
  };

  const handleLogout = () => {
    logout();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  // FIXED: Calculate document estimates based on credits
  // Formula: credits / cost per extraction = number of extractions
  // Example: 116.50 / 0.10 = 1165 extractions ✅
  const estimatedDocuments = Math.floor(userData.credits / EXTRACTION_COST);

  // Loading state
  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="text-danger mb-3">
            <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '3rem' }}></i>
          </div>
          <h4 className="mb-2">Error</h4>
          <p className="text-secondary">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn btn-dark rounded-0 mt-3"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Regenerate API Key Modal
  if (showRegenerateModal) {
    return (
      <div className="bg-white min-vh-100 d-flex align-items-center py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <button 
                onClick={() => setShowRegenerateModal(false)}
                className="btn btn-link text-dark p-0 mb-4 d-inline-flex align-items-center text-decoration-none"
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back to dashboard
              </button>

              <div className="border border-dark p-5 bg-white">
                <div className="text-center mb-4">
                  <div className="bg-dark text-white p-3 d-inline-flex mb-3" style={{ width: '70px', height: '70px' }}>
                    <i className="bi bi-exclamation-triangle fs-1"></i>
                  </div>
                  <h2 className="fw-bold mb-2">Regenerate API Key</h2>
                  <p className="text-secondary small">
                    This will invalidate your current API key. Any applications using the old key will stop working.
                  </p>
                </div>

                <div className="alert alert-warning border-0 rounded-0 mb-4">
                  <i className="bi bi-shield-exclamation me-2"></i>
                  This action cannot be undone!
                </div>

                <div className="d-flex gap-3">
                  <button 
                    className="btn btn-outline-dark w-100 rounded-0 py-3"
                    onClick={() => setShowRegenerateModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn btn-dark w-100 rounded-0 py-3"
                    onClick={handleRegenerateApiKey}
                  >
                    Yes, Regenerate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Recharge Modal
  if (showRechargeModal) {
    return (
      <div className="bg-white min-vh-100 d-flex align-items-center py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <button 
                onClick={() => setShowRechargeModal(false)}
                className="btn btn-link text-dark p-0 mb-4 d-inline-flex align-items-center text-decoration-none"
                disabled={processingPayment}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back to dashboard
              </button>

              <div className="border border-dark p-5 bg-white">
                <div className="text-center mb-4">
                  <div className="bg-dark text-white p-3 d-inline-flex mb-3" style={{ width: '70px', height: '70px' }}>
                    <i className="bi bi-credit-card fs-1"></i>
                  </div>
                  <h2 className="fw-bold mb-2">Add Credits</h2>
                  <p className="text-secondary small">Secure payment via Razorpay</p>
                  
                  {/* Debug info - remove in production */}
                  {/* <div className="mt-2 small text-muted">
                    {window.Razorpay ? '✅ Razorpay loaded' : '⚠️ Razorpay not loaded'}
                  </div> */}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold small text-uppercase">Select amount (INR)</label>
                  <div className="row g-3">
                    {[100, 250, 500, 1000].map((amount) => {
                      // FIXED: Calculate extractions correctly
                      // ₹100 / ₹0.10 = 1000 extractions ✅
                      const numExtractions = Math.floor(amount / EXTRACTION_COST);
                      
                      return (
                        <div className="col-6" key={amount}>
                          <button 
                            className="btn w-100 border border-dark rounded-0 py-3 bg-white hover-lift"
                            onClick={() => handleRazorpayPayment(amount)}
                            disabled={processingPayment}
                          >
                            <span className="fw-bold">₹{amount}</span>
                            <span className="d-block text-secondary small">≈ {numExtractions.toLocaleString()} extractions</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold small text-uppercase">Or custom amount</label>
                  <div className="d-flex gap-2">
                    <input 
                      type="number" 
                      className="form-control rounded-0 border-dark p-3" 
                      placeholder="Enter amount (₹)"
                      min="5"
                      id="customAmount"
                      disabled={processingPayment}
                    />
                    <button 
                      className="btn btn-dark rounded-0 px-4"
                      onClick={() => {
                        const amount = document.getElementById('customAmount').value;
                        if (amount && amount >= 100) {
                          handleRazorpayPayment(parseFloat(amount));
                        } else {
                          alert('Minimum amount is ₹100');
                        }
                      }}
                      disabled={processingPayment}
                    >
                      {processingPayment ? 'Processing...' : 'Add'}
                    </button>
                  </div>
                </div>

                {processingPayment && (
                  <div className="text-center my-3">
                    <div className="spinner-border text-dark" role="status">
                      <span className="visually-hidden">Processing...</span>
                    </div>
                    <p className="text-secondary small mt-2">Initializing payment...</p>
                  </div>
                )}

                <div className="border-top border-dark opacity-25 my-4"></div>

                <p className="text-center text-secondary small mb-0">
                  <i className="bi bi-shield-check me-2"></i>
                  Secured by Razorpay • ₹{EXTRACTION_COST.toFixed(2)} per extraction
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-vh-100">
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar - Left Navigation */}
          <div className="col-md-3 col-lg-2 p-0 border-end border-dark min-vh-100">
            <div className="p-4">
              {/* User Info */}
              <div className="mb-4 pb-3 border-bottom border-dark">
                <h5 className="fw-bold mb-1">{userData.name || userData.email}</h5>
                <p className="text-secondary small mb-0">{userData.email}</p>
              </div>

              {/* Navigation Items */}
              <nav className="nav flex-column gap-2">
                <button 
                  className={`nav-link text-start w-100 px-3 py-3 border-0 d-flex align-items-center ${
                    activeTab === 'usage' 
                      ? 'bg-dark text-white' 
                      : 'bg-transparent text-dark'
                  }`}
                  onClick={() => setActiveTab('usage')}
                  style={{ cursor: 'pointer' }}
                >
                  <i className={`bi bi-bar-chart-line me-3 ${activeTab === 'usage' ? 'text-white' : 'text-dark'}`}></i>
                  <span className="fw-semibold">Usage</span>
                </button>

                <button 
                  className={`nav-link text-start w-100 px-3 py-3 border-0 d-flex align-items-center ${
                    activeTab === 'billing' 
                      ? 'bg-dark text-white' 
                      : 'bg-transparent text-dark'
                  }`}
                  onClick={() => setActiveTab('billing')}
                  style={{ cursor: 'pointer' }}
                >
                  <i className={`bi bi-credit-card me-3 ${activeTab === 'billing' ? 'text-white' : 'text-dark'}`}></i>
                  <span className="fw-semibold">Billing</span>
                </button>

                <button 
                  className={`nav-link text-start w-100 px-3 py-3 border-0 d-flex align-items-center ${
                    activeTab === 'api' 
                      ? 'bg-dark text-white' 
                      : 'bg-transparent text-dark'
                  }`}
                  onClick={() => setActiveTab('api')}
                  style={{ cursor: 'pointer' }}
                >
                  <i className={`bi bi-key me-3 ${activeTab === 'api' ? 'text-white' : 'text-dark'}`}></i>
                  <span className="fw-semibold">API Keys</span>
                </button>

                <div className="border-top border-dark opacity-25 my-3"></div>

                <button 
                  onClick={handleLogout}
                  className="nav-link text-start w-100 px-3 py-2 text-secondary d-flex align-items-center border-0 bg-transparent"
                  style={{ cursor: 'pointer' }}
                >
                  <i className="bi bi-box-arrow-right me-3"></i>
                  <span>Logout</span>
                </button>
              </nav>

              {/* Credit Info - FIXED: Shows correct number of documents */}
              <div className="border border-dark p-3 mt-4">
                <div className="text-secondary small">Available Credits</div>
                <div className="d-flex align-items-baseline">
                  <span className="fw-bold fs-3">₹{userData.credits.toFixed(2)}</span>
                  <span className="text-secondary small ms-2">left</span>
                </div>
                <div className="text-secondary small mt-1">
                  <span className="fw-bold">{estimatedDocuments.toLocaleString()}</span> document{estimatedDocuments !== 1 ? 's' : ''} remaining
                </div>
                <div className="text-secondary small">
                  (₹{EXTRACTION_COST.toFixed(2)} per extraction)
                </div>
                <button 
                  className="btn btn-dark w-100 rounded-0 mt-3"
                  onClick={() => setShowRechargeModal(true)}
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Add Credits
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-md-9 col-lg-10 p-4 p-lg-5">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-5">
              <div>
                <h1 className="fw-bold mb-1" style={{ letterSpacing: '-0.5px' }}>
                  {activeTab === 'usage' && 'Usage Overview'}
                  {activeTab === 'billing' && 'Billing & Credits'}
                  {activeTab === 'api' && 'API Keys'}
                </h1>
                <p className="text-secondary small mb-0">
                  {activeTab === 'usage' && 'Track your document extraction history and field usage'}
                  {activeTab === 'billing' && 'Manage your credits and view payment history'}
                  {activeTab === 'api' && 'Manage your API keys for authentication'}
                </p>
              </div>

              {activeTab === 'billing' && (
                <button 
                  className="bg-dark text-white px-4 py-2 border-0 d-flex align-items-center hover-lift"
                  onClick={() => setShowRechargeModal(true)}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Add Credits
                </button>
              )}
            </div>

            {/* USAGE TAB */}
            {activeTab === 'usage' && (
              <div>
                {/* Stats Cards */}
                <div className="row g-4 mb-5">
                  <div className="col-md-4">
                    <div className="border border-dark p-4 bg-white">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-dark text-white p-2 me-3">
                          <i className="bi bi-file-text fs-5"></i>
                        </div>
                        <span className="text-secondary small">Total Extractions</span>
                      </div>
                      <h3 className="fw-bold mb-1">{userData.totalExtractions.toLocaleString()}</h3>
                      <p className="text-secondary small mb-0">All time processed</p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="border border-dark p-4 bg-white">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-dark text-white p-2 me-3">
                          <i className="bi bi-grid-3x3 fs-5"></i>
                        </div>
                        <span className="text-secondary small">Unique Fields</span>
                      </div>
                      <h3 className="fw-bold mb-1">{recentFields.length}</h3>
                      <p className="text-secondary small mb-0">Fields extracted</p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="border border-dark p-4 bg-white">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-dark text-white p-2 me-3">
                          <i className="bi bi-calendar fs-5"></i>
                        </div>
                        <span className="text-secondary small">This Month</span>
                      </div>
                      <h3 className="fw-bold mb-1">{stats.thisMonth || 0}</h3>
                      <p className="text-secondary small mb-0">Extractions this month</p>
                    </div>
                  </div>
                </div>

                <div className="row g-4">
                  {/* Usage History */}
                  <div className="col-lg-8">
                    <div className="border border-dark p-4 bg-white">
                      <h5 className="fw-bold mb-4">Recent Extractions</h5>
                      {usageHistory.length > 0 ? (
                        <div className="table-responsive">
                          <table className="table table-borderless">
                            <thead className="text-secondary small">
                              <tr>
                                <th>Date</th>
                                <th>Files</th>
                                <th>Fields</th>
                                <th>Credits</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {usageHistory.slice(0, 5).map((item, index) => (
                                <tr key={index}>
                                  <td className="py-3">{formatDate(item.createdAt)}</td>
                                  <td className="py-3 fw-semibold">{item.files?.length || 1}</td>
                                  <td className="py-3 text-secondary">
                                    {item.fields ? Object.keys(item.fields).join(', ') : 'N/A'}
                                  </td>
                                  <td className="py-3">₹{item.creditsDeducted?.toFixed(2) || '0.10'}</td>
                                  <td className="py-3">
                                    <span className={`small ${
                                      item.status === 'success' ? 'text-success' : 'text-danger'
                                    }`}>
                                      <i className={`bi bi-${
                                        item.status === 'success' ? 'check-circle-fill' : 'exclamation-circle-fill'
                                      } me-1`}></i>
                                      {item.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-secondary text-center py-4">No extraction history yet</p>
                      )}
                    </div>
                  </div>

                  {/* Fields Usage */}
                  <div className="col-lg-4">
                    <div className="border border-dark p-4 bg-white">
                      <h5 className="fw-bold mb-4">Fields Extracted</h5>
                      {recentFields.length > 0 ? (
                        recentFields.map((field, index) => (
                          <div key={index} className="mb-3">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                              <span className="fw-semibold">{field.field}</span>
                              <span className="text-secondary small">{field.count} times</span>
                            </div>
                            <div className="progress rounded-0" style={{ height: '4px' }}>
                              <div 
                                className="progress-bar bg-dark" 
                                style={{ width: `${(field.count / recentFields[0].count) * 100}%` }}
                              ></div>
                            </div>
                            <div className="text-secondary small mt-1">
                              Last used: {formatDate(field.lastUsed)}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-secondary text-center py-4">No fields extracted yet</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BILLING TAB - FIXED: Shows correct extraction counts */}
            {activeTab === 'billing' && (
              <div>
                {/* Credit Card */}
                <div className="border border-dark p-5 mb-5 bg-white">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <div className="text-secondary small mb-2">Current Balance</div>
                      <h1 className="display-4 fw-bold mb-2">₹{userData.credits.toFixed(2)}</h1>
                      <p className="text-secondary mb-0">
                        ≈ {estimatedDocuments.toLocaleString()} document{estimatedDocuments !== 1 ? 's' : ''} remaining
                      </p>
                      <p className="text-secondary small">
                        (₹{EXTRACTION_COST.toFixed(2)} per extraction)
                      </p>
                    </div>
                    <div className="col-md-6 text-md-end">
                      <button 
                        className="bg-dark text-white px-5 py-3 border-0 d-inline-flex align-items-center hover-lift"
                        onClick={() => setShowRechargeModal(true)}
                        style={{ cursor: 'pointer' }}
                      >
                        <i className="bi bi-plus-circle me-2"></i>
                        Add Credits
                      </button>
                    </div>
                  </div>
                </div>

                {/* Payment History - FIXED: Shows correct extraction counts */}
                <div className="border border-dark p-4 bg-white">
                  <h5 className="fw-bold mb-4">Payment History</h5>
                  {paymentHistory.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-borderless">
                        <thead className="text-secondary small">
                          <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Extractions</th>
                            <th>Method</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paymentHistory.map((item, index) => {
                            // FIXED: Calculate extractions correctly
                            const numExtractions = Math.floor(item.amount / EXTRACTION_COST);
                            
                            return (
                              <tr key={index}>
                                <td className="py-3">{formatDate(item.createdAt)}</td>
                                <td className="py-3 fw-bold">₹{item.amount}</td>
                                <td className="py-3 text-secondary">{numExtractions.toLocaleString()}</td>
                                <td className="py-3 text-secondary">Razorpay</td>
                                <td className="py-3">
                                  <span className="text-success small">
                                    <i className="bi bi-check-circle-fill me-1"></i>
                                    Completed
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-secondary text-center py-4">No payment history yet</p>
                  )}
                </div>
              </div>
            )}

            {/* API KEYS TAB - unchanged */}
            {activeTab === 'api' && (
              <div>
                {/* Current API Key */}
                <div className="border border-dark p-5 mb-5 bg-white">
                  <h5 className="fw-bold mb-4">Your API Key</h5>
                  <div className="bg-light p-3 d-flex align-items-center justify-content-between mb-3">
                    <code className="text-dark" style={{ wordBreak: 'break-all' }}>
                      {userData.apiKey || 'No API key found'}
                    </code>
                    {userData.apiKey && (
                      <button 
                        className="bg-dark text-white px-3 py-1 border-0 d-flex align-items-center hover-lift ms-2"
                        onClick={copyApiKey}
                        style={{ cursor: 'pointer', flexShrink: 0 }}
                      >
                        <i className="bi bi-clipboard me-2"></i>
                        Copy
                      </button>
                    )}
                  </div>
                  <div className="d-flex gap-4">
                    <div className="text-secondary small">
                      <i className="bi bi-calendar me-1"></i>
                      Created: {userData.apiKeyCreated}
                    </div>
                    <div className="text-secondary small">
                      <i className="bi bi-shield-check me-1"></i>
                      Active
                    </div>
                  </div>
                </div>

                {/* Security Info */}
                <div className="border border-dark p-4 bg-white">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-dark text-white p-2 me-3">
                      <i className="bi bi-shield-lock"></i>
                    </div>
                    <h6 className="fw-bold mb-0">Security</h6>
                  </div>
                  <p className="text-secondary small mb-0">
                    Store your API key securely. Never share it or expose it in client-side code.
                    Regenerate key if compromised.
                  </p>
                </div>

                {/* Regenerate Button */}
                <div className="mt-4 text-center">
                  <button 
                    className="btn border border-dark rounded-0 px-5 py-2 bg-white hover-lift"
                    onClick={() => setShowRegenerateModal(true)}
                  >
                    <i className="bi bi-arrow-repeat me-2"></i>
                    Regenerate API Key
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
        .hover-lift:hover {
          transform: translateY(-2px);
          transition: transform 0.3s ease;
          box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.05);
        }

        .nav-link {
          transition: all 0.3s ease;
        }

        .nav-link:hover:not(.bg-dark) {
          background-color: #f8f9fa !important;
        }

        .nav-link.bg-dark {
          background-color: #000 !important;
          color: white !important;
        }

        .nav-link.bg-dark i {
          color: white !important;
        }

        .progress {
          background-color: #e9ecef;
        }

        .table > :not(caption) > * > * {
          border-bottom: 1px solid #dee2e6;
          padding: 1rem 0;
        }

        .table > :not(:last-child) > :last-child > * {
          border-bottom-color: #000;
        }

        @media (max-width: 768px) {
          .border-end {
            border-right: none !important;
            border-bottom: 1px solid #000;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;