import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, User, MapPin, Phone, Filter } from 'lucide-react';



// Enhanced Calendar Component
const RMCalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewMode, setViewMode] = useState('month'); // month, week, day
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    rm: 'all'
  });

  // Mock bookings data with dates
  const [bookings] = useState([
    {
      id: '1',
      date: '2024-01-15',
      time: '10:00',
      property: 'Luxury Apartment',
      customer: 'Amit Sharma',
      phone: '+91 9876543210',
      status: 'PENDING',
      rm: 'Rajesh Kumar'
    },
    {
      id: '2',
      date: '2024-01-15',
      time: '14:00',
      property: 'Modern Villa',
      customer: 'Priya Singh',
      phone: '+91 8765432109',
      status: 'COMPLETED',
      rm: 'Sneha Patel'
    },
    {
      id: '3',
      date: '2024-01-16',
      time: '11:00',
      property: 'Cozy Apartment',
      customer: 'Rohit Verma',
      phone: '+91 7654321098',
      status: 'PENDING',
      rm: 'Rajesh Kumar'
    }
  ]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDate = firstDay.getDay();

    const days = [];
    
    // Previous month days
    for (let i = startDate - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        bookings: []
      });
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const dateStr = currentDate.toISOString().split('T')[0];
      const dayBookings = bookings.filter(booking => booking.date === dateStr);
      
      days.push({
        date: currentDate,
        isCurrentMonth: true,
        bookings: dayBookings
      });
    }
    
    // Next month days to fill the grid
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        bookings: []
      });
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + direction)));
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'bg-yellow-500',
      COMPLETED: 'bg-green-500',
      IN_PROGRESS: 'bg-blue-500',
      CANCELLED: 'bg-red-500',
      MISSED: 'bg-gray-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const filteredBookings = selectedDate ? 
    bookings.filter(booking => booking.date === selectedDate.toISOString().split('T')[0]) : 
    [];

  return (
    <div className="bg-white rounded-lg border">
      {/* Calendar Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Visit Calendar</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-3 py-1 border rounded text-sm hover:bg-gray-50 flex items-center gap-1"
            >
              <Filter className="h-3 w-3" />
              Filters
            </button>
            <select 
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="month">Month</option>
              <option value="week">Week</option>
              <option value="day">Day</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          <h3 className="text-lg font-medium">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-3 bg-gray-50 rounded border">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1">Status</label>
                <select 
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="w-full border rounded px-2 py-1 text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">RM</label>
                <select 
                  value={filters.rm}
                  onChange={(e) => setFilters({...filters, rm: e.target.value})}
                  className="w-full border rounded px-2 py-1 text-sm"
                >
                  <option value="all">All RMs</option>
                  <option value="Rajesh Kumar">Rajesh Kumar</option>
                  <option value="Sneha Patel">Sneha Patel</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex">
        {/* Calendar Grid */}
        <div className="flex-1 p-4">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-xs font-medium text-gray-600">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <div
                key={index}
                onClick={() => setSelectedDate(day.date)}
                className={`min-h-20 p-1 border rounded cursor-pointer hover:bg-gray-50 ${
                  !day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''
                } ${
                  selectedDate && day.date.toDateString() === selectedDate.toDateString() 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : ''
                }`}
              >
                <div className="text-sm font-medium mb-1">
                  {day.date.getDate()}
                </div>
                <div className="space-y-1">
                  {day.bookings.slice(0, 2).map(booking => (
                    <div
                      key={booking.id}
                      className="text-xs p-1 rounded bg-gray-100 truncate"
                      title={`${booking.time} - ${booking.customer}`}
                    >
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(booking.status)}`}></div>
                        <span>{booking.time}</span>
                      </div>
                    </div>
                  ))}
                  {day.bookings.length > 2 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{day.bookings.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Day Details Sidebar */}
        {selectedDate && (
          <div className="w-80 border-l p-4">
            <h3 className="font-medium mb-3">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            
            {filteredBookings.length === 0 ? (
              <p className="text-gray-500 text-sm">No visits scheduled</p>
            ) : (
              <div className="space-y-3">
                {filteredBookings.map(booking => (
                  <div key={booking.id} className="border rounded p-3 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{booking.time}</span>
                      <span className={`px-2 py-1 text-xs rounded ${getStatusColor(booking.status)} text-white`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{booking.property}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{booking.customer}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        <span>{booking.phone}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex gap-1">
                      <button className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded hover:bg-blue-100">
                        View
                      </button>
                      <button className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded hover:bg-green-100">
                        Complete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <button className="w-full mt-4 px-3 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded hover:border-gray-400 hover:text-gray-700 flex items-center justify-center gap-2">
              <Plus className="h-4 w-4" />
              Add Visit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


export default RMCalendarView

// Main App Component that combines everything
// const RMManagementApp = () => {
//   const [userType, setUserType] = useState('rm'); // 'rm' or 'builder'

//   return (
//     <AuthMiddleware userType={userType}>
//       <div className="min-h-screen bg-gray-50">
//         {/* Switch User Type for Demo */}
//         <div className="bg-white border-b p-2">
//           <div className="max-w-7xl mx-auto flex justify-between items-center">
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setUserType('rm')}
//                 className={`px-3 py-1 text-sm rounded ${userType === 'rm' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'}`}
//               >
//                 RM View
//               </button>
//               <button
//                 onClick={() => setUserType('builder')}
//                 className={`px-3 py-1 text-sm rounded ${userType === 'builder' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'}`}
//               >
//                 Builder View
//               </button>
//             </div>
//             <button
//               onClick={() => {
//                 localStorage.removeItem(`${userType}_token`);
//                 window.location.reload();
//               }}
//               className="text-sm text-gray-600 hover:text-gray-900"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto p-4">
//           <div className="grid gap-6">
//             <RMCalendarView />
//             <PerformanceAnalytics />
//           </div>
//         </div>
//       </div>
//     </AuthMiddleware>
//   );
// };

// export default RMManagementApp;

// // Performance Analytics Component
// const PerformanceAnalytics = () => {
//   const [timeRange, setTimeRange] = useState('week');
//   const [selectedMetric, setSelectedMetric] = useState('visits');

//   const mockData = {
//     week: {
//       visits: [12, 15, 18, 14, 20, 16, 22],
//       completion: [85, 90, 88, 92, 87, 89, 94],
//       rating: [4.2, 4.3, 4.1, 4.5, 4.2, 4.4, 4.6]
//     },
//     month: {
//       visits: [45, 52, 48, 58, 51, 49, 55, 62, 59, 53, 56, 64, 61, 58, 63, 67, 65, 60, 68, 71, 69, 66, 73, 76, 74, 70, 77, 80, 78, 75],
//       completion: [88, 91, 85, 93, 89, 87, 92, 90, 94, 86, 91, 93, 88, 89, 95, 92, 90, 87, 94, 96, 93, 89, 95, 97, 94, 91, 96, 98, 95, 92],
//       rating: [4.2, 4.3, 4.1, 4.4, 4.2, 4.0, 4.5, 4.3, 4.6, 4.1, 4.4, 4.5, 4.2, 4.3, 4.7, 4.4, 4.3, 4.1, 4.6, 4.8, 4.5, 4.2, 4.7, 4.9, 4.6, 4.4, 4.8, 5.0, 4.7, 4.5]
//     }
//   };

//   const currentData = mockData[timeRange];
//   const labels = timeRange === 'week' 
//     ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//     : Array.from({length: 30}, (_, i) => i + 1);

//   return (
//     <div className="bg-white rounded-lg border p-4">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="font-medium">Performance Analytics</h3>
//         <div className="flex gap-2">
//           <select 
//             value={selectedMetric}
//             onChange={(e) => setSelectedMetric(e.target.value)}
//             className="border rounded px-2 py-1 text-sm"
//           >
//             <option value="visits">Visits</option>
//             <option value="completion">Completion %</option>
//             <option value="rating">Rating</option>
//           </select>
//           <select 
//             value={timeRange}
//             onChange={(e) => setTimeRange(e.target.value)}
//             className="border rounded px-2 py-1 text-sm"
//           >
//             <option value="week">This Week</option>
//             <option value="month">This Month</option>
//           </select>
//         </div>
//       </div>

//       <div className="h-48 flex items-end justify-between gap-2">
//         {currentData[selectedMetric].map((value, index) => {
//           const maxValue = Math.max(...currentData[selectedMetric]);
//           const height = (value / maxValue) * 100;
          
//           return (
//             <div key={index} className="flex flex-col items-center flex-1">
//               <div 
//                 className="bg-blue-500 rounded-t w-full min-h-1 transition-all hover:bg-blue-600"
//                 style={{ height: `${height}%` }}
//                 title={`${labels[index]}: ${value}${selectedMetric === 'completion' ? '%' : selectedMetric === 'rating' ? '/5' : ''}`}
//               />
//               <span className="text-xs text-gray-600 mt-1">
//                 {labels[index]}
//               </span>
//             </div>
//           );
//         })}
//       </div>

//       <div className="mt-4 grid grid-cols-3 gap-4 text-center">
//         <div>
//           <p className="text-2xl font-bold text-blue-600">
//             {currentData.visits.reduce((a, b) => a + b, 0)}
//           </p>
//           <p className="text-xs text-gray-600">Total Visits</p>
//         </div>
//         <div>
//           <p className="text-2xl font-bold text-green-600">
//             {Math.round(currentData.completion.reduce((a, b) => a + b, 0) / currentData.completion.length)}%
//           </p>
//           <p className="text-xs text-gray-600">Avg Completion</p>
//         </div>
//         <div>
//           <p className="text-2xl font-bold text-yellow-600">
//             {(currentData.rating.reduce((a, b) => a + b, 0) / currentData.rating.length).toFixed(1)}
//           </p>
//           <p className="text-xs text-gray-600">Avg Rating</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main App Component that combines everything
// const RMManagementApp = () => {
//   const [userType, setUserType] = useState('rm'); // 'rm' or 'builder'
//   const [currentView, setCurrentView] = useState('dashboard');

//   return (
//     <AuthMiddleware userType={userType}>
//       <div className="min-h-screen bg-gray-50">
//         {/* Switch User Type for Demo */}
//         <div className="bg-white border-b p-2">
//           <div className="max-w-7xl mx-auto flex justify-between items-center">
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setUserType('rm')}
//                 className={`px-3 py-1 text-sm rounded ${userType === 'rm' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'}`}
//               >
//                 RM View
//               </button>
//               <button
//                 onClick={() => setUserType('builder')}
//                 className={`px-3 py-1 text-sm rounded ${userType === 'builder' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'}`}
//               >
//                 Builder View
//               </button>
//             </div>
//             <button
//               onClick={() => {
//                 localStorage.removeItem(`${userType}_token`);
//                 window.location.reload();
//               }}
//               className="text-sm text-gray-600 hover:text-gray-900"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto p-4">
//           <div className="grid gap-6">
//             <RMCalendarView />
//             <PerformanceAnalytics />
//           </div>
//         </div>
//       </div>
//     </AuthMiddleware>
//   );
// };

// export default RMManagementApp;