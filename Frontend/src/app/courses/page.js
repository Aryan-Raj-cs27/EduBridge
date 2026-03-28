import React from "react";
import Image from "next/image";
import courses from "./coursesData"; // Import local data

const Courses = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center mb-6">Our Courses</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white p-4 shadow-lg rounded-lg transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
          >
            <Image
              src={course.image}
              alt={course.title}
              width={640}
              height={360}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-4">{course.title}</h2>
            <p className="text-gray-600 mt-2">{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
