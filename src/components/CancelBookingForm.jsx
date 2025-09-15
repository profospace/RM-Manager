import React, { useState, useEffect } from 'react';


const CancelBookingForm = ({ booking, isOpen, onClose, onCancel }) => {
  const [formData, setFormData] = useState({
    reason: '',
    comments: '',
    refundRequested: false,
    notifyCustomer: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  if (!isOpen || !booking) return null;
  const handleSubmit = async () => {
    if (!formData.reason) return;
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (onCancel) {
        onCancel({
          bookingId: booking.id,
          ...formData,
          cancelledAt: new Date().toISOString()
        });
      }
      onClose();
    } catch (error) {
      console.error('Cancel booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const cancellationReasons = [
    { value: 'CUSTOMER_REQUEST', label: 'Customer requested cancellation' },
    { value: 'PROPERTY_UNAVAILABLE', label: 'Property not available' },
    { value: 'TECHNICAL_ISSUE', label: 'Technical issues' },
    { value: 'EMERGENCY', label: 'Emergency situation' },
    { value: 'WEATHER_CONDITIONS', label: 'Weather conditions' },
    { value: 'RM_UNAVAILABLE', label: 'RM not available' },
    { value: 'DOUBLE_BOOKING', label: 'Double booking conflict' },
    { value: 'OTHER', label: 'Other reason' }
  ];
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Cancel Visit</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isSubmitting}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="p-4">
          {/* Warning Alert */}
          <div className="flex items-center gap-2 mb-4 p-3 bg-red-50 border border-red-200 rounded">
            <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-red-700 font-medium">Cancellation Warning</p>
              <p className="text-red-600">This action will cancel the scheduled visit and cannot be undone.</p>
            </div>
          </div>
          {/* Booking Summary */}
          <div className="bg-gray-50 rounded p-3 mb-4">
            <h3 className="font-medium text-gray-900 mb-2">Booking Details</h3>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-gray-400" />
                <span>{booking.property?.title || 'Property Name'}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-3 w-3 text-gray-400" />
                <span>{booking.customer?.name || 'Customer Name'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3 text-gray-400" />
                <span>{booking.customer?.phone || 'Phone Number'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3 text-gray-400" />
                <span>{booking.scheduledAt ? new Date(booking.scheduledAt).toLocaleString() : 'Visit Time'}</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Reason for Cancellation *
              </label>
              <select
                value={formData.reason}
                onChange={(e) => handleInputChange('reason', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Select reason...</option>
                {cancellationReasons.map(reason => (
                  <option key={reason.value} value={reason.value}>
                    {reason.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Additional Comments
              </label>
              <textarea
                value={formData.comments}
                onChange={(e) => handleInputChange('comments', e.target.value)}
                rows="3"
                placeholder="Provide additional details about the cancellation..."
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            {/* Cancellation Options */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="refundRequested"
                  checked={formData.refundRequested}
                  onChange={(e) => handleInputChange('refundRequested', e.target.checked)}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <label htmlFor="refundRequested" className="text-sm text-gray-700">
                  Request token refund
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="notifyCustomer"
                  checked={formData.notifyCustomer}
                  onChange={(e) => handleInputChange('notifyCustomer', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="notifyCustomer" className="text-sm text-gray-700">
                  Send cancellation notification to customer
                </label>
              </div>
            </div>
            {/* Impact Information */}
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
              <h4 className="text-sm font-medium text-yellow-800 mb-1">Cancellation Impact</h4>
              <ul className="text-xs text-yellow-700 space-y-1">
                <li>• Customer will be notified immediately</li>
                <li>• RM schedule will be updated</li>
                <li>• Property booking slot will be freed</li>
                {formData.refundRequested && <li>• Token refund will be processed within 3-5 business days</li>}
              </ul>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Keep Visit
              </button>
              <button
                onClick={handleSubmit}
                disabled={!formData.reason || isSubmitting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Cancelling...
                  </>
                ) : (
                  'Cancel Visit'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CancelBookingForm;