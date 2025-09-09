// Home Connect - API Helper Functions
// This file handles communication with the backend API

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Generic API request helper
async function apiRequest(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}

// Notification API calls
export async function sendEmailNotification(data) {
  return apiRequest('/api/sendEmail', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function sendSMSNotification(data) {
  return apiRequest('/api/sendSMS', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// User API calls
export async function createUser(userData) {
  return apiRequest('/api/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

export async function updateUser(userId, userData) {
  return apiRequest(`/api/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
}

export async function getUser(userId) {
  return apiRequest(`/api/users/${userId}`);
}

// Job API calls
export async function createJob(jobData) {
  return apiRequest('/api/jobs', {
    method: 'POST',
    body: JSON.stringify(jobData),
  });
}

export async function getJobs(filters = {}) {
  const queryParams = new URLSearchParams(filters).toString();
  return apiRequest(`/api/jobs?${queryParams}`);
}

export async function updateJob(jobId, jobData) {
  return apiRequest(`/api/jobs/${jobId}`, {
    method: 'PUT',
    body: JSON.stringify(jobData),
  });
}

// Bid API calls
export async function createBid(bidData) {
  return apiRequest('/api/bids', {
    method: 'POST',
    body: JSON.stringify(bidData),
  });
}

export async function acceptBid(bidId) {
  return apiRequest(`/api/bids/${bidId}/accept`, {
    method: 'POST',
  });
}

export async function rejectBid(bidId) {
  return apiRequest(`/api/bids/${bidId}/reject`, {
    method: 'POST',
  });
}

// Review API calls
export async function createReview(reviewData) {
  return apiRequest('/api/reviews', {
    method: 'POST',
    body: JSON.stringify(reviewData),
  });
}

export async function getReviews(userId) {
  return apiRequest(`/api/reviews/user/${userId}`);
}

// Dispute API calls
export async function createDispute(disputeData) {
  return apiRequest('/api/disputes', {
    method: 'POST',
    body: JSON.stringify(disputeData),
  });
}

export async function resolveDispute(disputeId, resolution) {
  return apiRequest(`/api/disputes/${disputeId}/resolve`, {
    method: 'POST',
    body: JSON.stringify(resolution),
  });
}

// Forum API calls
export async function getForumTopics(community = 'all') {
  return apiRequest(`/api/forum/topics?community=${community}`);
}

export async function createForumTopic(topicData) {
  return apiRequest('/api/forum/topics', {
    method: 'POST',
    body: JSON.stringify(topicData),
  });
}

export async function createForumPost(topicId, postData) {
  return apiRequest(`/api/forum/topics/${topicId}/posts`, {
    method: 'POST',
    body: JSON.stringify(postData),
  });
}

// Payment API calls
export async function createPaymentIntent(amount, jobId) {
  return apiRequest('/api/payments/create-intent', {
    method: 'POST',
    body: JSON.stringify({ amount, jobId }),
  });
}

export async function releaseEscrow(jobId) {
  return apiRequest(`/api/payments/release-escrow/${jobId}`, {
    method: 'POST',
  });
}

// Search API calls
export async function searchMaids(filters) {
  const queryParams = new URLSearchParams(filters).toString();
  return apiRequest(`/api/search/maids?${queryParams}`);
}

// Leaderboard API calls
export async function getLeaderboard(community = 'all') {
  return apiRequest(`/api/leaderboard?community=${community}`);
}

// Notification preferences
export async function updateNotificationPreferences(userId, preferences) {
  return apiRequest(`/api/users/${userId}/notifications`, {
    method: 'PUT',
    body: JSON.stringify(preferences),
  });
}

// Health check
export async function healthCheck() {
  return apiRequest('/api/health');
}

// Mock notification sender (for demo purposes)
export function mockSendNotification(userId, type, message) {
  console.log(`🔔 Mock Notification to User ${userId}:`);
  console.log(`Type: ${type}`);
  console.log(`Message: ${message}`);

  // In a real app, this would trigger the actual API calls
  // For demo, we just log to console
  return Promise.resolve({ success: true, messageId: Math.random().toString(36) });
}

export default {
  sendEmailNotification,
  sendSMSNotification,
  createUser,
  updateUser,
  getUser,
  createJob,
  getJobs,
  updateJob,
  createBid,
  acceptBid,
  rejectBid,
  createReview,
  getReviews,
  createDispute,
  resolveDispute,
  getForumTopics,
  createForumTopic,
  createForumPost,
  createPaymentIntent,
  releaseEscrow,
  searchMaids,
  getLeaderboard,
  updateNotificationPreferences,
  healthCheck,
  mockSendNotification,
};