import Link from "next/link";

export default function UserDonorPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 rounded-[2rem] border border-slate-200 bg-white/95 p-10 shadow-2xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/20">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-red-500">User / Donor Module</p>
            <h1 className="text-4xl font-bold text-slate-950 dark:text-white">Donor registration, login, and profile management.</h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              Donors can create accounts, manage their profiles, search by blood group and location, and stay ready for urgent requests.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Registration</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">Donors sign up and store their profile, blood type, and contact details.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Search</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">Search donors by blood group and city to find matches quickly.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Dashboard</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">Donors can review their profile and donation history in one place.</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-100 p-6 dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Core features</p>
            <ul className="grid gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300 sm:grid-cols-2">
              <li>Donor account creation</li>
              <li>Login with email and password</li>
              <li>Profile updates</li>
              <li>Blood group search</li>
            </ul>
          </div>

          <div className="flex items-center justify-between gap-4 pt-4">
            <Link href="/" className="rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Back home
            </Link>
            <Link href="/recipient" className="rounded-3xl border border-red-600 px-6 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white dark:border-red-500">
              View Recipient module
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
