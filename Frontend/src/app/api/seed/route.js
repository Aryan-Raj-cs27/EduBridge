// src/app/api/seed/route.js
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Course from "@/lib/models/Course";

export async function GET() {
  try {
    await connectToDB();

    const dummyCourses = [
      {
        title: "Introduction to AI",
        description: "Learn the basics of Artificial Intelligence and Machine Learning concepts.",
        imageUrl: "/images/ai-course.jpg", // Make sure these images exist in your public/images folder!
      },
      {
        title: "Python for Beginners",
        description: "Master Python programming from scratch with hands-on projects.",
        imageUrl: "/images/python.jpg",
      },
      {
        title: "Web Development Bootcamp",
        description: "Build full-stack web applications using modern web technologies.",
        imageUrl: "/images/web-dev.jpg",
      },
    ];

    // Clear existing courses to prevent duplicates if you run it twice
    await Course.deleteMany({});
    
    // Insert the new courses
    await Course.insertMany(dummyCourses);

    return NextResponse.json({ message: "Courses seeded successfully!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to seed courses.", error: error.message }, { status: 500 });
  }
}