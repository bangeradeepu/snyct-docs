import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // API Base URL from environment variable
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

  // Create axios instance with default config
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setShowForgotPassword(false);
    setError('');
    setSuccess('');
  };

  const handleOAuthLogin = (provider) => {
    // Redirect to OAuth provider
    window.location.href = `${API_URL}/auth/${provider}`;
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // You'll need to implement this endpoint on your backend
      const response = await api.post('/auth/forgot-password', {
        email: email,
      });

      setSuccess('Password reset instructions have been sent to your email.');
      setTimeout(() => {
        setShowForgotPassword(false);
        setEmail('');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send reset instructions');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!isLogin && password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const requestBody = isLogin 
        ? { email, password }
        : { 
            email, 
            password, 
            name: name || email.split('@')[0] 
          };

      const response = await api.post(endpoint, requestBody);

      if (response.data) {
        // Store authentication data
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        
        if (response.data.apiKey) {
          localStorage.setItem('apiKey', response.data.apiKey);
        }

        setSuccess('Authentication successful! Redirecting...');

        // Redirect to dashboard or home page
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      }
    } catch (err) {
      console.error('Authentication error:', err);
      
      if (err.response) {
        // Server responded with error
        setError(err.response.data.error || 'Authentication failed');
        
        // Handle specific error cases
        if (err.response.status === 404) {
          setError('User not found. Please register first.');
        } else if (err.response.status === 401) {
          setError('Invalid email or password');
        } else if (err.response.status === 400) {
          setError(err.response.data.error || 'Invalid input');
        } else if (err.response.status === 409) {
          setError('User already exists. Please login instead.');
        }
      } else if (err.request) {
        // Request made but no response
        setError('Unable to connect to server. Please check your connection.');
      } else {
        // Something else happened
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Check if token exists in URL (for OAuth redirect)
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    if (token) {
      localStorage.setItem('token', token);
      
      // Fetch user data with token
      const fetchUserData = async () => {
        try {
          const response = await api.get('/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            if (response.data.apiKey) {
              localStorage.setItem('apiKey', response.data.apiKey);
            }
            window.location.href = '/dashboard';
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
          window.location.href = '/login';
        }
      };
      
      fetchUserData();
      
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Forgot Password View
  if (showForgotPassword) {
    return (
      <div className="bg-white min-vh-100 d-flex align-items-center py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              {/* Back Button */}
              <button 
                onClick={() => {
                  setShowForgotPassword(false);
                  setError('');
                  setSuccess('');
                }}
                className="btn btn-link text-dark p-0 mb-4 d-inline-flex align-items-center text-decoration-none"
                disabled={loading}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back to login
              </button>

              {/* Forgot Password Card */}
              <div className="border border-dark p-5 bg-white">
                {/* Header */}
                <div className="text-center mb-4">
                  <div className="d-inline-block bg-dark text-white px-3 py-1 mb-4" style={{ letterSpacing: '2px', fontSize: '12px' }}>
                    RESET PASSWORD
                  </div>
                  <h2 className="fw-bold mb-2" style={{ letterSpacing: '-0.5px' }}>Forgot password?</h2>
                  <p className="text-secondary small">Enter your email and we'll send you reset instructions</p>
                </div>

                {/* Error/Success Messages */}
                {error && (
                  <div className="alert alert-danger border-0 rounded-0 mb-4" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                  </div>
                )}

                {success && (
                  <div className="alert alert-success border-0 rounded-0 mb-4" role="alert">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    {success}
                  </div>
                )}

                <form onSubmit={handleForgotPassword}>
                  <div className="mb-4">
                    <label className="form-label fw-semibold small text-uppercase">Email address</label>
                    <input
                      type="email"
                      className="form-control rounded-0 border-dark p-3"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-dark w-100 rounded-0 py-3 fw-semibold mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send reset instructions
                        <i className="bi bi-arrow-right ms-2"></i>
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center text-secondary small mb-0">
                  Remember your password?{' '}
                  <button 
                    onClick={() => {
                      setShowForgotPassword(false);
                      setError('');
                      setSuccess('');
                    }}
                    className="btn btn-link text-dark p-0 text-decoration-none fw-semibold"
                    disabled={loading}
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Login/Register View
  return (
    <div className="bg-white min-vh-100 d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            {/* Premium Badge */}
            <div className="text-center mb-4">
              <div className="d-inline-block bg-dark text-white px-3 py-1" style={{ letterSpacing: '2px', fontSize: '12px' }}>
                {isLogin ? 'WELCOME BACK' : 'JOIN US'}
              </div>
            </div>

            {/* Main Card */}
            <div className="border border-dark p-4 p-md-5 bg-white">
              {/* Header */}
              <h2 className="fw-bold mb-4 text-center" style={{ letterSpacing: '-0.5px' }}>
                {isLogin ? 'Sign in to your account' : 'Create your account'}
              </h2>

              {/* Error/Success Messages */}
              {error && (
                <div className="alert alert-danger border-0 rounded-0 mb-4" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </div>
              )}

              {success && (
                <div className="alert alert-success border-0 rounded-0 mb-4" role="alert">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  {success}
                </div>
              )}

              {/* Social Login Buttons */}
              <div className="d-flex flex-column gap-3 mb-4">
                <button 
                  className="btn border border-dark rounded-0 py-3 d-flex align-items-center justify-content-center bg-white hover-lift"
                  onClick={() => handleOAuthLogin('github')}
                  disabled={loading}
                >
                  <i className="bi bi-github fs-5 me-2"></i>
                  Continue with GitHub
                </button>
                <button 
                  className="btn border border-dark rounded-0 py-3 d-flex align-items-center justify-content-center bg-white hover-lift"
                  onClick={() => handleOAuthLogin('google')}
                  disabled={loading}
                >
                  <i className="bi bi-google fs-5 me-2"></i>
                  Continue with Google
                </button>
              </div>

              {/* Divider */}
              <div className="d-flex align-items-center my-4">
                <div className="flex-grow-1 border-top border-dark opacity-25"></div>
                <span className="mx-3 text-secondary small">OR</span>
                <div className="flex-grow-1 border-top border-dark opacity-25"></div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="mb-3">
                    <label className="form-label fw-semibold small text-uppercase">Name (Optional)</label>
                    <input
                      type="text"
                      className="form-control rounded-0 border-dark p-3"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label fw-semibold small text-uppercase">Email address</label>
                  <input
                    type="email"
                    className="form-control rounded-0 border-dark p-3"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold small text-uppercase">Password</label>
                  <input
                    type="password"
                    className="form-control rounded-0 border-dark p-3"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    minLength={6}
                  />
                  {!isLogin && (
                    <small className="text-secondary mt-1 d-block">
                      Must be at least 6 characters
                    </small>
                  )}
                </div>

                {!isLogin && (
                  <div className="mb-4">
                    <label className="form-label fw-semibold small text-uppercase">Confirm password</label>
                    <input
                      type="password"
                      className="form-control rounded-0 border-dark p-3"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={loading}
                      minLength={6}
                    />
                  </div>
                )}

                {isLogin && (
                  <div className="text-end mb-4">
                    <button 
                      type="button"
                      onClick={() => {
                        setShowForgotPassword(true);
                        setError('');
                        setSuccess('');
                      }}
                      className="btn btn-link text-dark p-0 text-decoration-none small fw-semibold"
                      disabled={loading}
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-dark w-100 rounded-0 py-3 fw-semibold mb-3 hover-lift"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      {isLogin ? 'Signing in...' : 'Creating account...'}
                    </>
                  ) : (
                    <>
                      {isLogin ? 'Sign in' : 'Create account'}
                      <i className="bi bi-arrow-right ms-2"></i>
                    </>
                  )}
                </button>
              </form>

              {/* Toggle between Login/Register */}
              <p className="text-center text-secondary small mb-0">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={toggleMode}
                  className="btn btn-link text-dark p-0 text-decoration-none fw-semibold"
                  disabled={loading}
                >
                  {isLogin ? 'Register now' : 'Sign in'}
                </button>
              </p>
            </div>

            {/* Footer Note */}
            <p className="text-center text-secondary small mt-4">
              By continuing, you agree to our{' '}
              <a href="/terms" className="text-dark text-decoration-none fw-semibold">Terms</a>
              {' '}and{' '}
              <a href="/privacy" className="text-dark text-decoration-none fw-semibold">Privacy Policy</a>
            </p>
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
        
        .btn-link:hover {
          color: #000 !important;
          text-decoration: underline !important;
        }

        .form-control:focus {
          border-color: #000;
          box-shadow: none;
          outline: none;
        }

        .form-control:disabled {
          background-color: #f8f9fa;
          cursor: not-allowed;
        }

        .alert {
          border-left: 4px solid;
          border-radius: 0;
        }

        .alert-danger {
          border-left-color: #dc3545;
          background-color: #fff;
          color: #dc3545;
        }

        .alert-success {
          border-left-color: #198754;
          background-color: #fff;
          color: #198754;
        }

        .spinner-border {
          width: 1.2rem;
          height: 1.2rem;
          border-width: 0.15em;
        }

        /* Responsive adjustments */
        @media (max-width: 576px) {
          .p-5 {
            padding: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;