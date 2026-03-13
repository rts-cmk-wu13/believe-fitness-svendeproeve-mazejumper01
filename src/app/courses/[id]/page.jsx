"use server";


import { getCourseById, getUserById } from "@/lib/dal";
import { getTrainerById} from "@/lib/dal";
import { joinCourse, leaveCourse  } from "@/lib/dal"
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function CourseDetailPage({ params }) {
  const { id } = await params;
  const course = await getCourseById(id);

  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  const token = cookieStore.get("accessToken")?.value;

  const participants = course.users?.length || 0
  const isFull = participants >= course.maxParticipants 

  const trainer = course.trainerId
  ? await getTrainerById(course.trainerId)
  : null;

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
      <main className="grid  gap-6">

        <div
          className="page-grid max-w-100% h-120.5   bg-cover bg-center"
          style={{ backgroundImage: `url(${course.asset?.url})` }}
        >

           <Link
              href="/home"
              className="text-xl w-4  h-4 col-start-2 mt-10 font-bold hover:opacity-70"
            >
              <button>
                <Image 
                src="/assets/arrow-left-white.svg"
                    alt="Back arrow"
                    width={14}
                    height={14}
                />
              </button>
            </Link>


            <h1 className="text-4xl col-start-2 max-w-60 mt-20 font-bold text-[#f1c40e]">{course.className}</h1>
        </div>

        <div className="page-grid">
          <div className="col-start-2">
            
            <p>{course.classDay} - {course.classTime}</p>
            <p className="pb-10">{course.classDescription}</p>

            <section className="mb-5">
              <h2 className="text-xl font-bold capitalize">trainer</h2>

              {trainer && (
                <div className="flex items-center gap-3 mt-3">
                  <div className="relative w-22 h-22">
                    <Image
                      src={trainer.asset?.url}
                      alt={trainer.trainerName}
                      fill
                      className="rounded-2xl object-cover"
                    />
                  </div>
                  <p className="font-bold">{trainer.trainerName}</p>
                </div>
              )}
            </section>

             {user && !isJoined && (
              <form action={handleJoin} className="col-start-2 mb-7">
                <button
                  disabled={isFull}
                  className="btn w-full px-4 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isFull ? "Class full" : "Sign up"}
                </button>
              </form>)}

          </div>
        </div>
      </main>
    </>
  );
}