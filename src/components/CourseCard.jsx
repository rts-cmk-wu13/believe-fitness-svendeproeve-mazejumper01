"use client";

import Link from "next/link";




export default function CourseCard({ course }) {

  return (
<>
<div className="flex max-w-90">
  <Link
    href={`/courses/${course.id}`}
    aria-labelledby={"course-card-" + course.id}
    className="flex max-w-90"
  >
    <div
      className="flex flex-col-reverse w-90 h-85 rounded-t-3xl rounded-bl-3xl overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${course.asset?.url})`,
      }}
    >
      <div className=" rounded-tr-3xl opacity-90 flex flex-col justify-end p-4 text-white">
        <h2
          name={"course-card-" + course.className}
          className="text-xl font-semibold"
        >
          {course.className}
        </h2>
        
      </div>
      
    </div>
  </Link>



</div>

    </>
  );
}
