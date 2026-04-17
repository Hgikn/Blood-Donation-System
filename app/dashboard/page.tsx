import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";

export default async function DashboardPage() {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    redirect("/");
  }

  let user;
  try {
    user = verifyToken(token!);
  } catch (error) {
    redirect("/");
  }

  const isAdmin = user.role === "admin";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-red-950/80 p-8 shadow-2xl shadow-black/50">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-red-300">Dashboard access granted</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight">Welcome back, {user.fullName}</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-red-100/80">
              You are signed in as a <strong>{user.role}</strong>. Use the links below to manage donors, requests, or your profile.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/api/auth/logout"
              className="rounded-3xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Sign out
            </Link>
            <Link
              href="/admin-dashboard"
              className="rounded-3xl border border-red-500 bg-transparent px-5 py-3 text-sm font-semibold text-red-200 transition hover:border-red-300 hover:bg-red-500/10"
            >
              Admin area
            </Link>
          </div>
        </header>

        <main className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-white">Quick overview</h2>
            <p className="mt-4 text-sm leading-6 text-red-100/80">
              Current role: <span className="font-semibold text-white">{user.role}</span>
            </p>
            <p className="mt-2 text-sm leading-6 text-red-100/80">Authorized dashboard scope is based on your current role.</p>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-white">Role status</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-red-100/80">
              {isAdmin ? (
                <>
                  <li>Manage donors and recipients</li>
                  <li>Review blood request activity</li>
                  <li>Approve or revoke access roles</li>
                </>
              ) : user.role === "recipient" ? (
                <>
                  <li>Post urgent blood requests</li>
                  <li>Track responses from donors</li>
                  <li>Update your contact details</li>
                </>
              ) : (
                <>
                  <li>View donation history</li>
                  <li>Stay ready for matching requests</li>
                  <li>Manage your blood group and profile</li>
                </>
              )}
            </ul>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-white">Next steps</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-red-100/80">
              <p>Use the navigation buttons above to continue.</p>
              <p>Keep your account secure and refresh the page after role updates.</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
