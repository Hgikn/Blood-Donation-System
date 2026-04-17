import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDB } from "@/lib/mongodb";
import { createToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fullName = String(body.fullName || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const role = String(body.role || "donor").toLowerCase();
    const bloodGroup = body.bloodGroup ? String(body.bloodGroup) : null;
    const division = body.division ? String(body.division) : null;
    const mobile = body.mobile ? String(body.mobile) : null;
    const address = body.address ? String(body.address).trim() : null;

    if (!fullName || !email || !password || !mobile || !division || !address) {
      return NextResponse.json({ error: "Please provide a name, email, password, mobile number, address, and division." }, { status: 400 });
    }

    const normalizedRole = ["donor", "recipient", "admin"].includes(role) ? role : "donor";
    const db = await getDB();
    const users = db.collection("users");

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "This email is already registered." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      fullName,
      email,
      password: hashedPassword,
      role: normalizedRole,
      bloodGroup,
      division,
      mobile,
      address,
      lastDonationDate: null,
      createdAt: new Date(),
    };

    const result = await users.insertOne(newUser);
    const token = createToken({
      id: result.insertedId.toString(),
      email: newUser.email,
      role: newUser.role,
      fullName: newUser.fullName,
    });

    const response = NextResponse.json({ success: true, role: newUser.role, fullName: newUser.fullName });
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Signup API error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
