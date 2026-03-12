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
    <main className="grid grid-cols-[20px_1fr_20px]">
       <DrawerMenu />
      <h1 className="col-start-2  text-2xl py-5">My profile</h1>
    
      <div className="grid grid-cols-[20px_4rem_1fr_20px] col-start-1 col-span-3  justify-center items-center ">
        <Image className="col-start-2 b-prim p-2 rounded-full row-span-2" src="/assets/user.svg" width={60} height={60} alt="Bruger ikon" />
        <p className="col-start-3 text-xl ps-2">Name: {user.userFirstName} {user.userLastName}</p>
        <p  className="col-start-3 ps-2">Role: {user.role}</p>
      </div>

      <div className="col-start-2 pt-8 flex flex-col gap-8"> 
        <h2 className="text-2xl font-bold ">{course.className}</h2>
        <h3 className="font-bold">Participants:</h3>
        {course.users && course.users.length > 0 ? (
          <ul>
            {course.users.map(user => (
              <li className="bg-white  opacity-80 p-4 rounded shadow flex gap-5 justify-between" key={user.id}>
                <div className="flex gap-2">
                 

                <p>{user.userFirstName} {user.userLastName}</p>
                </div>
                <p>{user.age} år</p>

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