"use server";

import { getCourseById, getUserById } from "@/lib/dal"
import { cookies } from "next/headers"
import DrawerMenu from "@/components/DrawerMenu";

import Image from "next/image";

export default async function Page({ params }) {
  const { id } = await params
  const course = await getCourseById(id)

  const cookieStore = await cookies()
  const userId = cookieStore.get("userId")?.value
  const token = cookieStore.get("accessToken")?.value

  const user = userId && token
    ? await getUserById(userId, token)
    : null

  return (
    <>
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

      <div className="col-start-2 pt-8 flex flex-col gap-8"> 
        <h2 className="text-2xl font-bold ">{course.className}</h2>
        <h3 className="font-bold">Participants:</h3>
        {course.users && course.users.length > 0 ? (
          <ul>
            {course.users.map(user => (
              <li className="inpt-s p-4 flex gap-5" key={user.id}>
                <div className="flex gap-2">
                 

                <p>{user.userFirstName} {user.userLastName}</p>
                </div>


              </li>
              
            ))}
          </ul>
        ) : (
          <p>No Participants yet.</p>
        )}
      </div>
    </main>


    </>
  )
}