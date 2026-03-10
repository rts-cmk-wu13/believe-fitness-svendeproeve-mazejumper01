"use server";

import { getCourseById, getUserById } from "@/lib/dal";
import { joinCourse } from "@/lib/dal"
import { cookies } from "next/headers";

export default async function CourseDetailPage({ params }) {
  const { id } = await params;
  const course = await getCourseById(id);

  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  const token = cookieStore.get("accessToken")?.value;

  const user = userId && token
    ? await getUserById(userId, token)
    : null;

  const isJoined = course.users?.some(u => u.id === Number(userId));

  async function handleJoin() {
    "use server";
    await joinCourse(id);
  }

  async function handleLeave() {
    "use server";
    await leaveCourse(id);
  }

  return (
    <>
      <main className="grid gap-6">
        <div
          className="grid  max-w-100% h-120.5 items-end  bg-cover bg-center"
          style={{ backgroundImage: `url(${course.asset?.url})` }}
        >

            <h1 className="text-4xl font-bold text-[#f1c40e]">{course.className}</h1>
        </div>

        <div className="grid grid-cols-[10px_1fr_10px]">
          <div className="col-start-2">
            
            <p>{course.classDay} - {course.classTime}</p>
            <p>{course.classDescription}</p>

                      {isJoined ? (
            <form  className="none">

            </form>
          ) : (
            <form action={handleJoin} className="col-start-2 mb-7">
              <button className="btn px-4">
                join
              </button>
            </form>
          )}

          </div>
        </div>
      </main>
    </>
  );
}