'use client';

import { useEffect, useMemo, useState } from 'react';

type Donor = {
  id: string;
  fullName: string;
  email: string;
  bloodGroup: string | null;
  division: string | null;
  mobile: string | null;
  address: string | null;
  lastDonationDate: string | null;
};

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const divisions = ['Dhaka', 'Chattogram', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh'];

export default function DonorDirectory() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [bloodGroup, setBloodGroup] = useState('');
  const [division, setDivision] = useState('');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const filterLabel = useMemo(() => {
    const active: string[] = [];
    if (division) active.push(division);
    if (bloodGroup) active.push(bloodGroup);
    if (search) active.push(`search: ${search}`);
    return active.length ? active.join(' · ') : 'All donors';
  }, [bloodGroup, division, search]);

  async function loadDonors() {
    setIsLoading(true);
    setError('');

    try {
      const params = new URLSearchParams();
      if (bloodGroup) params.set('bloodGroup', bloodGroup);
      if (division) params.set('division', division);
      if (search) params.set('search', search.trim());

      const url = `/api/donors?${params.toString()}`;
      const response = await fetch(url, { credentials: 'same-origin' });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to load donors.');
      }

      setDonors(data.donors || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load donors.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadDonors();
  }, [bloodGroup, division, search]);

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 backdrop-blur-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Donor directory</h2>
          <p className="mt-2 text-sm leading-6 text-red-100/80">
            Filter by division, blood group, or search a donor by name.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-4">
          <div>
            <label htmlFor="divisionFilter" className="block text-xs font-semibold uppercase tracking-[0.2em] text-red-200">
              Division
            </label>
            <select
              id="divisionFilter"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200/20"
            >
              <option value="">All divisions</option>
              {divisions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="bloodGroupFilter" className="block text-xs font-semibold uppercase tracking-[0.2em] text-red-200">
              Blood group
            </label>
            <select
              id="bloodGroupFilter"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200/20"
            >
              <option value="">All blood groups</option>
              {bloodGroups.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2 md:col-span-1">
            <label htmlFor="searchFilter" className="block text-xs font-semibold uppercase tracking-[0.2em] text-red-200">
              Search
            </label>
            <input
              id="searchFilter"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200/20"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-red-100/80">
        <p>{filterLabel}</p>
        <p>{donors.length} donor{donors.length === 1 ? '' : 's'}</p>
      </div>

      {isLoading ? (
        <div className="mt-8 text-sm text-red-100/80">Loading donors…</div>
      ) : error ? (
        <div className="mt-8 rounded-2xl border border-red-400 bg-red-950/50 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      ) : donors.length === 0 ? (
        <p className="mt-8 text-sm text-red-100/80">No donors match the selected filters.</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead>
              <tr>
                <th className="px-4 py-3 text-xs uppercase tracking-[0.2em] text-red-200">Name</th>
                <th className="px-4 py-3 text-xs uppercase tracking-[0.2em] text-red-200">Blood</th>
                <th className="px-4 py-3 text-xs uppercase tracking-[0.2em] text-red-200">Division</th>
                <th className="px-4 py-3 text-xs uppercase tracking-[0.2em] text-red-200">Mobile</th>
                <th className="px-4 py-3 text-xs uppercase tracking-[0.2em] text-red-200">Address</th>
                <th className="px-4 py-3 text-xs uppercase tracking-[0.2em] text-red-200">Last donation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {donors.map((donor) => (
                <tr key={donor.id} className="border-b border-white/5">
                  <td className="px-4 py-4 text-sm text-white">{donor.fullName}</td>
                  <td className="px-4 py-4 text-sm text-red-100/90">{donor.bloodGroup || 'N/A'}</td>
                  <td className="px-4 py-4 text-sm text-red-100/90">{donor.division || 'N/A'}</td>
                  <td className="px-4 py-4 text-sm text-red-100/90">{donor.mobile || 'N/A'}</td>
                  <td className="px-4 py-4 text-sm text-red-100/90">{donor.address || 'N/A'}</td>
                  <td className="px-4 py-4 text-sm text-red-100/80">
                    {donor.lastDonationDate ? new Date(donor.lastDonationDate).toLocaleDateString() : 'Never donated'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
