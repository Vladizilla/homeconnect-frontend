import React from 'react';
import { reviews } from '../data';

function UserProfile({ user, currentUser, onBack, showProfile }) {
  if (!user) {
    return (
      <div className="card text-center py-8">
        <div className="text-4xl mb-4">❓</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">User not found</h3>
        <button onClick={onBack} className="btn-primary">
          ← Go Back
        </button>
      </div>
    );
  }

  const userReviews = reviews.filter(review => 
    review.reviewee === user.id || review.reviewer === user.id
  );

  const receivedReviews = userReviews.filter(review => review.reviewee === user.id);
  const givenReviews = userReviews.filter(review => review.reviewer === user.id);

  const averageRating = receivedReviews.length > 0 
    ? (receivedReviews.reduce((sum, review) => sum + review.rating, 0) / receivedReviews.length).toFixed(1)
    : 'N/A';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="btn-secondary">
          ← Back
        </button>
        <h2 className="text-2xl font-bold text-gray-900">👤 User Profile</h2>
      </div>

      {/* Profile Card */}
      <div className="card">
        <div className="flex items-start space-x-6">
          <div className="text-6xl">{user.avatar}</div>

          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
              <span className={`badge ${user.role === 'Employer' ? 'badge-info' : 'badge-success'}`}>
                {user.role}
              </span>
              {user.premium && (
                <span className="badge badge-warning">✨ Premium</span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-sm text-gray-500">Email:</span>
                <div className="font-medium">{user.email}</div>
              </div>
              <div>
                <span className="text-sm text-gray-500">Phone:</span>
                <div className="font-medium">{user.phone}</div>
              </div>
              <div>
                <span className="text-sm text-gray-500">Community:</span>
                <div className="font-medium">{user.community || 'Not specified'}</div>
              </div>
              <div>
                <span className="text-sm text-gray-500">Reputation:</span>
                <div className="font-medium text-blue-600">{user.rep}</div>
              </div>
            </div>

            {/* Maid-specific stats */}
            {user.role === 'Maid' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{user.rating || 'N/A'}</div>
                  <div className="text-sm text-green-700">Average Rating</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{user.completedJobs || 0}</div>
                  <div className="text-sm text-blue-700">Jobs Completed</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{user.responseTime || 'N/A'}</div>
                  <div className="text-sm text-purple-700">Response Time</div>
                </div>
              </div>
            )}

            {/* Badges */}
            {user.badges && user.badges.length > 0 && (
              <div>
                <span className="text-sm text-gray-500 block mb-2">Badges:</span>
                <div className="flex flex-wrap gap-2">
                  {user.badges.map((badge, idx) => (
                    <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {receivedReviews.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">⭐ Reviews ({receivedReviews.length})</h3>
          <div className="space-y-4">
            {receivedReviews.map(review => (
              <div key={review.id} className="border-l-4 border-yellow-400 pl-4 py-2">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < review.rating ? '⭐' : '☆'}</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    by {review.reviewerName} • {new Date(review.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
                {review.helpful > 0 && (
                  <div className="text-sm text-gray-500 mt-1">
                    👍 {review.helpful} people found this helpful
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Actions */}
      {currentUser.id !== user.id && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📞 Contact</h3>
          <div className="flex space-x-3">
            <button className="btn-primary">
              💬 Send Message
            </button>
            {user.role === 'Maid' && currentUser.role === 'Employer' && (
              <button className="btn-success">
                💼 Send Job Offer
              </button>
            )}
            <button className="btn-secondary">
              📋 View Full History
            </button>
          </div>
        </div>
      )}

      {/* Safety Notice */}
      <div className="card bg-blue-50 border-blue-200">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">🛡️</div>
          <div>
            <h3 className="font-medium text-blue-900">Safety Reminder</h3>
            <p className="text-sm text-blue-700 mt-1">
              Always use Home Connect's escrow system for payments and report any suspicious activity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;