import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getDB } from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';

export type EmergencyPosting = {
  _id?: string;
  title: string;
  description: string;
  bloodType: string;
  location: string;
  contact: string;
  postedBy: string;
  createdAt: Date;
};

export async function GET() {
  try {
    const db = await getDB();
    const postings = await db
      .collection('emergencyPostings')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const normalized = postings.map((posting) => ({
      id: posting._id.toString(),
      title: posting.title,
      description: posting.description,
      bloodType: posting.bloodType,
      location: posting.location,
      contact: posting.contact,
      postedBy: posting.postedBy,
      createdAt: posting.createdAt.toISOString(),
    }));

    return NextResponse.json(normalized);
  } catch (error) {
    console.error('Error fetching emergency postings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const token = (await cookies()).get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = verifyToken(token);
    if (payload.role !== 'recipient') {
      return NextResponse.json({ error: 'Only recipients can post emergency requests' }, { status: 403 });
    }

    const body = await request.json();
    const { title, description, bloodType, location, contact } = body;

    if (!title || !description || !bloodType || !location || !contact) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const db = await getDB();
    const result = await db.collection('emergencyPostings').insertOne({
      title,
      description,
      bloodType,
      location,
      contact,
      postedBy: payload.id,
      createdAt: new Date(),
    });

    return NextResponse.json({ id: result.insertedId.toString() }, { status: 201 });
  } catch (error) {
    console.error('Error creating emergency posting:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}