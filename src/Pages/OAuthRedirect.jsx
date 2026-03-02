import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OAuthRedirect = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const errorParam = params.get('error');

    // Handle OAuth error
    if (errorParam) {
      setError(errorParam === 'oauth_failed' ? 'Authentication failed' : 'An error occurred');
      setTimeout(() => navigate('/login'), 3000);
      return;
    }

    if (token) {
      localStorage.setItem('token', token);
      
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${API_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            if (response.data.apiKey) {
              localStorage.setItem('apiKey', response.data.apiKey);
            }
            navigate('/dashboard');
          }
          window.location.reload();
        } catch (err) {
          console.error('Error fetching user data:', err);
          navigate('/login');
        }
      };
      
      fetchUserData();
    } else {
      navigate('/login');
    }
  }, [navigate, API_URL]);

  // Show error message if something went wrong
  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="text-danger mb-3">
            <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '3rem' }}></i>
          </div>
          <h4 className="mb-2">Authentication Failed</h4>
          <p className="text-secondary">{error}</p>
          <p className="text-secondary small">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Default loading state
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Completing authentication...</p>
      </div>
    </div>
  );
};

export default OAuthRedirect;