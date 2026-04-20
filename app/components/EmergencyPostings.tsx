'use client';

import { useState, useEffect } from 'react';

type EmergencyPosting = {
  id: string;
  title: string;
  description: string;
  bloodType: string;
  location: string;
  contact: string;
  postedBy: string;
  createdAt: string;
};

type User = {
  id: string;
  email: string;
  role: string;
  fullName: string;
} | null;

export default function EmergencyPostings() {
  const [postings, setPostings] = useState<EmergencyPosting[]>([]);
  const [user, setUser] = useState<User>(null);
  const [isPosting, setIsPosting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    bloodType: '',
    location: '',
    contact: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPostings();
    fetchUser();
  }, []);

  const fetchPostings = async () => {
    try {
      const response = await fetch('/api/emergency-postings');
      if (response.ok) {
        const data = await response.json();
        setPostings(data);
      }
    } catch (error) {
      console.error('Error fetching postings:', error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/auth/profile', { credentials: 'same-origin' });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      // Not logged in
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsPosting(true);

    try {
      const response = await fetch('/api/emergency-postings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to post');
      }

      setFormData({ title: '', description: '', bloodType: '', location: '', contact: '' });
      fetchPostings();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to post');
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">Emergency Blood Requirements</h2>

      {user && user.role === 'recipient' && (
        <div className="mb-8 rounded-lg border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
          <h3 className="text-xl font-semibold mb-4 text-white">Post New Emergency</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/70"
                required
              />
              <select
                value={formData.bloodType}
                onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white"
                required
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/70"
              rows={3}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/70"
                required
              />
              <input
                type="text"
                placeholder="Contact Number"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/70"
                required
              />
            </div>
            {error && <p className="text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={isPosting}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              {isPosting ? 'Posting...' : 'Post Emergency'}
            </button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {postings.length === 0 ? (
          <p className="text-center text-white/70">No emergency postings yet.</p>
        ) : (
          postings.map((posting) => (
            <div key={posting.id} className="rounded-lg border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-2">{posting.title}</h3>
              <p className="text-white/80 mb-2">{posting.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-white/70">
                <p><strong>Blood Type:</strong> {posting.bloodType}</p>
                <p><strong>Location:</strong> {posting.location}</p>
                <p><strong>Contact:</strong> {posting.contact}</p>
                <p><strong>Posted:</strong> {new Date(posting.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}