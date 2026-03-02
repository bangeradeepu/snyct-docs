import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();

  const logout = (redirectTo = '/login') => {
    // Clear all auth-related items from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('apiKey');
    
    // Clear any other app-specific items
    localStorage.removeItem('oauth_redirect');
    
    // Optional: Clear session storage if you're using it
    // sessionStorage.clear();
    
    // Redirect to login page
    navigate(redirectTo);
    window.location.reload(); // Force reload to reset app state
  };

  return logout;
};

export default useLogout;