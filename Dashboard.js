import React, { useState } from 'react';
import { jobs as initialJobs, getUserById } from '../data';

function Dashboard({ currentUser, users, addNotification, showProfile }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [showJobForm, setShowJobForm] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    pay: '',
    community: 'Puerto Cancún',
    schedule: ''
  });

  const communities = [
    'Puerto Cancún', 'Zona Hotelera', 'El Centro', 'Playa del Carmen',
    'Playacar', 'Tulum Centro', 'Aldea Zama', 'Cozumel Centro'
  ];

  // Job posting (Employer)
  const handleCreateJob = (e) => {
    e.preventDefault();
    const job = {
      id: Date.now(),
      ...newJob,
      pay: parseInt(newJob.pay),
      employer: currentUser.id,
      status: 'Open',
      bids: [],
      requirements: [],
      images: ['🏠', '🧹']
    };

    setJobs(prev => [job, ...prev]);
    setNewJob({ title: '', description: '', pay: '', community: 'Puerto Cancún', schedule: '' });
    setShowJobForm(false);

    addNotification(currentUser.id, 'job', `Your job "${job.title}" has been posted`);
  };

  // Bid placement (Maid)
  const handlePlaceBid = (jobId, price, message) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    const bid = {
      maid: currentUser.id,
      price: parseInt(price),
      message: message || `I'm interested in this job!`,
      status: 'Pending',
      timestamp: new Date().toISOString()
    };

    setJobs(prev => prev.map(j => 
      j.id === jobId 
        ? { ...j, bids: [...j.bids, bid] }
        : j
    ));

    // Notify employer
    addNotification(job.employer, 'bid', `${currentUser.name} placed a bid on "${job.title}"`);
  };

  // Bid acceptance (Employer)
  const handleAcceptBid = (jobId, bidIndex) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    const acceptedBid = job.bids[bidIndex];

    setJobs(prev => prev.map(j => 
      j.id === jobId 
        ? { 
            ...j, 
            status: 'Hired',
            hiredMaid: acceptedBid.maid,
            bids: j.bids.map((bid, idx) => ({
              ...bid,
              status: idx === bidIndex ? 'Accepted' : 'Rejected'
            }))
          }
        : j
    ));

    // Notify maid
    const maid = getUserById(acceptedBid.maid);
    addNotification(acceptedBid.maid, 'hire', `Congratulations! Your bid for "${job.title}" was accepted`);
  };

  // Job completion
  const handleCompleteJob = (jobId) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    setJobs(prev => prev.map(j => 
      j.id === jobId 
        ? { ...j, status: 'Completed' }
        : j
    ));

    addNotification(job.employer, 'completion', `${currentUser.name} marked "${job.title}" as completed`);
    addNotification(job.hiredMaid, 'payment', `Payment for "${job.title}" has been released from escrow`);
  };

  const userJobs = currentUser.role === 'Employer' 
    ? jobs.filter(job => job.employer === currentUser.id)
    : jobs.filter(job => job.status === 'Open' || job.hiredMaid === currentUser.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {currentUser.role === 'Employer' ? '🏠 My Jobs' : '🧹 Available Jobs'}
          </h2>
          <p className="text-gray-600 mt-1">
            {currentUser.role === 'Employer' 
              ? 'Manage your job postings and review bids'
              : 'Find and bid on cleaning jobs in your area'
            }
          </p>
        </div>

        {currentUser.role === 'Employer' && (
          <button
            onClick={() => setShowJobForm(true)}
            className="btn-primary"
          >
            ➕ Post New Job
          </button>
        )}
      </div>

      {/* Job Creation Form */}
      {showJobForm && currentUser.role === 'Employer' && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">📝 Post New Job</h3>
          <form onSubmit={handleCreateJob} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input
                type="text"
                value={newJob.title}
                onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                className="form-input"
                placeholder="e.g., Deep clean 3-bedroom house"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newJob.description}
                onChange={(e) => setNewJob(prev => ({ ...prev, description: e.target.value }))}
                className="form-input"
                rows="3"
                placeholder="Describe what needs to be cleaned..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget (MXN)</label>
                <input
                  type="number"
                  value={newJob.pay}
                  onChange={(e) => setNewJob(prev => ({ ...prev, pay: e.target.value }))}
                  className="form-input"
                  placeholder="1200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Community</label>
                <select
                  value={newJob.community}
                  onChange={(e) => setNewJob(prev => ({ ...prev, community: e.target.value }))}
                  className="form-input"
                >
                  {communities.map(community => (
                    <option key={community} value={community}>{community}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={newJob.schedule}
                  onChange={(e) => setNewJob(prev => ({ ...prev, schedule: e.target.value }))}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button type="submit" className="btn-primary">
                📤 Post Job
              </button>
              <button 
                type="button" 
                onClick={() => setShowJobForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Jobs List */}
      <div className="space-y-4">
        {userJobs.length === 0 ? (
          <div className="card text-center py-8">
            <div className="text-4xl mb-4">
              {currentUser.role === 'Employer' ? '📝' : '🔍'}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {currentUser.role === 'Employer' ? 'No jobs posted yet' : 'No jobs available'}
            </h3>
            <p className="text-gray-600">
              {currentUser.role === 'Employer' 
                ? 'Click "Post New Job" to get started'
                : 'Check back later for new opportunities'
              }
            </p>
          </div>
        ) : (
          userJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              currentUser={currentUser}
              users={users}
              onPlaceBid={handlePlaceBid}
              onAcceptBid={handleAcceptBid}
              onCompleteJob={handleCompleteJob}
              showProfile={showProfile}
            />
          ))
        )}
      </div>
    </div>
  );
}

function JobCard({ job, currentUser, users, onPlaceBid, onAcceptBid, onCompleteJob, showProfile }) {
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidPrice, setBidPrice] = useState('');
  const [bidMessage, setBidMessage] = useState('');

  const employer = getUserById(job.employer);
  const hiredMaid = job.hiredMaid ? getUserById(job.hiredMaid) : null;
  const canBid = currentUser.role === 'Maid' && job.status === 'Open' && 
                 !job.bids.some(bid => bid.maid === currentUser.id);

  const handleSubmitBid = (e) => {
    e.preventDefault();
    onPlaceBid(job.id, bidPrice, bidMessage);
    setBidPrice('');
    setBidMessage('');
    setShowBidForm(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      'Open': 'badge-info',
      'Hired': 'badge-warning',
      'Completed': 'badge-success'
    };
    return colors[status] || 'badge-info';
  };

  return (
    <div className="card">
      {/* Job Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
            <span className={`badge ${getStatusColor(job.status)}`}>
              {job.status}
            </span>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
            <span>💰 ${job.pay} MXN</span>
            <span>📍 {job.community}</span>
            <span>📅 {job.schedule}</span>
          </div>

          <p className="text-gray-700 mb-3">{job.description}</p>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Posted by:</span>
            <button
              onClick={() => showProfile(job.employer)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            >
              <span>{employer?.avatar}</span>
              <span className="font-medium">{employer?.name}</span>
            </button>
          </div>
        </div>

        <div className="text-right">
          {job.images && (
            <div className="flex space-x-1 text-2xl mb-2">
              {job.images.map((img, idx) => (
                <span key={idx}>{img}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hired Maid Info */}
      {hiredMaid && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✅ Hired:</span>
              <button
                onClick={() => showProfile(hiredMaid.id)}
                className="flex items-center space-x-2 text-green-700 hover:text-green-900 font-medium"
              >
                <span>{hiredMaid.avatar}</span>
                <span>{hiredMaid.name}</span>
              </button>
            </div>

            {currentUser.id === job.hiredMaid && job.status === 'Hired' && (
              <button
                onClick={() => onCompleteJob(job.id)}
                className="btn-success text-sm"
              >
                ✅ Mark Complete
              </button>
            )}
          </div>
        </div>
      )}

      {/* Bids Section */}
      {job.bids && job.bids.length > 0 && (
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-3">
            📩 Bids ({job.bids.length})
          </h4>

          <div className="space-y-3">
            {job.bids.map((bid, idx) => {
              const bidder = getUserById(bid.maid);
              return (
                <div key={idx} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <button
                          onClick={() => showProfile(bid.maid)}
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
                        >
                          <span>{bidder?.avatar}</span>
                          <span>{bidder?.name}</span>
                        </button>
                        <span className={`badge ${bid.status === 'Accepted' ? 'badge-success' : bid.status === 'Rejected' ? 'badge-danger' : 'badge-warning'}`}>
                          {bid.status}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mb-2">{bid.message}</p>
                      <div className="text-sm text-gray-500">
                        💰 ${bid.price} MXN • {new Date(bid.timestamp).toLocaleDateString()}
                      </div>
                    </div>

                    {currentUser.role === 'Employer' && currentUser.id === job.employer && 
                     job.status === 'Open' && bid.status === 'Pending' && (
                      <button
                        onClick={() => onAcceptBid(job.id, idx)}
                        className="btn-success text-sm ml-3"
                      >
                        ✅ Accept
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bid Form */}
      {canBid && (
        <div className="border-t pt-4">
          {!showBidForm ? (
            <button
              onClick={() => setShowBidForm(true)}
              className="btn-primary w-full"
            >
              📝 Place Bid
            </button>
          ) : (
            <form onSubmit={handleSubmitBid} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Price (MXN)</label>
                  <input
                    type="number"
                    value={bidPrice}
                    onChange={(e) => setBidPrice(e.target.value)}
                    className="form-input"
                    placeholder="1000"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <input
                    type="text"
                    value={bidMessage}
                    onChange={(e) => setBidMessage(e.target.value)}
                    className="form-input"
                    placeholder="Why you're the best choice..."
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <button type="submit" className="btn-primary flex-1">
                  📤 Submit Bid
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowBidForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;