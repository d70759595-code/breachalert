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

  const response = await fetch(`${API_BASE}${url}`, defaultOptions);
  
  if (response.status === 401) {
    // Session expired or unauthorized
    window.dispatchEvent(new CustomEvent('auth:unauthorized'));
  }

  return response;
}
