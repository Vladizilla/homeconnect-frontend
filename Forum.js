import React, { useState } from 'react';
import { forumTopics, communities, timeAgo } from '../data';

function Forum({ currentUser, users, addNotification, showProfile }) {
  const [topics, setTopics] = useState(forumTopics);
  const [selectedCommunity, setSelectedCommunity] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showNewTopicForm, setShowNewTopicForm] = useState(false);
  const [newTopic, setNewTopic] = useState({ title: '', content: '', tags: '' });
  const [newReply, setNewReply] = useState('');

  const communityOptions = ['All', 'General', ...Object.keys(communities)];

  const filteredTopics = topics.filter(topic => 
    selectedCommunity === 'All' || topic.community === selectedCommunity
  );

  const handleCreateTopic = (e) => {
    e.preventDefault();
    const topic = {
      id: Date.now(),
      title: newTopic.title,
      author: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      community: selectedCommunity === 'All' ? 'General' : selectedCommunity,
      tags: newTopic.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      sticky: false,
      replies: 0,
      views: 1,
      lastActivity: 'just now',
      content: newTopic.content,
      posts: []
    };

    setTopics(prev => [topic, ...prev]);
    setNewTopic({ title: '', content: '', tags: '' });
    setShowNewTopicForm(false);

    addNotification(currentUser.id, 'message', `Your topic "${topic.title}" has been posted`);
  };

  const handleReply = (topicId, content) => {
    const reply = {
      id: Date.now(),
      author: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      content: content,
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: []
    };

    setTopics(prev => prev.map(topic => 
      topic.id === topicId 
        ? { 
            ...topic, 
            posts: [...topic.posts, reply],
            replies: topic.replies + 1,
            lastActivity: 'just now'
          }
        : topic
    ));

    const topic = topics.find(t => t.id === topicId);
    if (topic && topic.author !== currentUser.id) {
      addNotification(topic.author, 'message', `${currentUser.name} replied to your topic "${topic.title}"`);
    }

    setNewReply('');
  };

  if (selectedTopic) {
    const topic = topics.find(t => t.id === selectedTopic);
    return (
      <TopicView 
        topic={topic}
        currentUser={currentUser}
        users={users}
        onBack={() => setSelectedTopic(null)}
        onReply={handleReply}
        newReply={newReply}
        setNewReply={setNewReply}
        showProfile={showProfile}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">💬 Community Forum</h2>
          <p className="text-gray-600 mt-1">Connect with other users, share tips, and get recommendations</p>
        </div>

        <button
          onClick={() => setShowNewTopicForm(true)}
          className="btn-primary"
        >
          ➕ New Topic
        </button>
      </div>

      {/* Community Filter */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Community:</label>
          <select
            value={selectedCommunity}
            onChange={(e) => setSelectedCommunity(e.target.value)}
            className="form-input"
          >
            {communityOptions.map(community => (
              <option key={community} value={community}>{community}</option>
            ))}
          </select>
        </div>
      </div>

      {/* New Topic Form */}
      {showNewTopicForm && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">📝 Create New Topic</h3>
          <form onSubmit={handleCreateTopic} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={newTopic.title}
                onChange={(e) => setNewTopic(prev => ({ ...prev, title: e.target.value }))}
                className="form-input"
                placeholder="What's your topic about?"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea
                value={newTopic.content}
                onChange={(e) => setNewTopic(prev => ({ ...prev, content: e.target.value }))}
                className="form-input"
                rows="4"
                placeholder="Share your thoughts, questions, or recommendations..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                value={newTopic.tags}
                onChange={(e) => setNewTopic(prev => ({ ...prev, tags: e.target.value }))}
                className="form-input"
                placeholder="e.g., recommendations, safety, pricing"
              />
            </div>

            <div className="flex space-x-3">
              <button type="submit" className="btn-primary">
                📤 Post Topic
              </button>
              <button 
                type="button" 
                onClick={() => setShowNewTopicForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Topics List */}
      <div className="space-y-3">
        {filteredTopics.length === 0 ? (
          <div className="card text-center py-8">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No topics yet</h3>
            <p className="text-gray-600">Be the first to start a conversation in this community!</p>
          </div>
        ) : (
          filteredTopics.map(topic => (
            <div key={topic.id} className="card hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">{topic.authorAvatar}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    {topic.sticky && <span className="text-lg">📌</span>}
                    <button
                      onClick={() => setSelectedTopic(topic.id)}
                      className="text-lg font-semibold text-blue-600 hover:text-blue-800 text-left"
                    >
                      {topic.title}
                    </button>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <button
                      onClick={() => showProfile(topic.author)}
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      {topic.authorName}
                    </button>
                    <span>📍 {topic.community}</span>
                    <span>💬 {topic.replies} replies</span>
                    <span>👁 {topic.views} views</span>
                    <span>🕐 {topic.lastActivity}</span>
                  </div>

                  {topic.tags && topic.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {topic.tags.map((tag, idx) => (
                        <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function TopicView({ topic, currentUser, users, onBack, onReply, newReply, setNewReply, showProfile }) {
  const handleSubmitReply = (e) => {
    e.preventDefault();
    if (newReply.trim()) {
      onReply(topic.id, newReply.trim());
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="btn-secondary">
          ← Back to Forum
        </button>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            {topic.sticky && <span className="text-lg">📌</span>}
            <h2 className="text-2xl font-bold text-gray-900">{topic.title}</h2>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
            <span>📍 {topic.community}</span>
            <span>💬 {topic.replies} replies</span>
            <span>👁 {topic.views} views</span>
          </div>
        </div>
      </div>

      {/* Original Post */}
      <div className="card">
        <div className="flex items-start space-x-4">
          <div className="text-3xl">{topic.authorAvatar}</div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <button
                onClick={() => showProfile(topic.author)}
                className="font-semibold text-blue-600 hover:text-blue-800"
              >
                {topic.authorName}
              </button>
              <span className="text-sm text-gray-500">• Original Post</span>
            </div>
            <p className="text-gray-900 whitespace-pre-wrap">{topic.content}</p>

            {topic.tags && topic.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {topic.tags.map((tag, idx) => (
                  <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Replies */}
      {topic.posts && topic.posts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">💬 Replies</h3>
          {topic.posts.map(post => (
            <div key={post.id} className="card bg-gray-50">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">{post.authorAvatar}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <button
                      onClick={() => showProfile(post.author)}
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      {post.authorName}
                    </button>
                    <span className="text-sm text-gray-500">
                      • {timeAgo(post.timestamp)}
                    </span>
                  </div>
                  <p className="text-gray-900 whitespace-pre-wrap">{post.content}</p>

                  <div className="flex items-center space-x-4 mt-2">
                    <button className="text-sm text-gray-500 hover:text-blue-600">
                      👍 {post.likes} likes
                    </button>
                    <button className="text-sm text-gray-500 hover:text-blue-600">
                      💬 Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reply Form */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">✍️ Add Reply</h3>
        <form onSubmit={handleSubmitReply} className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="text-2xl">{currentUser.avatar}</div>
            <div className="flex-1">
              <textarea
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                className="form-input"
                rows="3"
                placeholder="Share your thoughts..."
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="btn-primary">
              📤 Post Reply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Forum;