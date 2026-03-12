"use client";

import { useState, useEffect } from "react";
import { getAllCourses } from "@/lib/dal";
import CourseCard from "@/components/CourseCard";
import DrawerMenu from "@/components/DrawerMenu";

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
    <>
    <header className="page-grid ">
            <div className=" col-start-2 my-10 flex justify-between">
                <h1 className="col-start-1  text-2xl ">Popular classes</h1>
              
    
              
                <DrawerMenu />
            </div>
            
            </header>
    <main className="page-grid pb-20">
      <section className="w-full flex flex-col col-start-2 gap-10 max-w-3xl mt-5 overflow-hidden">

      

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
    </>
  );
}