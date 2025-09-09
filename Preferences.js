import React from 'react';

function Preferences({ currentUser, updatePreferences }) {
  const handleToggle = (type) => {
    const newPreferences = {
      ...currentUser.notifications,
      [type]: !currentUser.notifications[type]
    };
    updatePreferences(currentUser.id, newPreferences);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">⚙️ Preferences</h2>
        <p className="text-gray-600 mt-1">Manage your notification settings and account preferences</p>
      </div>

      {/* User Info */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">👤 Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <div className="form-input bg-gray-50">{currentUser.name}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <div className="form-input bg-gray-50">{currentUser.role}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="form-input bg-gray-50">{currentUser.email}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <div className="form-input bg-gray-50">{currentUser.phone}</div>
          </div>
        </div>

        <div className="mt-4 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Reputation:</span>
            <span className="font-semibold text-blue-600">{currentUser.rep}</span>
          </div>
          {currentUser.premium && (
            <span className="badge badge-warning">✨ Premium Member</span>
          )}
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🔔 Notification Preferences</h3>
        <p className="text-sm text-gray-600 mb-6">
          Choose how you want to receive notifications about jobs, bids, and other important updates.
        </p>

        <div className="space-y-4">
          {/* Email Notifications */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">📧</div>
              <div>
                <h4 className="font-medium text-gray-900">Email Notifications</h4>
                <p className="text-sm text-gray-600">{currentUser.email}</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={currentUser.notifications?.email || false}
                onChange={() => handleToggle('email')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* SMS Notifications */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">📱</div>
              <div>
                <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                <p className="text-sm text-gray-600">{currentUser.phone}</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={currentUser.notifications?.sms || false}
                onChange={() => handleToggle('sms')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Notification Types */}
        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-3">📬 What you'll receive notifications for:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <span>📩</span>
              <span>New bids on your jobs</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>✅</span>
              <span>Bid acceptances</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>💰</span>
              <span>Payment releases</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>⭐</span>
              <span>New reviews</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🚩</span>
              <span>Dispute alerts</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>💬</span>
              <span>Forum mentions</span>
            </div>
          </div>
        </div>
      </div>

      {/* API Integration Status */}
      <div className="card bg-green-50 border-green-200">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">🔗</div>
          <div>
            <h3 className="font-medium text-green-900">API Integration</h3>
            <p className="text-sm text-green-700 mt-1">
              Connected to backend API for real-time notifications
            </p>
            <p className="text-xs text-green-600 mt-1">
              External notifications will be sent via SendGrid (email) and Twilio (SMS)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preferences;