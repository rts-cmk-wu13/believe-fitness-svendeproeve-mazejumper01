"use server";

import { getCourseById, getUserById } from "@/lib/dal"
import { cookies } from "next/headers"

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
    <main className="grid grid-cols-[10px_1fr_10px]">
      <h1 className="col-start-2 text-center text-2xl py-5">Min profil</h1>
    
      <div className="bg-white col-start-1 col-span-3 text-3xl text-black flex flex-col gap-4 justify-center items-center rounded shadow">
        <Image src="/assets/user.svg" width={64} height={64} alt="Bruger ikon" />
        <p>Navn: {user.userFirstName} {user.userLastName}</p>
        <p>Rank: {user.role}</p>
      </div>

      <div className="col-start-2 pt-8 flex flex-col gap-8"> 
        <h2 className="text-2xl ">{course.name}</h2>
        <h3 className="text-lg">Deltagere:</h3>
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
          <p>Ingen deltagere endnu</p>
        )}
      </div>
    </main>


    </>
  )
}