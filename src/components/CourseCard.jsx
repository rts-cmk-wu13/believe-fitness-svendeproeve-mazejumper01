"use client";

import Link from "next/link";

export default function CourseCard({ course, size = "small" }) {

  const isLarge = size === "large";

  return (
    <div className={`${isLarge ? "w-full h-105" : "w-55 h-65"} flex`}>
      <Link
        href={`/courses/${course.id}`}
        aria-labelledby={"course-card-" + course.id}
        className="w-full"
      >
        <div
          className="flex flex-col-reverse w-full h-full rounded-t-3xl rounded-bl-3xl overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `url(${course.asset?.url})`,
          }}
        >
          <div className="rounded-tr-3xl opacity-90 flex flex-col justify-end p-4 text-white">
            <h2
              name={"course-card-" + course.className}
              className={`${isLarge ? "text-2xl" : "text-lg"} font-semibold`}
            >
              {course.className}
            </h2>
          </div>
        </div>
      </Link>
    </div>
  );
}