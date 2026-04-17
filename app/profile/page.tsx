import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';
import ProfileForm from '@/app/components/ProfileForm';

export default async function ProfilePage() {
  const token = (await cookies()).get('token')?.value;
  if (!token) {
    redirect('/');
  }

  let user;
  try {
    user = verifyToken(token);
  } catch (error) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-[2rem] border border-white/10 bg-red-950/80 p-8 shadow-2xl shadow-black/50">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-red-300">Profile settings</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight">Manage your profile, {user.fullName}</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-red-100/80">
              Update your name, blood group, and account information. Changes are saved directly to the database.
            </p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <ProfileForm />
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-white">Profile help</h2>
            <p className="mt-4 text-sm leading-6 text-red-100/80">
              The form loads your profile from the database and allows you to save updates immediately. Your email and role are read-only.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-red-100/80">
              <li>Full name updates will be reflected in the dashboard greeting.</li>
              <li>Blood group is stored in your donor profile for matching purposes.</li>
              <li>If you need to change email or role, contact an administrator.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
