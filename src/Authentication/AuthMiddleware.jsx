import React,{ useState ,useEffect } from 'react'
import LoginForm from '../components/LoginForm';


// // Auth Middleware Component (can be used in your routing)
// const AuthMiddleware = ({ children, userType = 'rm' }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate auth check
//     const token = localStorage.getItem(`${userType}_token`);
//     setTimeout(() => {
//       setIsAuthenticated(!!token);
//       setLoading(false);
//     }, 1000);
//   }, [userType]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <LoginForm userType={userType} onLogin={() => setIsAuthenticated(true)} />;
//   }

//   return children;
// };

// export default AuthMiddleware

// Enhanced AuthMiddleware with real API integration
export const AuthMiddleware = ({ children, userType = 'rm' }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem(`${userType}_token`);
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Verify token with backend
        const response = await fetch(`${API_BASE_URL}/auth/verify`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setUser(data.data.user);
            setIsAuthenticated(true);
          } else {
            // Token invalid, remove it
            localStorage.removeItem(`${userType}_token`);
            localStorage.removeItem(`${userType}_user`);
            setIsAuthenticated(false);
          }
        } else {
          // Token invalid, remove it
          localStorage.removeItem(`${userType}_token`);
          localStorage.removeItem(`${userType}_user`);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // On network error, try to get user from localStorage
        const storedUser = localStorage.getItem(`${userType}_user`);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem(`${userType}_token`);
          setIsAuthenticated(false);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [userType]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
          <p className="text-gray-500 text-sm mt-2">Verifying your credentials</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <LoginForm 
        userType={userType} 
        onLogin={(userData) => {
          setIsAuthenticated(true);
          setUser(userData);
        }} 
      />
    );
  }

  return children;
};

// Hook to use auth context throughout the app
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  React.useEffect(() => {
    // Check which type of user is logged in
    const builderToken = localStorage.getItem('builder_token');
    const rmToken = localStorage.getItem('rm_token');
    
    if (builderToken) {
      setUserType('builder');
      const storedUser = localStorage.getItem('builder_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } else if (rmToken) {
      setUserType('rm');
      const storedUser = localStorage.getItem('rm_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('builder_token');
    localStorage.removeItem('rm_token');
    localStorage.removeItem('builder_user');
    localStorage.removeItem('rm_user');
    setUser(null);
    setUserType(null);
    window.location.reload();
  };

  const getToken = () => {
    return localStorage.getItem(`${userType}_token`);
  };

  return { user, userType, logout, getToken };
};

export default LoginForm;