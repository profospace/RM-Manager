// import React, { useState, useEffect } from 'react';


// // Login Form Component
// const LoginForm = ({ userType, onLogin }) => {
//   const [credentials, setCredentials] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     // Simulate API call
//     setTimeout(() => {
//       localStorage.setItem(`${userType}_token`, 'demo-token');
//       setLoading(false);
//       onLogin();
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <div className="max-w-md w-full mx-4">
//         <div className="bg-white rounded-lg shadow-sm border p-6">
//           <div className="text-center mb-6">
//             <h1 className="text-2xl font-semibold text-gray-900">
//               {userType === 'builder' ? 'Builder' : 'RM'} Login
//             </h1>
//             <p className="text-gray-600 mt-2">Sign in to your account</p>
//           </div>
          
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Email</label>
//               <input
//                 type="email"
//                 value={credentials.email}
//                 onChange={(e) => setCredentials({...credentials, email: e.target.value})}
//                 className="w-full border rounded px-3 py-2"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Password</label>
//               <input
//                 type="password"
//                 value={credentials.password}
//                 onChange={(e) => setCredentials({...credentials, password: e.target.value})}
//                 className="w-full border rounded px-3 py-2"
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
//             >
//               {loading ? (
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               ) : null}
//               Sign In
//             </button>
//           </form>
          
//           <p className="text-xs text-gray-500 text-center mt-4">
//             Demo: Use any email/password to login
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm


import React, { useState } from 'react';

// API Configuration
const API_BASE_URL = 'http://localhost:5029';

// Login Form Component with Real API Integration
const LoginForm = ({ userType, onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!credentials.email || !credentials.password) return;
    
    setLoading(true);
    setError('');
    
    try {
      // Determine the correct API endpoint based on user type
      const endpoint = userType === 'builder' ? '/builder/login' : '/rm/login';
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store the token in localStorage
        localStorage.setItem(`${userType}_token`, data.data.token);
        
        // Store user data (optional, for profile access)
        const userData = userType === 'builder' ? data.data.builder : data.data.rm;
        localStorage.setItem(`${userType}_user`, JSON.stringify(userData));
        
        // Call the onLogin callback with user data
        onLogin(userData);
      } else {
        // Handle API errors
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {userType === 'builder' ? 'Builder Portal' : 'RM Portal'}
            </h1>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Email Address</label>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading || !credentials.email || !credentials.password}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              {userType === 'builder' ? 'Builder Management System' : 'RM Management System'}
            </p>
            {/* Demo credentials for development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-2 text-xs text-gray-400">
                <p>Demo credentials available in development mode</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm