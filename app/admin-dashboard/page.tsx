import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { verifyToken } from "@/lib/auth";

export default async function AdminDashboardPage() {
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

  if (user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-[2rem] border border-white/10 bg-red-950/80 p-8 shadow-2xl shadow-black/50">
          <h1 className="text-4xl font-extrabold tracking-tight">Admin dashboard</h1>
          <p className="mt-3 text-base leading-7 text-red-100/80">
            Manage users, review requests, and control role access across the blood donation system.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="rounded-3xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Back to main dashboard
            </Link>
            <Link
              href="/api/auth/logout"
              className="rounded-3xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Sign out
            </Link>
          </div>
        </header>

        <main className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-white">User management</h2>
            <p className="mt-3 text-sm leading-6 text-red-100/80">
              Approve new members, update role assignments, and deactivate accounts for donors and recipients.
            </p>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-white">Request monitoring</h2>
            <p className="mt-3 text-sm leading-6 text-red-100/80">
              Review urgent blood requests, monitor fulfillment status, and coordinate hospital or donor response.
            </p>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-white">Security & roles</h2>
            <p className="mt-3 text-sm leading-6 text-red-100/80">
              Control access levels for administrators, donors, and recipients from the protected admin panel.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
