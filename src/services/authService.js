// services/authService.js
export const authService = {
  // Verify token
  verifyToken: async (token) => {
    const response = await fetch('/api/auth/verify', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },
  // Login
  login: async (userType, credentials) => {
    const response = await fetch(`/api/${userType}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return response.json();
  }
};