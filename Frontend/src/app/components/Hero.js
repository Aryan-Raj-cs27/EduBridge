import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-blue-500 text-white text-center py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to EduBridge AI
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Personalized Learning for Every Student
        </p>
        <Link
          href="/courses"
          className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Explore Courses
        </Link>
      </div>
    </section>
  );
}
