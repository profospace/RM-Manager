import React, { useState, useEffect } from 'react';


// Performance Analytics Component
const PerformanceAnalytics = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('visits');

  const mockData = {
    week: {
      visits: [12, 15, 18, 14, 20, 16, 22],
      completion: [85, 90, 88, 92, 87, 89, 94],
      rating: [4.2, 4.3, 4.1, 4.5, 4.2, 4.4, 4.6]
    },
    month: {
      visits: [45, 52, 48, 58, 51, 49, 55, 62, 59, 53, 56, 64, 61, 58, 63, 67, 65, 60, 68, 71, 69, 66, 73, 76, 74, 70, 77, 80, 78, 75],
      completion: [88, 91, 85, 93, 89, 87, 92, 90, 94, 86, 91, 93, 88, 89, 95, 92, 90, 87, 94, 96, 93, 89, 95, 97, 94, 91, 96, 98, 95, 92],
      rating: [4.2, 4.3, 4.1, 4.4, 4.2, 4.0, 4.5, 4.3, 4.6, 4.1, 4.4, 4.5, 4.2, 4.3, 4.7, 4.4, 4.3, 4.1, 4.6, 4.8, 4.5, 4.2, 4.7, 4.9, 4.6, 4.4, 4.8, 5.0, 4.7, 4.5]
    }
  };

  const currentData = mockData[timeRange];
  const labels = timeRange === 'week' 
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    : Array.from({length: 30}, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Performance Analytics</h3>
        <div className="flex gap-2">
          <select 
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="visits">Visits</option>
            <option value="completion">Completion %</option>
            <option value="rating">Rating</option>
          </select>
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      <div className="h-48 flex items-end justify-between gap-2">
        {currentData[selectedMetric].map((value, index) => {
          const maxValue = Math.max(...currentData[selectedMetric]);
          const height = (value / maxValue) * 100;
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="bg-blue-500 rounded-t w-full min-h-1 transition-all hover:bg-blue-600"
                style={{ height: `${height}%` }}
                title={`${labels[index]}: ${value}${selectedMetric === 'completion' ? '%' : selectedMetric === 'rating' ? '/5' : ''}`}
              />
              <span className="text-xs text-gray-600 mt-1">
                {labels[index]}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-blue-600">
            {currentData.visits.reduce((a, b) => a + b, 0)}
          </p>
          <p className="text-xs text-gray-600">Total Visits</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-green-600">
            {Math.round(currentData.completion.reduce((a, b) => a + b, 0) / currentData.completion.length)}%
          </p>
          <p className="text-xs text-gray-600">Avg Completion</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-yellow-600">
            {(currentData.rating.reduce((a, b) => a + b, 0) / currentData.rating.length).toFixed(1)}
          </p>
          <p className="text-xs text-gray-600">Avg Rating</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics