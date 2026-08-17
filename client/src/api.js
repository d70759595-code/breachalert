const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export async function fetchWithAuth(url, options = {}) {
  const defaultOptions = {
    credentials: 'include', // Automatically send HttpOnly cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE}${url}`, defaultOptions);
    
    if (response.status === 401) {
      // Session expired or unauthorized
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }

    return response;
  } catch (err) {
    // Intercept network failures / CORS errors before they cause unhandled promise rejections
    console.error('[Network Error]', err);
    throw new Error('Unable to securely connect to servers. Please verify your connection.', { cause: err });
  }
}
