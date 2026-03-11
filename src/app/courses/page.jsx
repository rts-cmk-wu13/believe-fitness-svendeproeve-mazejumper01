"use client";

import { useState, useEffect } from "react";
import { getAllCourses } from "@/lib/dal";
import CourseCard from "@/components/CourseCard";

export default function Page() {
  const [randomCourse, setRandomCourse] = useState(null);
  const [otherCourses, setOtherCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      const data = await getAllCourses();

      const randomIndex = Math.floor(Math.random() * data.length);
      const random = data[randomIndex];

      const others = data.filter((_, index) => index !== randomIndex);

      setRandomCourse(random);
      setOtherCourses(others);
      setLoading(false);
    }

    fetchCourses();
  }, []);

  return (
    <main className="grid grid-cols-[10px_1fr_10px] pb-20">
      <section className="w-full flex flex-col col-start-2 gap-10 max-w-3xl overflow-hidden">

        <h1 className="text-3xl font-bold">Classes</h1>

        {loading ? (
          <p>Loading classes...</p>
        ) : (
          <>

            {randomCourse && (
              <CourseCard course={randomCourse} size="large" />
            )}


            <div className="w-full overflow-x-auto">
              <div className="flex gap-4 w-max pr-4">
                {otherCourses.map((course) => (
                  <div key={course.id} className="shrink-0">
                    <CourseCard course={course} size="small" />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}