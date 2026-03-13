import { cookies } from "next/headers";
import { getUserById, getAllCourses } from "@/lib/dal";
import CurrentCourseCard from "@/components/CurrentCourseCard";
import Link from "next/link";
import DrawerMenu from "@/components/DrawerMenu";
import Image from "next/image";

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
    return <p>Could not fetch user</p>;
  }

  let courses = [];

  try {
    if (user.role === "admin") {

      courses = await getAllCourses();
    } else {

      courses = user.classes || [];
    }
  } catch (err) {
    console.error("Fejl ved hentning af classes:", err);
    courses = [];
  }

  return (
     <main className="page-grid">
      <header className="col-start-2 grid ">
        <div className=" col-span-3 my-10 flex justify-between">
            <h1 className="col-start-1 grid-cols-[1fr_1fr_1fr] text-2xl ">My profile</h1>
          

          
            <DrawerMenu />
        </div>
        
          <div className="grid grid-cols-[4rem_1fr] col-start-1 col-span-3   ">
            <Image className=" b-prim p-2 rounded-full row-span-2" src="/assets/user.svg" width={60} height={60} alt="Bruger ikon" />
            <p className="col-start-2 text-xl ps-2"> {user.userFirstName} {user.userLastName}</p>
            <p  className="col-start-2 ps-2"> {user.role}</p>
          </div>
        </header>

      <section className="mt-8 col-start-2">

        <div className="flex justify-between items-center mb-4">


          {user.role === "admin" && (
            <Link href="/createCourse">
              <button className="btn px-4">
                add class
              </button>
            </Link>
          )}

        </div>

        {courses.length === 0 && (
          <p>
            {user.role === "admin"
              ? "No classes exist yet"
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
  );
}