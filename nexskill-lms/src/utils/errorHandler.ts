/**
 * API Error Handler Utility
 * 
 * Use this to handle API errors consistently throughout the app.
 * This can be integrated with your API client (axios, fetch, etc.) later.
 */

import type { NavigateFunction } from 'react-router-dom';

export interface ApiError {
  status?: number;
  message: string;
  code?: string;
}

/**
 * Handle API errors and navigate to appropriate error pages
 * 
 * @param error - The error object from your API call
 * @param navigate - React Router's navigate function
 * @param onSessionExpired - Optional callback for session expiry
 */
export function handleApiError(
  error: ApiError,
  navigate: NavigateFunction,
  onSessionExpired?: () => void
): void {
  const status = error.status;

  switch (status) {
    case 401:
      // Unauthorized - Session expired
      if (onSessionExpired) {
        onSessionExpired();
      } else {
        navigate('/login', { state: { sessionExpired: true } });
      }
      break;

    case 403:
      // Forbidden - User doesn't have permission
      console.error('Access forbidden:', error.message);
      // You can show a toast/notification or redirect
      break;

    case 404:
      // Not found
      navigate('/404');
      break;

    case 500:
    case 502:
    case 503:
    case 504:
      // Server errors
      navigate('/500');
      break;

    case 503:
      // Service unavailable - Maintenance
      navigate('/maintenance');
      break;

    default:
      // Other errors - log and show generic error
      console.error('API Error:', error);
      // You can show a toast notification here
      break;
  }
}

/**
 * Example usage with fetch:
 * 
 * ```typescript
 * import { useNavigate } from 'react-router-dom';
 * import { handleApiError } from './utils/errorHandler';
 * 
 * const MyComponent = () => {
 *   const navigate = useNavigate();
 *   
 *   const fetchData = async () => {
 *     try {
 *       const response = await fetch('/api/data');
 *       
 *       if (!response.ok) {
 *         handleApiError(
 *           { status: response.status, message: response.statusText },
 *           navigate
 *         );
 *         return;
 *       }
 *       
 *       const data = await response.json();
 *       // Handle success
 *     } catch (error) {
 *       handleApiError(
 *         { message: 'Network error' },
 *         navigate
 *       );
 *     }
 *   };
 * };
 * ```
 */

/**
 * Create an axios interceptor (example for later integration):
 * 
 * ```typescript
 * import axios from 'axios';
 * import { handleApiError } from './utils/errorHandler';
 * 
 * export const setupApiInterceptors = (navigate: NavigateFunction) => {
 *   axios.interceptors.response.use(
 *     (response) => response,
 *     (error) => {
 *       if (error.response) {
 *         handleApiError(
 *           {
 *             status: error.response.status,
 *             message: error.response.data?.message || error.message,
 *             code: error.response.data?.code,
 *           },
 *           navigate
 *         );
 *       }
 *       return Promise.reject(error);
 *     }
 *   );
 * };
 * ```
 */
