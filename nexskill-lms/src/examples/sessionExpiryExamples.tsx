/**
 * Example: How to use SessionExpiredModal
 * 
 * This is a sample implementation showing how to integrate
 * the SessionExpiredModal into your application.
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SessionExpiredModal from '../components/system/SessionExpiredModal';

/**
 * Example 1: Using the modal in a parent component
 */
export function AppWithSessionCheck() {
  const [sessionExpired, setSessionExpired] = useState(false);
  const navigate = useNavigate();

  // Example: Check session on mount and periodically
  useEffect(() => {
    const checkSession = () => {
      const token = localStorage.getItem('authToken');
      const tokenExpiry = localStorage.getItem('tokenExpiry');
      
      if (!token || (tokenExpiry && Date.now() > parseInt(tokenExpiry))) {
        setSessionExpired(true);
      }
    };

    checkSession();
    
    // Check every 5 minutes
    const interval = setInterval(checkSession, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleRelogin = () => {
    // Clear old session data
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiry');
    
    // Navigate to login
    navigate('/login', { state: { sessionExpired: true } });
    setSessionExpired(false);
  };

  const handleGoHome = () => {
    navigate('/');
    setSessionExpired(false);
  };

  return (
    <>
      {/* Your app content */}
      <SessionExpiredModal
        open={sessionExpired}
        onRelogin={handleRelogin}
        onGoHome={handleGoHome}
      />
    </>
  );
}

/**
 * Example 2: Using with API interceptor (for later integration)
 */
export const setupSessionExpiredHandler = (
  _setSessionExpired: (expired: boolean) => void
) => {
  // This would be integrated with your API client
  // Example with axios:
  /*
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        setSessionExpired(true);
      }
      return Promise.reject(error);
    }
  );
  */
};

/**
 * Example 3: Creating a custom hook for session management
 */
export function useSessionExpiry() {
  const [sessionExpired, setSessionExpired] = useState(false);
  const navigate = useNavigate();

  const handleRelogin = () => {
    localStorage.removeItem('authToken');
    navigate('/login', { state: { sessionExpired: true } });
    setSessionExpired(false);
  };

  const handleGoHome = () => {
    navigate('/');
    setSessionExpired(false);
  };

  const triggerSessionExpiry = () => {
    setSessionExpired(true);
  };

  return {
    sessionExpired,
    setSessionExpired,
    handleRelogin,
    handleGoHome,
    triggerSessionExpiry,
    SessionExpiredModal: () => (
      <SessionExpiredModal
        open={sessionExpired}
        onRelogin={handleRelogin}
        onGoHome={handleGoHome}
      />
    ),
  };
}

/**
 * Example 4: Usage in a component with the custom hook
 */
/*
function MyProtectedComponent() {
  const { SessionExpiredModal: Modal, triggerSessionExpiry } = useSessionExpiry();

  const fetchData = async () => {
    try {
      const response = await fetch('/api/protected');
      
      if (response.status === 401) {
        triggerSessionExpiry();
        return;
      }
      
      const data = await response.json();
      // Handle data
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>My Protected Content</div>
      <Modal />
    </>
  );
}
*/
