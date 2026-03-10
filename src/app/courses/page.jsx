"use client";

import { useState, useEffect } from "react";
import { getAllCourses } from "@/lib/dal";
import CourseCard from "@/components/CourseCard";


export default function Page({}) {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchCourses() {
      const data = await getAllCourses();
      setCourses(data);
      setFilteredCourses(data);
      setLoading(false);
    }
    fetchCourses();
  }, []);

  

  return (
    <>
      <main className="grid grid-cols-[10px_1fr_10px] pb-20">
    
          <section className="w-full items-center flex flex-col col-start-2 gap-10 max-w-3xl ">
          
            <h1 className="text-3xl font-bold ">Classes</h1>

          


            {loading ? (
              <p>Loading classes...</p>
            ) : filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard course={course} key={course.id} />
              ))
            ) : (
              <p>No classes were found.</p>
            )}
          </section>
  
      </main>


    </>
  );
}