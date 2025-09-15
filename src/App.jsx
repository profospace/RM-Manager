import React,{ useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import RMDashboard from './pages/RMDashboard'
import RMCalendarView from './components/RMCalendarView';
import PerformanceAnalytics from './components/PerformanceAnalytics';
// import LoginForm from './components/LoginForm';
import { AuthMiddleware } from './Authentication/AuthMiddleware';

function App() {
  const [userType, setUserType] = useState('rm'); // 'rm' or 'builder'

  return (
    // <Routes>
    //   <Route path='/' element={<RMDashboard />} />
    //   <Route path='/authentication' element={<LoginForm />} />
    // </Routes>

     <AuthMiddleware userType='rm'>
      <RMDashboard />
    </AuthMiddleware>
  )
}

export default App
