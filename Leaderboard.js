import React, { useState } from 'react';
import { leaderboard, communities } from '../data';

function Leaderboard({ currentUser, users, addNotification, showProfile }) {
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedCommunity, setSelectedCommunity] = useState('All Communities');
  const [activeTab, setActiveTab] = useState('top100');
  const [bidStatuses, setBidStatuses] = useState({});

  const cities = ['All Cities', ...Object.keys(communities)];
  const availableCommunities = selectedCity === 'All Cities' 
    ? ['All Communities']
    : ['All Communities', ...communities[selectedCity]];

  // Filter maids by location
  const filterMaidsByLocation = (maids) => {
    if (selectedCity === 'All Cities') return maids;
    return maids.filter(maid => {
      const user = users.find(u => u.id === maid.id);
      if (selectedCommunity === 'All Communities') {
        return communities[selectedCity]?.includes(user?.community);
      }
      return user?.community === selectedCommunity;
    });
  };

  const filteredTopMaids = filterMaidsByLocation(leaderboard.topMaids);
  const filteredDoNotHire = leaderboard.doNotHire; // Always show all for safety

  // Bid functionality
  const handleBid = (maidId) => {
    if (currentUser.role !== 'Employer') return;

    const maid = users.find(u => u.id === maidId) || leaderboard.topMaids.find(m => m.id === maidId);
    setBidStatuses(prev => ({
      ...prev,
      [maidId]: 'pending'
    }));

    addNotification(maidId, 'bid', `${currentUser.name} sent you a job offer`);
    addNotification(currentUser.id, 'bid', `Offer sent to ${maid?.name}`);

    // Simulate response after 3 seconds
    setTimeout(() => {
      const responses = ['accepted', 'declined', 'counter'];
      const response = responses[Math.floor(Math.random() * responses.length)];
      setBidStatuses(prev => ({
        ...prev,
        [maidId]: response
      }));

      if (response === 'accepted') {
        addNotification(currentUser.id, 'hire', `${maid?.name} accepted your offer!`);
      }
    }, 3000);
  };

  const getBidButtonText = (maidId) => {
    const status = bidStatuses[maidId];
    switch (status) {
      case 'pending': return '⏳ Pending...';
      case 'accepted': return '✅ Accepted';
      case 'declined': return '❌ Declined';
      case 'counter': return '🔄 Counter Offer';
      default: return '💼 Send Offer';
    }
  };

  const getBidButtonClass = (maidId) => {
    const status = bidStatuses[maidId];
    switch (status) {
      case 'pending': return 'btn-secondary cursor-not-allowed';
      case 'accepted': return 'btn-success cursor-not-allowed';
      case 'declined': return 'btn-danger cursor-not-allowed';
      case 'counter': return 'bg-orange-500 text-white px-3 py-1 rounded cursor-not-allowed';
      default: return 'btn-primary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">🏆 Leaderboard</h2>
        <p className="text-gray-600 mt-1">Top-rated cleaning professionals and safety alerts</p>
      </div>

      {/* Location Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setSelectedCommunity('All Communities');
              }}
              className="form-input"
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Community</label>
            <select
              value={selectedCommunity}
              onChange={(e) => setSelectedCommunity(e.target.value)}
              className="form-input"
              disabled={selectedCity === 'All Cities'}
            >
              {availableCommunities.map(community => (
                <option key={community} value={community}>{community}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('top100')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'top100'
              ? 'bg-white text-green-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🥇 Top 100 Maids
        </button>
        <button
          onClick={() => setActiveTab('doNotHire')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'doNotHire'
              ? 'bg-white text-red-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          ⚠️ Do Not Hire
        </button>
      </div>

      {/* Content */}
      {activeTab === 'top100' && (
        <div className="space-y-4">
          {filteredTopMaids.length === 0 ? (
            <div className="card text-center py-8">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No maids found</h3>
              <p className="text-gray-600">Try selecting a different city or community</p>
            </div>
          ) : (
            filteredTopMaids.map((maid, index) => (
              <div key={maid.id} className="card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Rank */}
                    <div className="text-2xl font-bold text-gray-400">
                      #{index + 1}
                    </div>

                    {/* Rank Badge */}
                    <div className="text-2xl">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅'}
                    </div>

                    {/* Avatar */}
                    <div className="text-3xl">{maid.avatar}</div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => showProfile(maid.id)}
                          className="text-lg font-semibold text-blue-600 hover:text-blue-800"
                        >
                          {maid.name}
                        </button>
                        <div className="flex space-x-1">
                          {maid.badges?.map((badge, idx) => (
                            <span key={idx} className="text-sm">{badge}</span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>⭐ {maid.rating}/5.0</span>
                        <span>🏠 {maid.completedJobs} jobs</span>
                        <span>📍 {maid.community}</span>
                        <span>🕐 {maid.responseTime}</span>
                      </div>

                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-sm text-gray-500">Last active:</span>
                        <span className="text-sm font-medium">{maid.lastActive}</span>
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">
                        Rep: {maid.rep}
                      </div>
                      <div className="text-sm text-gray-500">
                        Status: {bidStatuses[maid.id] || 'Available'}
                      </div>
                    </div>

                    {currentUser.role === 'Employer' && (
                      <button
                        onClick={() => handleBid(maid.id)}
                        disabled={bidStatuses[maid.id]}
                        className={getBidButtonClass(maid.id)}
                      >
                        {getBidButtonText(maid.id)}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'doNotHire' && (
        <div className="space-y-4">
          <div className="card bg-red-50 border-red-200">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">⚠️</div>
              <div>
                <h3 className="font-medium text-red-900">Safety Warning</h3>
                <p className="text-sm text-red-700 mt-1">
                  The following profiles have been reported by community members. Exercise caution.
                </p>
              </div>
            </div>
          </div>

          {filteredDoNotHire.map((profile, index) => (
            <div key={profile.id} className="card border-red-200 bg-red-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{profile.avatar}</div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold text-red-900">{profile.name}</span>
                      <span className={`badge ${
                        profile.status === 'Banned' ? 'badge-danger' :
                        profile.status === 'Suspended' ? 'badge-warning' :
                        'badge-danger'
                      }`}>
                        {profile.status}
                      </span>
                    </div>

                    <div className="text-sm text-red-700 mt-1">
                      <span className="font-medium">{profile.reports} reports</span>
                      <span className="mx-2">•</span>
                      <span>Last reported: {profile.lastReported}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {profile.reasons?.map((reason, idx) => (
                        <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {reason}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-semibold text-red-600">
                    🚫 AVOID
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Premium Upsell */}
      {!currentUser.premium && currentUser.role === 'Employer' && (
        <div className="card bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">✨</div>
              <div>
                <h3 className="font-medium text-purple-900">Upgrade to Premium</h3>
                <p className="text-sm text-purple-700 mt-1">
                  Get priority placement in search results and unlimited job postings
                </p>
              </div>
            </div>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;