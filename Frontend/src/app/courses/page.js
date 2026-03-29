import React from "react";
import Image from "next/image";
import courses from "./coursesData"; // Import local data
import PageHero from "@/app/components/PageHero";

const Courses = () => {
  return (
    <div>
      <PageHero
        title="Courses"
        subtitle="Choose a focused path and build practical capability with guided projects."
      />

      <div className="section-padding">
        <div className="site-container">
          <h2 className="section-title text-center">Our Courses</h2>
          <p className="section-copy mx-auto mt-3 max-w-2xl text-center">
            Project-oriented courses designed to build practical skills from fundamentals to advanced levels.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="card-surface overflow-hidden p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <Image
                  src={course.image}
                  alt={course.title}
                  width={640}
                  height={360}
                  className="h-44 w-full rounded-lg object-cover"
                />
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{course.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{course.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
