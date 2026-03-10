import { cookies } from "next/headers";
import { getUserById, getAllCourses } from "@/lib/dal";
import CurrentCourseCard from "@/components/CurrentCourseCard";
import Link from "next/link";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const userId = cookieStore.get("userId")?.value;

  if (!token || !userId) return <p>You are not logged in</p>;

  let user;
  try {
    user = await getUserById(userId, token);
  } catch (err) {
    console.error("Fejl ved hentning af bruger:", err);
    return <p>Could not fetch users</p>;
  }

  let courses = [];

  if (user.role !== "admin") {
    courses = user.classes || [];
  } else {
    try {
      const allcourses = await getAllCourses();
      courses = allcourses.filter(crs => crs.adminId === user.id);
    } catch (err) {
      console.error("Fejl ved hentning af alle courses:", err);
      courses = [];
    }
  }

  return (
    <>
      <main className="grid grid-cols-[10px_1fr_10px]">
        <h1 className="col-start-2 text-center text-2xl py-5">My Profile</h1>

        <div className="bg-white col-start-1 col-span-3 text-3xl text-black flex flex-col gap-4 justify-center items-center rounded shadow">
          <p>{user.userFirstName} {user.userLastName}</p>
          <p>{user.role}</p>
        </div>

        <section className="mt-8 col-start-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl">
              {user.role === "admin" ? "Classes you teach" : "Your classes"}
            </h2>

            
            {user.role === "admin" && (
              <Link href="/opretHold">
                <button className="btn px-4">
                  add class
                </button>
              </Link>
            )}
          </div>

          {courses.length === 0 && (
            <p>
              {user.role === "admin"
                ? "You arent teaching any classes yet"
                : "You arent part of any classes yet"}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {courses.map(course => (
              <CurrentCourseCard
                key={course.id}
                course={course}
                isAdmin={user.role === "admin"}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}