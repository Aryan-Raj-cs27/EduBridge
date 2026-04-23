import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Lead from "@/lib/models/Lead";

export async function POST(request) {
  try {
    await connectToDB();

    const { name, email, topic, message } = await request.json();

    if (!name || !email || !topic || !message) {
      return NextResponse.json(
        { message: "Name, email, topic, and message are required." },
        { status: 400 }
      );
    }

    await Lead.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      topic: topic.trim(),
      message: message.trim(),
    });

    return NextResponse.json(
      { message: "Your message has been submitted successfully." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to submit message.", error: error.message },
      { status: 500 }
    );
  }
}
