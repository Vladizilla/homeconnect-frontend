import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Notifications from './components/Notifications';
import Preferences from './components/Preferences';
import Leaderboard from './components/Leaderboard';
import Forum from './components/Forum';
import UserProfile from './components/UserProfile';
import ModeratorPanel from './components/ModeratorPanel';
import { users, notifications as initialNotifications } from './data';
import { mockSendNotification } from './api';

function App() {
  // Current user state
  const [activeUserId, setActiveUserId] = useState('e1');
  const [currentUsers, setCurrentUsers] = useState(users);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedProfile, setSelectedProfile] = useState(null);

  const currentUser = currentUsers.find(u => u.id === activeUserId);

  // Notification system
  const addNotification = (userId, type, message) => {
    const newNotif = {
      id: Date.now(),
      userId,
      type,
      message,
      timestamp: new Date(),
      read: false,
      icon: getNotificationIcon(type)
    };

    setNotifications(prev => [newNotif, ...prev]);

    // Mock external notification
    const user = currentUsers.find(u => u.id === userId);
    if (user && user.notifications.email) {
      mockSendNotification(userId, 'email', message);
    }
    if (user && user.notifications.sms) {
      mockSendNotification(userId, 'sms', message);
    }
  };

  const getNotificationIcon = (type) => {
    const icons = {
      bid: '📩',
      hire: '✅',
      completion: '🎉',
      payment: '💰',
      dispute: '🚩',
      review: '⭐',
      message: '💬'
    };
    return icons[type] || '🔔';
  };

  // Update user preferences
  const updateUserPreferences = (userId, preferences) => {
    setCurrentUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, notifications: { ...user.notifications, ...preferences } }
          : user
      )
    );
  };

  // Navigation
  const navItems = [
    { id: 'Dashboard', label: '🏠 Dashboard', show: true },
    { id: 'Leaderboard', label: '🏆 Leaderboard', show: true },
    { id: 'Forum', label: '💬 Forum', show: true },
    { id: 'Notifications', label: '🔔 Notifications', show: true },
    { id: 'Preferences', label: '⚙️ Preferences', show: true },
    { id: 'Moderator', label: '🛡️ Moderator', show: currentUser?.role === 'Admin' || activeUserId === 'e1' }
  ];

  const showProfile = (userId) => {
    setSelectedProfile(userId);
    setActiveTab('Profile');
  };

  const hideProfile = () => {
    setSelectedProfile(null);
    setActiveTab('Dashboard');
  };

  return (
    <div className="App min-h-screen bg-gray-50">
      {/* Header */}
      <header className="navbar bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">🏠 Home Connect</h1>
              <span className="ml-2 text-sm text-gray-500">Quintana Roo</span>
            </div>

            {/* User Switcher */}
            <div className="flex items-center space-x-4">
              <select 
                value={activeUserId} 
                onChange={(e) => setActiveUserId(e.target.value)}
                className="form-input text-sm"
              >
                {currentUsers.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.avatar} {user.name} ({user.role})
                  </option>
                ))}
              </select>

              {currentUser?.premium && (
                <span className="badge badge-warning">✨ Premium</span>
              )}

              <span className="text-sm text-gray-600">
                Rep: {currentUser?.rep || 0}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-2 overflow-x-auto">
            {navItems.filter(item => item.show).map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-button whitespace-nowrap ${
                  activeTab === item.id ? 'active' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'Dashboard' && (
          <Dashboard 
            currentUser={currentUser}
            users={currentUsers}
            addNotification={addNotification}
            showProfile={showProfile}
          />
        )}

        {activeTab === 'Leaderboard' && (
          <Leaderboard 
            currentUser={currentUser}
            users={currentUsers}
            addNotification={addNotification}
            showProfile={showProfile}
          />
        )}

        {activeTab === 'Forum' && (
          <Forum 
            currentUser={currentUser}
            users={currentUsers}
            addNotification={addNotification}
            showProfile={showProfile}
          />
        )}

        {activeTab === 'Notifications' && (
          <Notifications 
            currentUser={currentUser}
            notifications={notifications.filter(n => n.userId === activeUserId)}
            users={currentUsers}
          />
        )}

        {activeTab === 'Preferences' && (
          <Preferences 
            currentUser={currentUser}
            updatePreferences={updateUserPreferences}
          />
        )}

        {activeTab === 'Moderator' && (
          <ModeratorPanel 
            currentUser={currentUser}
            users={currentUsers}
            addNotification={addNotification}
          />
        )}

        {activeTab === 'Profile' && selectedProfile && (
          <UserProfile 
            user={currentUsers.find(u => u.id === selectedProfile)}
            currentUser={currentUser}
            onBack={hideProfile}
            showProfile={showProfile}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>🏠 Home Connect - Connecting you with trusted cleaning professionals in Quintana Roo</p>
            <p className="mt-1">
              <span className="text-green-600">●</span> API Ready for Render Backend 
              <span className="mx-2">•</span>
              <span className="text-blue-600">●</span> Demo Data Loaded
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;