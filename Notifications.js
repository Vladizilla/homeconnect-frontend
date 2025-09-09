import React, { useState } from 'react';
import { timeAgo } from '../data';

function Notifications({ currentUser, notifications, users }) {
  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    return notif.type === filter;
  });

  const notificationTypes = [
    { id: 'all', label: 'All', icon: '🔔' },
    { id: 'bid', label: 'Bids', icon: '📩' },
    { id: 'hire', label: 'Hired', icon: '✅' },
    { id: 'payment', label: 'Payments', icon: '💰' },
    { id: 'review', label: 'Reviews', icon: '⭐' },
    { id: 'dispute', label: 'Disputes', icon: '🚩' }
  ];

  const getNotificationColor = (type) => {
    const colors = {
      bid: 'border-l-blue-500 bg-blue-50',
      hire: 'border-l-green-500 bg-green-50',
      payment: 'border-l-yellow-500 bg-yellow-50',
      review: 'border-l-purple-500 bg-purple-50',
      dispute: 'border-l-red-500 bg-red-50',
      completion: 'border-l-green-500 bg-green-50'
    };
    return colors[type] || 'border-l-gray-500 bg-gray-50';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">🔔 Notifications</h2>
        <p className="text-gray-600 mt-1">Stay updated on your jobs, bids, and messages</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {notificationTypes.map(type => (
          <button
            key={type.id}
            onClick={() => setFilter(type.id)}
            className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
              filter === type.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {type.icon} {type.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="card text-center py-8">
            <div className="text-4xl mb-4">📭</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? "You're all caught up! New notifications will appear here."
                : `No ${filter} notifications at the moment.`
              }
            </p>
          </div>
        ) : (
          filteredNotifications.map(notif => (
            <div
              key={notif.id}
              className={`card border-l-4 ${getNotificationColor(notif.type)} ${
                !notif.read ? 'ring-2 ring-blue-100' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{notif.icon}</div>

                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 font-medium">{notif.message}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-500">
                      {timeAgo(notif.timestamp)}
                    </span>
                    {!notif.read && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        New
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    notif.type === 'bid' ? 'bg-blue-100 text-blue-800' :
                    notif.type === 'hire' ? 'bg-green-100 text-green-800' :
                    notif.type === 'payment' ? 'bg-yellow-100 text-yellow-800' :
                    notif.type === 'review' ? 'bg-purple-100 text-purple-800' :
                    notif.type === 'dispute' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {notif.type}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* External Notification Status */}
      <div className="card bg-blue-50 border-blue-200">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">📱</div>
          <div>
            <h3 className="font-medium text-blue-900">External Notifications</h3>
            <p className="text-sm text-blue-700 mt-1">
              Email: {currentUser.notifications?.email ? '✅ Enabled' : '❌ Disabled'} • 
              SMS: {currentUser.notifications?.sms ? '✅ Enabled' : '❌ Disabled'}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Configure in Preferences to receive notifications via email and SMS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;