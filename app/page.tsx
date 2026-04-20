"use client";

import { useState } from "react";
import Link from "next/link";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import EmergencyPostings from "./components/EmergencyPostings";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#0a0b14] text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600/20 text-red-100 shadow-lg shadow-red-500/10">
              <span className="text-xl">🩸</span>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-red-300">LIFE SAVERS</p>
              <p className="text-base font-semibold text-white/90">Donate & save lives</p>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <Link href="#home" className="transition hover:text-white">Home</Link>
            <Link href="#requests" className="transition hover:text-white">Requests</Link>
            <Link href="#search" className="transition hover:text-white">Search Blood</Link>
            <Link href="#funding" className="transition hover:text-white">Funding</Link>
            <Link href="/dashboard" className="font-semibold text-white transition hover:text-red-200">Dashboard</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="#auth"
              className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Log in
            </Link>
          </div>
        </nav>

        <main className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center" id="home">
          <div className="space-y-8">
            <div className="inline-flex rounded-full bg-red-600/20 px-5 py-2 text-xs uppercase tracking-[0.35em] text-red-100">
              urgent help for blood needs
            </div>
            <div className="space-y-6">
              <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
                Donate Blood <span className="text-amber-300">Save Lives Today</span>
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">
                Your one donation can save multiple lives. Join our mission and help patients in need across Bangladesh.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/user-donor"
                className="rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-700/30 transition hover:bg-red-500"
              >
                Donate Now
              </Link>
              <Link
                href="#search"
                className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Find Donor
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center shadow-xl shadow-black/20 backdrop-blur-xl">
                <p className="text-3xl font-bold text-white">Fast</p>
                <p className="mt-2 text-sm text-slate-300">Quick response for urgent needs</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center shadow-xl shadow-black/20 backdrop-blur-xl">
                <p className="text-3xl font-bold text-white">Safe</p>
                <p className="mt-2 text-sm text-slate-300">Verified donors and streamlined care</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center shadow-xl shadow-black/20 backdrop-blur-xl">
                <p className="text-3xl font-bold text-white">Impact</p>
                <p className="mt-2 text-sm text-slate-300">Save lives across Bangladesh</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl" id="auth">
            <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-[#0f101f]/80 p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-red-300">Secure Access</p>
                <h2 className="mt-3 text-3xl font-bold text-white">Sign in or create your account</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Access the dashboard as a donor, recipient, or admin. Post requests, manage your profile, and join the lifesaving network.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                    isLogin ? 'bg-red-600 text-white shadow-lg' : 'bg-white/10 text-white/80 hover:bg-white/15'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                    !isLogin ? 'bg-red-600 text-white shadow-lg' : 'bg-white/10 text-white/80 hover:bg-white/15'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>
            {isLogin ? <LoginForm /> : <SignUpForm />}
          </div>
        </main>

        <section className="mt-16 rounded-[2rem] border border-white/10 bg-[#0f101f] p-8 shadow-2xl shadow-black/40 backdrop-blur-xl" id="requests">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-red-300">Emergency Board</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Latest urgent blood requirements</h2>
            </div>
            <Link
              href="/"
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View all emergencies
            </Link>
          </div>
          <EmergencyPostings />
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-3" id="search">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 backdrop-blur-xl">
            <h3 className="text-xl font-semibold text-white">Search Blood</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">Use the donor directory to search donors by blood type and location.</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 backdrop-blur-xl" id="funding">
            <h3 className="text-xl font-semibold text-white">Funding</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">Support blood banks and hospitals through secure funding channels.</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 backdrop-blur-xl">
            <h3 className="text-xl font-semibold text-white">Dashboard</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">Manage your account, requests, and donations from one place.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
