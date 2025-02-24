import Features from "./components/Features";

export default function Home() {
  return (
    <main>
      <section className="bg-blue-500 text-white text-center py-20">
        <h1 className="text-5xl font-bold">Welcome to EduBridge AI</h1>
        <p className="text-lg mt-4">Personalized Learning for Every Student</p>
        <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg">
          Explore Courses
        </button>
      </section>

      <Features />
    </main>
  );
}
