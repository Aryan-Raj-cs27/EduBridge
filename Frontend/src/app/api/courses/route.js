import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Course from "@/lib/models/Course";

export async function GET() {
  try {
    await connectToDB();

    const courses = await Course.find({}).lean();

    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch courses.", error: error.message },
      { status: 500 }
    );
  }
}
