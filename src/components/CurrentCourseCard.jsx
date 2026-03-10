"use client";
import Link from "next/link";
import { leaveCourse } from "@/lib/dal";
import { useState } from "react";

export default function CurrentCourseCard({ course, isAdmin }) {
   const [isJoined, setIsJoined] = useState(true);

 async function handleLeave() {
    try {
      await leaveCourse(course.id);
      setIsJoined(false); 

    } catch (error) {
      console.error(error);
      alert("Noget gik galt ved afmelding");
    }
  }


  if (!isJoined) return null;

  return (
    <div className="bg-white text-black opacity-80 p-4 rounded shadow flex flex-col justify-between">
      <h3 className="font-bold text-xl">{course.className}</h3>
      <p>{course.classDay} - {course.classTime}</p>

      {isAdmin ? (
        <>
          <p>Max. participants: {course.maxParticipants}</p>
          <p>Tilmeldte: {course.users?.length || 0}</p>
          <Link href={`/deltagerListe/${course.id}`}>
            <button className="btn px-4 ">
              participants
            </button>
          </Link>
        </>
      ) : (
        <>
          <Link href={`/courses/${course.id}`}>
            <button className="btn px-4 ">
              vis class
            </button>
          </Link>



        </>
      )}

            <button
        onClick={handleLeave}
        className="btn px-4"
      >
        leave
      </button>

    </div>
  );
}