import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getDB } from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';

export async function GET(request: Request) {
  const token = (await cookies()).get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    verifyToken(token);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const url = new URL(request.url);
  const bloodGroup = url.searchParams.get('bloodGroup') || undefined;
  const division = url.searchParams.get('division') || undefined;
  const search = url.searchParams.get('search')?.trim() || undefined;
  const role = url.searchParams.get('role') || 'donor';

  const filter: Record<string, unknown> = { role };
  if (bloodGroup) {
    filter.bloodGroup = bloodGroup;
  }
  if (division) {
    filter.division = division;
  }
  if (search) {
    filter.fullName = { $regex: new RegExp(search, 'i') };
  }

  const db = await getDB();
  const donors = await db
    .collection('users')
    .find(filter, { projection: { password: 0 } })
    .sort({ createdAt: -1 })
    .toArray();

  const normalized = donors.map((donor) => ({
    id: donor._id.toString(),
    fullName: donor.fullName,
    email: donor.email,
    role: donor.role,
    bloodGroup: donor.bloodGroup ?? null,
    division: donor.division ?? null,
    mobile: donor.mobile ?? null,
    address: donor.address ?? null,
    lastDonationDate: donor.lastDonationDate ?? null,
  }));

  return NextResponse.json({ donors: normalized });
}
