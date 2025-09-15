// import React, { useState, useEffect } from 'react';
// import { Calendar, Clock, Phone, Mail, MapPin, User, BarChart3, CheckCircle, XCircle, AlertCircle, Edit, Eye, Plus } from 'lucide-react';

// // Mock data - replace with actual API calls
// const mockRMData = {
//   id: 'RM1234',
//   name: 'Rajesh Kumar',
//   email: 'rajesh@example.com',
//   phone: '+91 9876543210',
//   role: 'RM',
//   employeeId: 'RM1234',
//   performance: {
//     totalBookings: 45,
//     completedVisits: 38,
//     missedVisits: 4,
//     averageRating: 4.2
//   }
// };

// const mockBookings = [
//   {
//     id: '1',
//     property: { title: 'Luxury Apartment', address: 'Bandra West, Mumbai' },
//     customer: { name: 'Amit Sharma', phone: '+91 9876543210', email: 'amit@email.com' },
//     scheduledAt: '2024-01-15T10:00:00',
//     status: 'PENDING',
//     tokenAmount: 100,
//     notes: 'Customer interested in 2BHK'
//   },
//   {
//     id: '2',
//     property: { title: 'Modern Villa', address: 'Juhu, Mumbai' },
//     customer: { name: 'Priya Singh', phone: '+91 8765432109', email: 'priya@email.com' },
//     scheduledAt: '2024-01-15T14:00:00',
//     status: 'IN_PROGRESS',
//     tokenAmount: 100,
//     notes: 'Looking for immediate possession'
//   }
// ];

// const mockBuilderRMs = [
//   {
//     id: '1',
//     name: 'Rajesh Kumar',
//     role: 'RM',
//     activeBookings: 5,
//     completedVisits: 38,
//     rating: 4.2,
//     status: 'ACTIVE'
//   },
//   {
//     id: '2',
//     name: 'Sneha Patel',
//     role: 'SALES_PERSON',
//     activeBookings: 3,
//     completedVisits: 25,
//     rating: 4.5,
//     status: 'ACTIVE'
//   }
// ];

// // Status color mapping
// const getStatusColor = (status) => {
//   const colors = {
//     PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
//     IN_PROGRESS: 'bg-blue-100 text-blue-800 border-blue-200',
//     COMPLETED: 'bg-green-100 text-green-800 border-green-200',
//     CANCELLED: 'bg-red-100 text-red-800 border-red-200',
//     MISSED: 'bg-gray-100 text-gray-800 border-gray-200'
//   };
//   return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
// };

// // RM Dashboard Component
// const RMDashboard = ({ userType = 'rm' }) => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [rmData, setRmData] = useState(mockRMData);
//   const [bookings, setBookings] = useState(mockBookings);
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [builderRMs, setBuilderRMs] = useState(mockBuilderRMs);
//   const [selectedRM, setSelectedRM] = useState(null);

//   const todaysBookings = bookings.filter(booking => 
//     booking.scheduledAt.split('T')[0] === selectedDate
//   );

//   // Dashboard Stats Component
//   const DashboardStats = () => (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
//       <div className="bg-white p-4 rounded-lg border">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm text-gray-600">Total Bookings</p>
//             <p className="text-xl font-semibold text-gray-900">{rmData.performance.totalBookings}</p>
//           </div>
//           <BarChart3 className="h-8 w-8 text-blue-600" />
//         </div>
//       </div>
//       <div className="bg-white p-4 rounded-lg border">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm text-gray-600">Completed</p>
//             <p className="text-xl font-semibold text-green-600">{rmData.performance.completedVisits}</p>
//           </div>
//           <CheckCircle className="h-8 w-8 text-green-600" />
//         </div>
//       </div>
//       <div className="bg-white p-4 rounded-lg border">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm text-gray-600">Missed</p>
//             <p className="text-xl font-semibold text-red-600">{rmData.performance.missedVisits}</p>
//           </div>
//           <XCircle className="h-8 w-8 text-red-600" />
//         </div>
//       </div>
//       <div className="bg-white p-4 rounded-lg border">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm text-gray-600">Rating</p>
//             <p className="text-xl font-semibold text-yellow-600">{rmData.performance.averageRating}/5</p>
//           </div>
//           <User className="h-8 w-8 text-yellow-600" />
//         </div>
//       </div>
//     </div>
//   );

//   // Booking Card Component
//   const BookingCard = ({ booking }) => (
//     <div className="bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow">
//       <div className="flex justify-between items-start mb-3">
//         <div className="flex-1">
//           <h3 className="font-medium text-gray-900">{booking.property.title}</h3>
//           <p className="text-sm text-gray-600 flex items-center mt-1">
//             <MapPin className="h-4 w-4 mr-1" />
//             {booking.property.address}
//           </p>
//         </div>
//         <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(booking.status)}`}>
//           {booking.status}
//         </span>
//       </div>
      
//       <div className="space-y-2 mb-3">
//         <div className="flex items-center text-sm">
//           <User className="h-4 w-4 mr-2 text-gray-500" />
//           <span className="font-medium">{booking.customer.name}</span>
//         </div>
//         <div className="flex items-center text-sm text-gray-600">
//           <Phone className="h-4 w-4 mr-2" />
//           {booking.customer.phone}
//         </div>
//         <div className="flex items-center text-sm text-gray-600">
//           <Clock className="h-4 w-4 mr-2" />
//           {new Date(booking.scheduledAt).toLocaleString()}
//         </div>
//       </div>

//       <div className="flex gap-2 flex-wrap">
//         <button 
//           onClick={() => setSelectedBooking(booking)}
//           className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded hover:bg-blue-100 border border-blue-200"
//         >
//           View Details
//         </button>
//         <button className="px-3 py-1 bg-green-50 text-green-700 text-xs rounded hover:bg-green-100 border border-green-200">
//           Mark Complete
//         </button>
//         <button className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs rounded hover:bg-yellow-100 border border-yellow-200">
//           Reschedule
//         </button>
//       </div>
//     </div>
//   );

//   // Booking Details Modal
//   const BookingDetailsModal = () => {
//     if (!selectedBooking) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-lg max-w-md w-full max-h-90vh overflow-y-auto">
//           <div className="p-4 border-b">
//             <div className="flex justify-between items-center">
//               <h2 className="text-lg font-semibold">Booking Details</h2>
//               <button 
//                 onClick={() => setSelectedBooking(null)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <XCircle className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
          
//           <div className="p-4 space-y-4">
//             <div>
//               <h3 className="font-medium text-gray-900 mb-2">{selectedBooking.property.title}</h3>
//               <p className="text-sm text-gray-600">{selectedBooking.property.address}</p>
//             </div>
            
//             <div className="border-t pt-4">
//               <h4 className="font-medium mb-2">Customer Details</h4>
//               <div className="space-y-1 text-sm">
//                 <p><span className="font-medium">Name:</span> {selectedBooking.customer.name}</p>
//                 <p><span className="font-medium">Phone:</span> {selectedBooking.customer.phone}</p>
//                 <p><span className="font-medium">Email:</span> {selectedBooking.customer.email}</p>
//               </div>
//             </div>
            
//             <div className="border-t pt-4">
//               <h4 className="font-medium mb-2">Visit Information</h4>
//               <div className="space-y-1 text-sm">
//                 <p><span className="font-medium">Scheduled:</span> {new Date(selectedBooking.scheduledAt).toLocaleString()}</p>
//                 <p><span className="font-medium">Status:</span> 
//                   <span className={`ml-1 px-2 py-1 text-xs rounded ${getStatusColor(selectedBooking.status)}`}>
//                     {selectedBooking.status}
//                   </span>
//                 </p>
//                 <p><span className="font-medium">Token Amount:</span> ₹{selectedBooking.tokenAmount}</p>
//               </div>
//             </div>
            
//             {selectedBooking.notes && (
//               <div className="border-t pt-4">
//                 <h4 className="font-medium mb-2">Notes</h4>
//                 <p className="text-sm text-gray-600">{selectedBooking.notes}</p>
//               </div>
//             )}
//           </div>
          
//           <div className="p-4 border-t bg-gray-50 flex gap-2 flex-wrap">
//             <button className="flex-1 px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700">
//               Mark Complete
//             </button>
//             <button className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
//               Reschedule
//             </button>
//             <button className="flex-1 px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700">
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Calendar View Component
//   const CalendarView = () => (
//     <div className="bg-white rounded-lg border p-4">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-lg font-semibold">Visit Calendar</h2>
//         <input
//           type="date"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//           className="border rounded px-3 py-2 text-sm"
//         />
//       </div>
      
//       <div className="space-y-3">
//         {todaysBookings.length === 0 ? (
//           <p className="text-gray-500 text-center py-8">No visits scheduled for this date</p>
//         ) : (
//           todaysBookings.map(booking => <BookingCard key={booking.id} booking={booking} />)
//         )}
//       </div>
//     </div>
//   );

//   // Builder RM Management View
//   const BuilderRMView = () => (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-xl font-semibold">RM Management</h1>
//         <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
//           <Plus className="h-4 w-4" />
//           Add RM
//         </button>
//       </div>
      
//       <div className="grid gap-4">
//         {builderRMs.map(rm => (
//           <div key={rm.id} className="bg-white border rounded-lg p-4">
//             <div className="flex justify-between items-start">
//               <div className="flex-1">
//                 <div className="flex items-center gap-3 mb-2">
//                   <h3 className="font-medium text-gray-900">{rm.name}</h3>
//                   <span className={`px-2 py-1 text-xs rounded ${getStatusColor(rm.status)}`}>
//                     {rm.role}
//                   </span>
//                 </div>
//                 <div className="grid grid-cols-3 gap-4 text-sm">
//                   <div>
//                     <p className="text-gray-600">Active Bookings</p>
//                     <p className="font-medium">{rm.activeBookings}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600">Completed Visits</p>
//                     <p className="font-medium">{rm.completedVisits}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600">Rating</p>
//                     <p className="font-medium">{rm.rating}/5</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex gap-2">
//                 <button 
//                   onClick={() => setSelectedRM(rm)}
//                   className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded hover:bg-blue-100 border border-blue-200"
//                 >
//                   <Eye className="h-3 w-3" />
//                 </button>
//                 <button className="px-3 py-1 bg-gray-50 text-gray-700 text-xs rounded hover:bg-gray-100 border border-gray-200">
//                   <Edit className="h-3 w-3" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   // RM Profile Modal
//   const RMProfileModal = () => {
//     if (!selectedRM) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-lg max-w-2xl w-full max-h-90vh overflow-y-auto">
//           <div className="p-4 border-b">
//             <div className="flex justify-between items-center">
//               <h2 className="text-lg font-semibold">{selectedRM.name} - Profile & Performance</h2>
//               <button 
//                 onClick={() => setSelectedRM(null)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <XCircle className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
          
//           <div className="p-4 space-y-6">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//               <div className="text-center p-3 bg-blue-50 rounded">
//                 <p className="text-2xl font-bold text-blue-600">{selectedRM.activeBookings}</p>
//                 <p className="text-sm text-gray-600">Active Bookings</p>
//               </div>
//               <div className="text-center p-3 bg-green-50 rounded">
//                 <p className="text-2xl font-bold text-green-600">{selectedRM.completedVisits}</p>
//                 <p className="text-sm text-gray-600">Completed</p>
//               </div>
//               <div className="text-center p-3 bg-yellow-50 rounded">
//                 <p className="text-2xl font-bold text-yellow-600">{selectedRM.rating}</p>
//                 <p className="text-sm text-gray-600">Rating</p>
//               </div>
//               <div className="text-center p-3 bg-purple-50 rounded">
//                 <p className="text-2xl font-bold text-purple-600">85%</p>
//                 <p className="text-sm text-gray-600">Success Rate</p>
//               </div>
//             </div>

//             <div className="border-t pt-4">
//               <h3 className="font-medium mb-3">Recent Performance</h3>
//               <div className="space-y-2">
//                 {[1, 2, 3].map(i => (
//                   <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100">
//                     <span className="text-sm">Jan {10 + i}, 2024</span>
//                     <span className="text-sm text-gray-600">3 visits completed</span>
//                     <span className="text-sm text-green-600">100% success</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             <div className="flex gap-2">
//               <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//                 Assign Booking
//               </button>
//               <button className="flex-1 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
//                 View All Bookings
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <h1 className="text-xl font-semibold text-gray-900">
//               {userType === 'builder' ? 'RM Management' : `Welcome, ${rmData.name}`}
//             </h1>
//             <div className="flex items-center gap-3">
//               <span className="text-sm text-gray-600">ID: {rmData.employeeId}</span>
//               <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                 <User className="h-4 w-4 text-blue-600" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         {userType === 'builder' ? (
//           <BuilderRMView />
//         ) : (
//           <>
//             {/* Navigation Tabs */}
//             <div className="flex gap-1 mb-6 bg-white p-1 rounded-lg border">
//               {[
//                 { key: 'dashboard', label: 'Dashboard' },
//                 { key: 'bookings', label: 'My Bookings' },
//                 { key: 'calendar', label: 'Calendar' }
//               ].map(tab => (
//                 <button
//                   key={tab.key}
//                   onClick={() => setActiveTab(tab.key)}
//                   className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
//                     activeTab === tab.key
//                       ? 'bg-blue-100 text-blue-700'
//                       : 'text-gray-600 hover:text-gray-900'
//                   }`}
//                 >
//                   {tab.label}
//                 </button>
//               ))}
//             </div>

//             {/* Tab Content */}
//             {activeTab === 'dashboard' && (
//               <div className="space-y-6">
//                 <DashboardStats />
//                 <div>
//                   <h2 className="text-lg font-semibold mb-4">Today's Visits</h2>
//                   <div className="grid gap-4">
//                     {todaysBookings.length === 0 ? (
//                       <div className="bg-white border rounded-lg p-8 text-center">
//                         <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
//                         <p className="text-gray-500">No visits scheduled for today</p>
//                       </div>
//                     ) : (
//                       todaysBookings.map(booking => <BookingCard key={booking.id} booking={booking} />)
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'bookings' && (
//               <div className="space-y-4">
//                 <h2 className="text-lg font-semibold">All Bookings</h2>
//                 <div className="grid gap-4">
//                   {bookings.map(booking => <BookingCard key={booking.id} booking={booking} />)}
//                 </div>
//               </div>
//             )}

//             {activeTab === 'calendar' && <CalendarView />}
//           </>
//         )}
//       </div>

//       {/* Modals */}
//       <BookingDetailsModal />
//       <RMProfileModal />
//     </div>
//   );
// };

// export default RMDashboard;


import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Phone, Mail, MapPin, User, BarChart3, CheckCircle, XCircle, AlertCircle, Edit, Eye, Plus, Loader, Star } from 'lucide-react';

// API Configuration
const API_BASE_URL = 'http://localhost:5029';

const api = {
  get: async (endpoint) => {
    const token = localStorage.getItem('rm_token');
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  },
  
  post: async (endpoint, data) => {
    const token = localStorage.getItem('rm_token');
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  },
  
  patch: async (endpoint, data) => {
    const token = localStorage.getItem('rm_token');
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }
};

// Status color mapping
const getStatusColor = (status) => {
  const colors = {
    PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    SCHEDULED: 'bg-blue-100 text-blue-800 border-blue-200',
    IN_PROGRESS: 'bg-blue-100 text-blue-800 border-blue-200',
    COMPLETED: 'bg-green-100 text-green-800 border-green-200',
    CANCELLED: 'bg-red-100 text-red-800 border-red-200',
    MISSED: 'bg-gray-100 text-gray-800 border-gray-200'
  };
  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const RMDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal states
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  
  // Data states
  const [rmData, setRmData] = useState({
    name: 'RM User',
    employeeId: 'RM0000',
    performance: {
      totalBookings: 0,
      completedVisits: 0,
      missedVisits: 0,
      averageRating: 0
    }
  });
  const [dashboardStats, setDashboardStats] = useState({
    activeBookings: 0,
    completedVisits: 0,
    missedVisits: 0,
    todaysVisits: 0,
    monthlyPerformance: {
      totalVisits: 0,
      completedVisits: 0,
      averageRating: 0,
      completionRate: 0
    }
  });
  const [bookings, setBookings] = useState([]);
  const [todaysVisits, setTodaysVisits] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // ===== API FUNCTIONS =====

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get('/rm-dashboard/dashboard-stats');
      if (response.success) {
        setDashboardStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setError('Failed to fetch dashboard statistics');
    }
  };

  const fetchTodaysVisits = async () => {
    try {
      const response = await api.get('/rm-dashboard/todays-visits');
      if (response.success) {
        setTodaysVisits(response.data.visits || []);
      }
    } catch (error) {
      console.error('Error fetching today\'s visits:', error);
      setError('Failed to fetch today\'s visits');
    }
  };

  const fetchMyBookings = async () => {
    try {
      const response = await api.get('/rm-dashboard/my-bookings?limit=20');
      if (response.success) {
        setBookings(response.data.bookings || []);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Failed to fetch bookings');
    }
  };

  const fetchRMProfile = async () => {
    try {
      const response = await api.get('/rm-dashboard/profile');
      if (response.success) {
        setRmData(response.data.rm);
      }
    } catch (error) {
      console.error('Error fetching RM profile:', error);
      setError('Failed to fetch profile');
    }
  };

  const handleCompleteVisit = async (visitData) => {
    try {
      setLoading(true);
      const response = await api.patch(`/rm-dashboard/visit/${selectedBooking._id}/update`, {
        visitStatus: 'COMPLETED',
        ...visitData
      });
      
      if (response.success) {
        // Refresh data
        await Promise.all([
          fetchDashboardStats(),
          fetchTodaysVisits(),
          fetchMyBookings()
        ]);
        setShowCompleteModal(false);
        setSelectedBooking(null);
        setError('');
      }
    } catch (error) {
      console.error('Error completing visit:', error);
      setError('Failed to complete visit');
    } finally {
      setLoading(false);
    }
  };

  const handleRescheduleVisit = async (rescheduleData) => {
    try {
      setLoading(true);
      const response = await api.patch(`/rm-dashboard/visit/${selectedBooking._id}/reschedule`, rescheduleData);
      
      if (response.success) {
        // Refresh data
        await Promise.all([
          fetchDashboardStats(),
          fetchTodaysVisits(),
          fetchMyBookings()
        ]);
        setShowRescheduleModal(false);
        setSelectedBooking(null);
        setError('');
      }
    } catch (error) {
      console.error('Error rescheduling visit:', error);
      setError('Failed to reschedule visit');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelVisit = async (reason) => {
    try {
      setLoading(true);
      const response = await api.patch(`/rm-dashboard/visit/${selectedBooking._id}/cancel`, {
        reason: reason
      });
      
      if (response.success) {
        // Refresh data
        await Promise.all([
          fetchDashboardStats(),
          fetchTodaysVisits(),
          fetchMyBookings()
        ]);
        setSelectedBooking(null);
        setError('');
      }
    } catch (error) {
      console.error('Error cancelling visit:', error);
      setError('Failed to cancel visit');
    } finally {
      setLoading(false);
    }
  };

  // ===== COMPONENT LOAD EFFECTS =====

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchDashboardStats(),
          fetchTodaysVisits(),
          fetchMyBookings(),
          fetchRMProfile()
        ]);
      } catch (error) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // ===== DASHBOARD COMPONENTS =====

  const DashboardStats = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Active Bookings</p>
            <p className="text-xl font-semibold text-blue-600">{dashboardStats.activeBookings}</p>
          </div>
          <Calendar className="h-8 w-8 text-blue-600" />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-xl font-semibold text-green-600">{dashboardStats.completedVisits}</p>
          </div>
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Today's Visits</p>
            <p className="text-xl font-semibold text-orange-600">{dashboardStats.todaysVisits}</p>
          </div>
          <Clock className="h-8 w-8 text-orange-600" />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Rating</p>
            <p className="text-xl font-semibold text-yellow-600">
              {dashboardStats.monthlyPerformance.averageRating.toFixed(1)}/5
            </p>
          </div>
          <Star className="h-8 w-8 text-yellow-600" />
        </div>
      </div>
    </div>
  );

  const BookingCard = ({ booking, showActions = true }) => (
    <div className="bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{booking.property?.title}</h3>
          <p className="text-sm text-gray-600 flex items-center mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            {booking.property?.address}
          </p>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(booking.visitStatus || booking.bookingStatus)}`}>
          {booking.visitStatus || booking.bookingStatus}
        </span>
      </div>
      
      <div className="space-y-2 mb-3">
        <div className="flex items-center text-sm">
          <User className="h-4 w-4 mr-2 text-gray-500" />
          <span className="font-medium">{booking.tokenPaidBy?.name}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="h-4 w-4 mr-2" />
          {booking.tokenPaidBy?.phone}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-2" />
          {booking.siteVisitScheduledAt ? new Date(booking.siteVisitScheduledAt).toLocaleString() : 'Not scheduled'}
        </div>
      </div>

      {showActions && (
        <div className="flex gap-2 flex-wrap">
          <button 
            onClick={() => setSelectedBooking(booking)}
            className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded hover:bg-blue-100 border border-blue-200"
          >
            View Details
          </button>
          {booking.visitStatus !== 'COMPLETED' && (
            <>
              <button 
                onClick={() => {
                  setSelectedBooking(booking);
                  setShowCompleteModal(true);
                }}
                className="px-3 py-1 bg-green-50 text-green-700 text-xs rounded hover:bg-green-100 border border-green-200"
              >
                Complete
              </button>
              <button 
                onClick={() => {
                  setSelectedBooking(booking);
                  setShowRescheduleModal(true);
                }}
                className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs rounded hover:bg-yellow-100 border border-yellow-200"
              >
                Reschedule
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );

  const CompleteVisitModal = () => {
    const [formData, setFormData] = useState({
      duration: '',
      customerInterest: '',
      rating: 5,
      notes: '',
      followUpRequired: false,
      followUpDate: ''
    });

    if (!showCompleteModal || !selectedBooking) return null;

    const handleSubmit = (e) => {
      e.preventDefault();
      handleCompleteVisit(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Complete Visit</h2>
              <button 
                onClick={() => setShowCompleteModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Visit Duration (minutes)</label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                className="w-full border rounded px-3 py-2 text-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Customer Interest Level</label>
              <select 
                value={formData.customerInterest}
                onChange={(e) => setFormData({...formData, customerInterest: e.target.value})}
                className="w-full border rounded px-3 py-2 text-sm"
                required
              >
                <option value="">Select interest level</option>
                <option value="HIGH">High Interest</option>
                <option value="MEDIUM">Medium Interest</option>
                <option value="LOW">Low Interest</option>
                <option value="NOT_INTERESTED">Not Interested</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Visit Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows="3"
                placeholder="Customer showed interest in 2BHK unit..."
                className="w-full border rounded px-3 py-2 text-sm resize-none"
                required
              />
            </div>
            
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="followUp"
                checked={formData.followUpRequired}
                onChange={(e) => setFormData({...formData, followUpRequired: e.target.checked})}
                className="rounded" 
              />
              <label htmlFor="followUp" className="text-sm">Follow-up required</label>
            </div>
            
            {formData.followUpRequired && (
              <div>
                <label className="block text-sm font-medium mb-1">Follow-up Date</label>
                <input
                  type="date"
                  value={formData.followUpDate}
                  onChange={(e) => setFormData({...formData, followUpDate: e.target.value})}
                  className="w-full border rounded px-3 py-2 text-sm"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            )}
            
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCompleteModal(false)}
                className="flex-1 px-4 py-2 border rounded text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Loader className="h-4 w-4 animate-spin" /> : null}
                Complete Visit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const RescheduleModal = () => {
    const [formData, setFormData] = useState({
      newVisitDate: '',
      reason: ''
    });

    if (!showRescheduleModal || !selectedBooking) return null;

    const handleSubmit = (e) => {
      e.preventDefault();
      handleRescheduleVisit(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Reschedule Visit</h2>
              <button 
                onClick={() => setShowRescheduleModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Current Date & Time</label>
              <div className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                {selectedBooking.siteVisitScheduledAt ? 
                  new Date(selectedBooking.siteVisitScheduledAt).toLocaleString() : 
                  'Not scheduled'
                }
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">New Date & Time</label>
              <input
                type="datetime-local"
                value={formData.newVisitDate}
                onChange={(e) => setFormData({...formData, newVisitDate: e.target.value})}
                className="w-full border rounded px-3 py-2 text-sm"
                min={new Date().toISOString().slice(0, 16)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Reason for Rescheduling</label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                rows="2"
                placeholder="Customer requested to reschedule..."
                className="w-full border rounded px-3 py-2 text-sm resize-none"
                required
              />
            </div>
            
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowRescheduleModal(false)}
                className="flex-1 px-4 py-2 border rounded text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Loader className="h-4 w-4 animate-spin" /> : null}
                Reschedule
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const BookingDetailsModal = () => {
    if (!selectedBooking) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full max-h-90vh overflow-y-auto">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Booking Details</h2>
              <button 
                onClick={() => setSelectedBooking(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="p-4 space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">{selectedBooking.property?.title}</h3>
              <p className="text-sm text-gray-600">{selectedBooking.property?.address}</p>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Customer Details</h4>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Name:</span> {selectedBooking.tokenPaidBy?.name}</p>
                <p><span className="font-medium">Phone:</span> {selectedBooking.tokenPaidBy?.phone}</p>
                <p><span className="font-medium">Email:</span> {selectedBooking.tokenPaidBy?.email}</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Visit Information</h4>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Scheduled:</span> {
                  selectedBooking.siteVisitScheduledAt ? 
                    new Date(selectedBooking.siteVisitScheduledAt).toLocaleString() : 
                    'Not scheduled'
                }</p>
                <p><span className="font-medium">Status:</span> 
                  <span className={`ml-1 px-2 py-1 text-xs rounded ${getStatusColor(selectedBooking.visitStatus || selectedBooking.bookingStatus)}`}>
                    {selectedBooking.visitStatus || selectedBooking.bookingStatus}
                  </span>
                </p>
                <p><span className="font-medium">Token Amount:</span> ₹{selectedBooking.tokenAmount}</p>
              </div>
            </div>
            
            {selectedBooking.visitDetails?.visitNotes && (
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Visit Notes</h4>
                <p className="text-sm text-gray-600">{selectedBooking.visitDetails.visitNotes}</p>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t bg-gray-50 flex gap-2 flex-wrap">
            {selectedBooking.visitStatus !== 'COMPLETED' && (
              <>
                <button 
                  onClick={() => {
                    setShowCompleteModal(true);
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  Complete
                </button>
                <button 
                  onClick={() => {
                    setShowRescheduleModal(true);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  Reschedule
                </button>
                <button 
                  onClick={() => {
                    if (window.confirm('Are you sure you want to cancel this visit?')) {
                      handleCancelVisit('RM cancelled visit');
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const CalendarView = () => (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Visit Calendar</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        />
      </div>
      
      <div className="space-y-3">
        {todaysVisits.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No visits scheduled for this date</p>
        ) : (
          todaysVisits.map(booking => <BookingCard key={booking._id} booking={booking} />)
        )}
      </div>
    </div>
  );

  if (loading && activeTab === 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-semibold text-gray-900">
              Welcome, {rmData.name}
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">ID: {rmData.employeeId}</span>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-red-50 border border-red-200 rounded p-3 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span className="text-red-700 text-sm">{error}</span>
            <button 
              onClick={() => setError('')}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              <XCircle className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Tabs */}
        <div className="flex gap-1 mb-6 bg-white p-1 rounded-lg border">
          {[
            { key: 'dashboard', label: 'Dashboard' },
            { key: 'bookings', label: 'My Bookings' },
            { key: 'calendar', label: 'Calendar' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <DashboardStats />
            <div>
              <h2 className="text-lg font-semibold mb-4">Today's Visits</h2>
              <div className="grid gap-4">
                {todaysVisits.length === 0 ? (
                  <div className="bg-white border rounded-lg p-8 text-center">
                    <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No visits scheduled for today</p>
                  </div>
                ) : (
                  todaysVisits.map(booking => <BookingCard key={booking._id} booking={booking} />)
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">All My Bookings</h2>
            <div className="grid gap-4">
              {bookings.map(booking => <BookingCard key={booking._id} booking={booking} />)}
            </div>
          </div>
        )}

        {activeTab === 'calendar' && <CalendarView />}
      </div>

      {/* Modals */}
      <BookingDetailsModal />
      <CompleteVisitModal />
      <RescheduleModal />
    </div>
  );
};

export default RMDashboard;