import Link from "next/link";

export default function RecipientPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 rounded-[2rem] border border-slate-200 bg-white/95 p-10 shadow-2xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/20">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-red-500">Recipient Module</p>
            <h1 className="text-4xl font-bold text-slate-950 dark:text-white">Post urgent blood requests and track donor matches.</h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              Recipients can submit emergency requests, see matched donors, and manage the response flow from one responsive interface.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Request form</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">Recipients can post blood needs with type, units, and urgency.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Notifications</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">Alert nearby donors when an emergency request is posted.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Request tracking</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">Monitor your request status and donor responses in real time.</p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-100 p-6 dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Core features</p>
            <ul className="grid gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300 sm:grid-cols-2">
              <li>Emergency posting</li>
              <li>Recipient profile</li>
              <li>Donor matching</li>
              <li>Request updates</li>
            </ul>
          </div>

          <div className="flex items-center justify-between gap-4 pt-4">
            <Link href="/" className="rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Back home
            </Link>
            <Link href="/admin-dashboard" className="rounded-3xl border border-red-600 px-6 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white dark:border-red-500">
              View Admin module
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
