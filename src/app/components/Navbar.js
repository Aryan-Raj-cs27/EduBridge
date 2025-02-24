"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">EduBridge AI</h1>
        <div>
          <Link href="/" className="mx-4 hover:underline">Home</Link>
          <Link href="/about" className="mx-4 hover:underline">About</Link>
          <Link href="/courses" className="mx-4 hover:underline">Courses</Link>
          <Link href="/contact" className="mx-4 hover:underline">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
