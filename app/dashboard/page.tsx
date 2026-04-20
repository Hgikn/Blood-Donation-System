import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { getDB } from "@/lib/mongodb";
import DonorDirectory from "@/app/components/DonorDirectory";
import RecipientDirectory from "@/app/components/RecipientDirectory";

export default async function DashboardPage() {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    redirect("/");
  }

  let user;
  try {
    user = verifyToken(token!);
  } catch {
    redirect("/");
  }

  const db = await getDB();
  const totalDonors = await db.collection("users").countDocuments({ role: "donor" });
  const totalRecipients = await db.collection("users").countDocuments({ role: "recipient" });
  const totalEmergencies = await db.collection("emergencyPostings").countDocuments();

  const primaryActionLabel =
    user.role === "recipient" ? "Post Request" : user.role === "admin" ? "Manage System" : "Donate Now";
  const primaryActionHref =
    user.role === "recipient" ? "/recipient" : user.role === "admin" ? "/admin-dashboard" : "/user-donor";

  return (
    <div className="min-h-screen bg-[#08070d] text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex flex-col gap-6 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
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
            <Link href="/" className="transition hover:text-white">Home</Link>
            <Link href="/recipient" className="transition hover:text-white">Requests</Link>
            <Link href="/user-donor" className="transition hover:text-white">Search Blood</Link>
            <Link href="/admin-dashboard" className="transition hover:text-white">Funding</Link>
            <Link href="/dashboard" className="font-semibold text-white">Dashboard</Link>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 sm:inline-flex">
              Hello, {user.fullName}
            </span>
            <Link
              href="/api/auth/logout"
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Sign out
            </Link>
          </div>
        </nav>

        <main className="mt-12 grid gap-8 lg:grid-cols-[1.7fr_1fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex rounded-full bg-red-600/20 px-5 py-2 text-xs uppercase tracking-[0.35em] text-red-100">
              urgent care for donors & recipients
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
              DONATE BLOOD <span className="text-amber-300">SAVE LIVES</span>
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-300">
              Your one donation can save multiple lives. Join our mission and help patients in need across Bangladesh.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={primaryActionHref}
                className="rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-700/30 transition hover:bg-red-500"
              >
                {primaryActionLabel}
              </Link>
              <Link
                href="#search"
                className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Find Donor
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center shadow-xl shadow-black/20 backdrop-blur-xl">
                <p className="text-4xl font-bold text-white">{totalDonors}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.35em] text-slate-400">Donors</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center shadow-xl shadow-black/20 backdrop-blur-xl">
                <p className="text-4xl font-bold text-white">{totalRecipients}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.35em] text-slate-400">Recipients</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center shadow-xl shadow-black/20 backdrop-blur-xl">
                <p className="text-4xl font-bold text-white">{totalEmergencies}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.35em] text-slate-400">Emergencies</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-red-950 via-red-900 to-red-800 p-8 shadow-2xl shadow-black/60">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent_45%)]" />
            <div className="relative z-10 space-y-6">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.35em] text-red-200">Today’s highlighted need</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">Help urgent blood requests faster.</h2>
                <p className="mt-3 text-sm leading-6 text-slate-200/90">
                  Check latest emergency postings, connect with donors, and keep the blood supply moving in your area.
                </p>
              </div>
              <div className="grid gap-4">
                <div className="rounded-3xl bg-white/10 p-5 text-white backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Fast response</p>
                  <p className="mt-3 text-lg font-semibold">Real-time board for urgent blood requirements.</p>
                </div>
                <div className="rounded-3xl bg-white/10 p-5 text-white backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Community support</p>
                  <p className="mt-3 text-lg font-semibold">Donors and recipients connect through one shared dashboard.</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-white">Emergency Board</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              View and share urgent blood needs from the public emergency postings board.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
            >
              Browse emergencies
            </Link>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-white">Search Donors</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Filter by blood group, location, and availability to find the best donor match quickly.
            </p>
            <Link
              href="/user-donor"
              className="mt-6 inline-flex rounded-full border border-white/10 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Search now
            </Link>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-white">Support Funding</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Coordinate support efforts for hospitals, blood banks, and urgent care centers in need.
            </p>
            <Link
              href="/admin-dashboard"
              className="mt-6 inline-flex rounded-full border border-white/10 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Manage funding
            </Link>
          </div>
        </section>

        <section id="search" className="mt-12 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 backdrop-blur-xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-red-300">Live directory</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Find donors and recipients fast</h2>
            </div>
            <Link
              href="/profile"
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View profile
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/10 bg-[#0f1020] p-6">
              <h3 className="text-xl font-semibold text-white">Donor Directory</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">Browse registered donors and contact them for blood donation support.</p>
              <div className="mt-6">
                <DonorDirectory />
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-[#0f1020] p-6">
              <h3 className="text-xl font-semibold text-white">Recipient Directory</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">See recipients who need help and discover nearby support options.</p>
              <div className="mt-6">
                <RecipientDirectory />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
