"use client";

import { useState, useEffect } from "react";
import { getAllCourses, getAllTrainers } from "@/lib/dal";
import CourseCard from "@/components/CourseCard";
import Image from "next/image";
import DrawerMenu from "@/components/DrawerMenu";
import Link from "next/link";

export default function Page() {
  const [courses, setCourses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const courseData = await getAllCourses();
      const trainerData = await getAllTrainers();

      setCourses(courseData);
      setFilteredCourses(courseData);
      setTrainers(trainerData);
      setLoading(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const term = search.toLowerCase();

    const filtered = courses.filter((course) => {
      return (
        course.className?.toLowerCase().includes(term) ||
        course.classDay?.toLowerCase().includes(term) ||
        course.description?.toLowerCase().includes(term) ||
        course.trainer?.trainerName?.toLowerCase().includes(term)
      );
    });

    setFilteredCourses(filtered);
  }, [search, courses]);

  return (
    <main className="page-grid pb-20">
      <section className="w-full mt-10 flex flex-col col-start-2 gap-10 max-w-3xl overflow-hidden">

      
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/home"
              className="text-xl font-bold hover:opacity-70"
            >
              <button>
                <Image 
                src="/assets/arrow-left.svg"
                    alt="Back arrow"
                    width={14}
                    height={14}
                />
              </button>
            </Link>
            <h1 className="text-3xl font-bold">Search</h1>
          </div>

          <DrawerMenu />
        </div>

        
        <input
          type="text"
          placeholder="Search classes"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="inpt-s px-4 py-2 w-full"
        />

       
        {loading ? (
          <p>Loading classes...</p>
        ) : (
          <>
            {filteredCourses.length === 0 ? (
              <p>
                Your search did not give any results. Try to search for something else.
              </p>
            ) : (
              <div className="w-full overflow-x-auto">
                <div className="flex gap-4 w-max pr-4">
                  {filteredCourses.map((course) => (
                    <div key={course.id} className="shrink-0">
                      <CourseCard course={course} size="small" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

       
        <div className="page-grid">
          <h2 className="text-2xl font-bold col-start-2">Popular trainers</h2>

          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="p-4 col-start-2"
            >
              <div className="flex gap-5 items-center">
                <div className="relative w-22 h-22">
                  <Image
                    src={trainer.asset?.url}
                    alt={trainer.trainerName}
                    fill
                    className="rounded-2xl object-cover"
                  />
                </div>
                <p className="font-semibold">{trainer.trainerName}</p>
              </div>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}