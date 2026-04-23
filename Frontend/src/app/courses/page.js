"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import PageHero from "@/app/components/PageHero";
import Reveal from "@/app/components/Reveal";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [courseProgress, setCourseProgress] = useState({});

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        const data = await response.json();
        setCourses(Array.isArray(data?.courses) ? data.courses : []);
      } catch {
        setCourses([]);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();

    try {
      const raw = localStorage.getItem("edubridgeCourseProgress");
      const parsed = raw ? JSON.parse(raw) : {};
      setCourseProgress(parsed && typeof parsed === "object" ? parsed : {});
    } catch {
      setCourseProgress({});
    }
  }, []);

  const persistProgress = (nextState) => {
    setCourseProgress(nextState);
    localStorage.setItem("edubridgeCourseProgress", JSON.stringify(nextState));
  };

  const toggleEnrollment = (courseId) => {
    const key = String(courseId);
    const existing = courseProgress[key] || { enrolled: false, completion: 0 };
    const nextState = {
      ...courseProgress,
      [key]: {
        enrolled: !existing.enrolled,
        completion: existing.enrolled ? 0 : existing.completion,
      },
    };
    persistProgress(nextState);
  };

  const setCompletion = (courseId, value) => {
    const key = String(courseId);
    const existing = courseProgress[key] || { enrolled: true, completion: 0 };
    const numericValue = Number(value);
    const boundedValue = Number.isFinite(numericValue) ? Math.max(0, Math.min(100, numericValue)) : 0;
    const nextState = {
      ...courseProgress,
      [key]: {
        ...existing,
        enrolled: true,
        completion: boundedValue,
      },
    };
    persistProgress(nextState);
  };

  const summary = useMemo(() => {
    const values = Object.values(courseProgress);
    const enrolledCount = values.filter((item) => item?.enrolled).length;
    const avgCompletion = enrolledCount
      ? Math.round(
          values
            .filter((item) => item?.enrolled)
            .reduce((acc, item) => acc + (item?.completion || 0), 0) / enrolledCount
        )
      : 0;

    return { enrolledCount, avgCompletion };
  }, [courseProgress]);

  return (
    <div>
      <PageHero
        title="Courses"
        subtitle="Choose a focused path and build practical capability with guided projects."
      />

      <div className="section-padding pt-20 sm:pt-24">
        <div className="site-container">
          <Reveal>
            <h2 className="section-title text-center">Our Courses</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="section-copy mx-auto mt-3 max-w-2xl text-center">
              Project-oriented courses designed to build practical skills from fundamentals to advanced levels.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div className="courses-summary mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-3 rounded-xl px-4 py-3 text-sm font-medium">
              <span>Enrolled: {summary.enrolledCount}</span>
              <span className="h-1 w-1 rounded-full bg-current/40"></span>
              <span>Average Completion: {summary.avgCompletion}%</span>
            </div>
          </Reveal>

          {loadingCourses ? (
            <p className="mt-10 text-center text-slate-600">Loading courses...</p>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course, index) => (
                <Reveal key={course._id || `${course.title}-${index}`} delay={80 * (index + 1)}>
                  <div className="card-surface overflow-hidden p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
                    <Image
                      src={course.imageUrl}
                      alt={course.title}
                      width={640}
                      height={360}
                      className="h-44 w-full rounded-lg object-cover"
                    />
                    <h3 className="mt-4 text-xl font-semibold text-slate-900">{course.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{course.description}</p>

                    {(() => {
                      const courseId = String(course._id);
                      const state = courseProgress[courseId] || { enrolled: false, completion: 0 };
                      return (
                        <div className="mt-4 space-y-3">
                          <button
                            type="button"
                            onClick={() => toggleEnrollment(courseId)}
                            className={`w-full rounded-md px-3 py-2 text-sm font-semibold transition ${
                              state.enrolled
                                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                                : "bg-slate-900 text-white hover:bg-slate-800"
                            }`}
                          >
                            {state.enrolled ? "Enrolled" : "Enroll Now"}
                          </button>

                          {state.enrolled && (
                            <div>
                              <div className="flex items-center justify-between text-xs text-slate-600">
                                <span>Progress</span>
                                <span>{state.completion}%</span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                step="5"
                                value={state.completion}
                                onChange={(e) => setCompletion(courseId, e.target.value)}
                                className="mt-1 w-full accent-blue-600"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
