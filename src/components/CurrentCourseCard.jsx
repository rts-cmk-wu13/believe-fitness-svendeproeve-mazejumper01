"use client";
import Link from "next/link";
import { leaveCourse, getCourseById } from "@/lib/dal";
import { useState, useEffect } from "react";

export default function CurrentCourseCard({ course, isAdmin }) {
  const [isJoined, setIsJoined] = useState(true);
  const [fullCourse, setFullCourse] = useState(course);

  useEffect(() => {
    if (isAdmin) {
      async function fetchFullCourse() {
        try {
          const data = await getCourseById(course.id);
          setFullCourse(data);
        } catch (error) {
          console.error("Failed to fetch course data:", error);
        }
      }
      fetchFullCourse();
    }
  }, [course.id, isAdmin]);

  async function handleLeave() {
    try {
      await leaveCourse(course.id);
      setIsJoined(false); 
    } catch (error) {
      console.error(error);
      alert("Something went wrong while leaving the class");
    }
  }

  if (!isJoined) return null;

  return (
    <div className="p-4 border-gray-500 border rounded-2xl flex flex-col justify-between">
      <h3 className="font-bold text-xl">{course.className}</h3>
      <p>{course.classDay} - {course.classTime}</p>

      {isAdmin ? (
        <>
          <p>Max. participants: {course.maxParticipants}</p>
          <p>Joined: {fullCourse.users ? fullCourse.users.length : 0}</p>
          <div className="flex gap-2 mt-2">
            <Link href={`/deltagerListe/${course.id}`}>
              <button className="btn px-4">Participants</button>
            </Link>
          </div>
        </>
      ) : (
        <div className="flex justify-between">
          <Link href={`/courses/${course.id}`}>
            <button className="btn px-4">Show Class</button>
          </Link>
          <button onClick={handleLeave} className="btn px-4">
            Leave
          </button>
        </div>
      )}
    </div>
  );
}