"use client";

import { useState } from "react";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import EmergencyPostings from "./components/EmergencyPostings";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-800 via-red-900 to-red-950 text-white">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex w-full justify-center py-8">
          <div className="text-center">
            <p className="text-2xl font-black uppercase tracking-[0.35em] text-white" style={{ fontSize: '40px' }}>
              Blood Donation System
            </p>
            <h1 className="mt-4 text-xl font-extrabold tracking-tight sm:text-2xl" style={{ fontSize: '20px' }}>
              {isLogin ? 'Secure Sign In' : 'Role-based Sign Up'}
            </h1>
          </div>
        </header>

        <EmergencyPostings />

        <section className="flex flex-1 items-center justify-center mt-12">
          <div className="w-full rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10">
            <div className="mb-8 text-center">
              <div className="flex justify-center space-x-4 mb-6">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
                    isLogin
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-white/10 text-red-200 hover:bg-white/20'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
                    !isLogin
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-white/10 text-red-200 hover:bg-white/20'
                  }`}
                >
                  Sign Up
                </button>
              </div>
              <p className="text-sm uppercase tracking-[0.35em] text-red-200/90">
                {isLogin ? 'Login for admin, donor, or recipient' : 'Register as donor or recipient'}
              </p>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                {isLogin ? 'Access the system securely' : 'Create your role-based account'}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-red-100/80 sm:text-base">
                {isLogin
                  ? 'Sign in with your credentials and access the role-based dashboard after successful authentication.'
                  : 'Register as a donor or recipient so you can post requests, update your profile, and help save lives.'
                }
              </p>
            </div>
            {isLogin ? <LoginForm /> : <SignUpForm />}
          </div>
        </section>
      </main>
    </div>
  );
}
