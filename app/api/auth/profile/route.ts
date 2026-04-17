import { ObjectId } from 'mongodb';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getDB } from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  const token = (await cookies()).get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let payload;
  try {
    payload = verifyToken(token);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const db = await getDB();
  const users = db.collection('users');
  const user = await users.findOne({ _id: new ObjectId(payload.id) }, { projection: { password: 0 } });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({
    user: {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      bloodGroup: user.bloodGroup ?? null,
      division: user.division ?? null,
      mobile: user.mobile ?? null,
      address: user.address ?? null,
      lastDonationDate: user.lastDonationDate ?? null,
    },
  });
}

export async function PATCH(request: Request) {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let payload;
    try {
      payload = verifyToken(token);
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    console.log('Updating profile for user:', payload.id);

    const body = await request.json();
    console.log('Profile update body:', body);
    const fullName = String(body.fullName || '').trim();
    const bloodGroup = body.bloodGroup ? String(body.bloodGroup).trim() : null;
    const division = body.division ? String(body.division).trim() : null;
    const mobile = body.mobile ? String(body.mobile).trim() : null;
    const address = body.address ? String(body.address).trim() : null;
    const lastDonationDate = body.lastDonationDate ? String(body.lastDonationDate).trim() : null;

    if (!fullName) {
      return NextResponse.json({ error: 'Full name is required.' }, { status: 400 });
    }

    const db = await getDB();
    const users = db.collection('users');

    console.log('Updating user with id:', payload.id);
    const updated = await users.findOneAndUpdate(
      { _id: new ObjectId(payload.id) },
      { $set: { fullName, bloodGroup, division, mobile, address, lastDonationDate } },
      { returnDocument: 'after', projection: { password: 0 } }
    );

    console.log('Update result:', updated);

    if (!updated) {
      return NextResponse.json({ error: 'Unable to update profile.' }, { status: 500 });
    }

    return NextResponse.json({
      user: {
        id: updated._id.toString(),
        fullName: updated.fullName,
        email: updated.email,
        role: updated.role,
        bloodGroup: updated.bloodGroup ?? null,
        division: updated.division ?? null,
        mobile: updated.mobile ?? null,
        address: updated.address ?? null,
        lastDonationDate: updated.lastDonationDate ?? null,
      },
    });
  } catch (error) {
    console.error("Profile API error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
