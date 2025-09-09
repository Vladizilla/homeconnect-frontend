import React, { useState } from 'react';
import { moderatorLogs } from '../data';

function ModeratorPanel({ currentUser, users, addNotification }) {
  const [logs, setLogs] = useState(moderatorLogs);
  const [activeTab, setActiveTab] = useState('logs');
  const [selectedUser, setSelectedUser] = useState('');
  const [actionType, setActionType] = useState('warning');
  const [actionReason, setActionReason] = useState('');

  const handleModeratorAction = (e) => {
    e.preventDefault();
    if (!selectedUser || !actionReason) return;

    const user = users.find(u => u.id === selectedUser);
    const newLog = {
      id: Date.now(),
      action: `${getActionIcon(actionType)} ${getActionText(actionType)}`,
      details: `${actionReason} - User: ${user?.name}`,
      moderator: currentUser.name,
      timestamp: new Date().toISOString(),
      severity: getSeverity(actionType)
    };

    setLogs(prev => [newLog, ...prev]);

    // Notify the user
    addNotification(selectedUser, 'dispute', `Moderator action: ${getActionText(actionType)} - ${actionReason}`);

    // Reset form
    setSelectedUser('');
    setActionReason('');

    alert(`Action completed: ${getActionText(actionType)} applied to ${user?.name}`);
  };

  const getActionIcon = (type) => {
    const icons = {
      warning: '⚠️',
      suspension: '🚫',
      ban: '🔨',
      verification: '✅',
      dispute: '🛡️'
    };
    return icons[type] || '📝';
  };

  const getActionText = (type) => {
    const texts = {
      warning: 'Warning Issued',
      suspension: 'Account Suspended',
      ban: 'Account Banned',
      verification: 'Profile Verified',
      dispute: 'Dispute Resolved'
    };
    return texts[type] || 'Action Taken';
  };

  const getSeverity = (type) => {
    const severities = {
      warning: 'medium',
      suspension: 'high',
      ban: 'high',
      verification: 'low',
      dispute: 'high'
    };
    return severities[type] || 'medium';
  };

  const getSeverityColor = (severity) => {
    const colors = {
      low: 'border-l-green-500 bg-green-50',
      medium: 'border-l-yellow-500 bg-yellow-50',
      high: 'border-l-red-500 bg-red-50'
    };
    return colors[severity] || 'border-l-gray-500 bg-gray-50';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">🛡️ Moderator Panel</h2>
        <p className="text-gray-600 mt-1">Manage community safety and resolve disputes</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('logs')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'logs'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          📋 Audit Logs
        </button>
        <button
          onClick={() => setActiveTab('actions')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'actions'
              ? 'bg-white text-red-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          ⚡ Take Action
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'reports'
              ? 'bg-white text-yellow-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🚩 Reports
        </button>
      </div>

      {/* Audit Logs */}
      {activeTab === 'logs' && (
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Recent Actions</h3>
            <div className="space-y-3">
              {logs.map(log => (
                <div key={log.id} className={`border-l-4 pl-4 py-3 rounded-r-lg ${getSeverityColor(log.severity)}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{log.action}</h4>
                      <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                        <span>👤 {log.moderator}</span>
                        <span>🕐 {new Date(log.timestamp).toLocaleString()}</span>
                        <span className={`px-2 py-1 rounded-full ${
                          log.severity === 'high' ? 'bg-red-100 text-red-800' :
                          log.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {log.severity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Take Action */}
      {activeTab === 'actions' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Moderator Actions</h3>
          <form onSubmit={handleModeratorAction} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select User</label>
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="form-input"
                  required
                >
                  <option value="">Choose a user...</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.avatar} {user.name} ({user.role})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Action Type</label>
                <select
                  value={actionType}
                  onChange={(e) => setActionType(e.target.value)}
                  className="form-input"
                >
                  <option value="warning">⚠️ Issue Warning</option>
                  <option value="suspension">🚫 Suspend Account</option>
                  <option value="ban">🔨 Ban Account</option>
                  <option value="verification">✅ Verify Profile</option>
                  <option value="dispute">🛡️ Resolve Dispute</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
              <textarea
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                className="form-input"
                rows="3"
                placeholder="Explain the reason for this action..."
                required
              />
            </div>

            <button type="submit" className="btn-danger">
              🚨 Execute Action
            </button>
          </form>
        </div>
      )}

      {/* Reports */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🚩 User Reports</h3>
            <div className="space-y-3">
              <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-red-900">Report #001</h4>
                    <p className="text-sm text-red-700 mt-1">User "Fake Account" reported for no-show</p>
                    <div className="text-xs text-red-600 mt-2">
                      Reported by: María González • 2 hours ago
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="btn-success text-sm">✅ Resolve</button>
                    <button className="btn-danger text-sm">🚫 Take Action</button>
                  </div>
                </div>
              </div>

              <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-yellow-900">Report #002</h4>
                    <p className="text-sm text-yellow-700 mt-1">Dispute over payment for cleaning job</p>
                    <div className="text-xs text-yellow-600 mt-2">
                      Reported by: Luis Hernández • 1 day ago
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="btn-success text-sm">✅ Resolve</button>
                    <button className="btn-secondary text-sm">👁 Review</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">24</div>
          <div className="text-sm text-gray-600">Active Users</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">12</div>
          <div className="text-sm text-gray-600">Resolved Today</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-600">3</div>
          <div className="text-sm text-gray-600">Pending Reports</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-red-600">1</div>
          <div className="text-sm text-gray-600">Banned Users</div>
        </div>
      </div>
    </div>
  );
}

export default ModeratorPanel;