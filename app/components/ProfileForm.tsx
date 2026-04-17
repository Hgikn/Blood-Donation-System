'use client';

import { useEffect, useState } from 'react';

type ProfileData = {
  fullName: string;
  email: string;
  role: string;
  bloodGroup?: string | null;
  division?: string | null;
  mobile?: string | null;
  address?: string | null;
  lastDonationDate?: string | null;
};

export default function ProfileForm() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [fullName, setFullName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [division, setDivision] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [lastDonationDate, setLastDonationDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadProfile = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
      });

      if (!response.ok) {
        throw new Error('Failed to load profile.');
      }

      const data = await response.json();
      setProfile(data.user);
      setFullName(data.user.fullName ?? '');
      setBloodGroup(data.user.bloodGroup ?? '');
      setDivision(data.user.division ?? '');
      setMobile(data.user.mobile ?? '');
      setAddress(data.user.address ?? '');
      setLastDonationDate(data.user.lastDonationDate ?? '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to fetch profile.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setIsSaving(true);

    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({
          fullName: fullName.trim(),
          bloodGroup: bloodGroup.trim() || null,
          division: division.trim() || null,
          mobile: mobile.trim() || null,
          address: address.trim() || null,
          lastDonationDate: lastDonationDate.trim() || null,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Unable to update profile.');
      }

      setMessage('Profile updated successfully.');
      setProfile(result.user);
      // Re-fetch to ensure data is up to date
      await loadProfile();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <p className="text-sm text-slate-400">Loading profile data…</p>;
  }

  if (!profile) {
    return <p className="text-sm text-red-400">Unable to load profile information.</p>;
  }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 backdrop-blur-xl">
      <h2 className="text-2xl font-semibold text-white">Update profile</h2>
      <p className="mt-3 text-sm leading-6 text-red-100/80">Edit your personal details and save them to the database.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/60 dark:text-red-300">
            {error}
          </div>
        ) : null}
        {message ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            {message}
          </div>
        ) : null}

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-white/80">Email address</label>
          <input
            id="email"
            type="email"
            value={profile.email}
            disabled
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-200 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200/20"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-semibold text-white/80">Role</label>
          <input
            id="role"
            value={profile.role}
            disabled
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-200 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200/20"
          />
        </div>

        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-white/80">Full name</label>
          <input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200/20"
          />
        </div>

        <div>
          <label htmlFor="bloodGroup" className="block text-sm font-semibold text-white/80">Blood group</label>
          <input
            id="bloodGroup"
            value={bloodGroup ?? ''}
            onChange={(e) => setBloodGroup(e.target.value)}
            placeholder="e.g. O+, A-, B+"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200/20"
          />
        </div>

        <div>
          <label htmlFor="division" className="block text-sm font-semibold text-white/80">Division</label>
          <select
            id="division"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200/20"
          >
            <option value="">Select division</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chattogram">Chattogram</option>
            <option value="Rajshahi">Rajshahi</option>
            <option value="Khulna">Khulna</option>
            <option value="Barisal">Barisal</option>
            <option value="Sylhet">Sylhet</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Mymensingh">Mymensingh</option>
          </select>
        </div>

        <div>
          <label htmlFor="mobile" className="block text-sm font-semibold text-white/80">Mobile number</label>
          <input
            id="mobile"
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="01XXXXXXXXX"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200/20"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-semibold text-white/80">Address</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street, neighborhood or city"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200/20"
          />
        </div>

        <div>
          <label htmlFor="lastDonationDate" className="block text-sm font-semibold text-white/80">Last donation date</label>
          <input
            id="lastDonationDate"
            type="date"
            value={lastDonationDate}
            onChange={(e) => setLastDonationDate(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200/20"
          />
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="rounded-3xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? 'Saving...' : 'Save profile'}
        </button>
      </form>
    </div>
  );
}
