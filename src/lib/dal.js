"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache"

const BASE_URL = process.env.API_BASE_URL;

export async function getAllEvents() {
    //Second line of defense (apart from proxy)
    const cookieStore = await cookies();
    //Guard clause
    if (!cookieStore.has("accessToken")) return redirect("/no-access");

    const response = await fetch("http://localhost:4000/events");
    if(!response.ok){
        throw new Error({message: "Events could not be fetched"})
    }
    const data = await response.json();
    
    return data;
}


//Henter billeder text osv til homepage
export async function getNews() {
  const response = await fetch(`${BASE_URL}/api/v1/news`);
  if (!response.ok) throw new Error("could not fetch news")
  return response.json()
}


//Tildmelder sig nyhedsbrev
export async function postNewsletter(email) {
  const response = await fetch(`${BASE_URL}/api/v1/newsletter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Could not subscribe to newsletter");
  }

  return response.json();
}

//Henter testimonials
export async function getTestimonials() {
  const response = await fetch(`${BASE_URL}/api/v1/testimonials`)
  if (!response.ok) throw new Error("Kunne ikke hente testimonials")
  return response.json()
}


export async function postMessages(data) {
    const response = await fetch(`${BASE_URL}/api/v1/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error("Noget gik galt ved afsendelse")
    }

      return response.json();
  }



  //Henter alle classes
export async function getAllCourses() {
    const response = await fetch(`${BASE_URL}/api/v1/classes`);
    if(!response.ok){
        throw new Error({message: "classes kunne ikke fetches"})
    }
    const data = await response.json();
    
    return data;
}

//Henter en enkel class med id
export async function getCourseById(id) {
    const response = await fetch(`http://localhost:4000/api/v1/classes/${id}`);
    if(!response.ok){
        throw new Error({message: "class kunne ikke fetches"})
    }
    const data = await response.json();
    
    return data;
}




//Henter en enkel bruger med id
export async function getUserById(id, token) {
  const response = await fetch(`http://localhost:4000/api/v1/users/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    },
    cache: "no-store"
  });




  if (!response.ok) {
    throw new Error("Kunne ikke hente bruger");
  }

  return response.json();
 }

 //Til at tilføje en bruger til en course
export async function joinCourse(courseId) {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value
  const userId = cookieStore.get("userId")?.value

  if (!token || !userId) return redirect("/login")

  const userResponse = await fetch(
    `http://localhost:4000/api/v1/users/${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store"
    }
  )

  if (!userResponse.ok) throw new Error("Kunne ikke hente bruger")

  const user = await userResponse.json()

  const courseResponse = await fetch(
    `http://localhost:4000/api/v1/classes/${courseId}`,
    { cache: "no-store" }
  )

  if (!courseResponse.ok) throw new Error("Kunne ikke hente aktivitet")

  const course = await courseResponse.json()

  //Tjekker om bruger allerede har en course samme ugedag
  const hasSameWeekday = user.courses?.some(
    (c) => c.classDay.toLowerCase() === course.classDay.toLowerCase()
  )

  if (hasSameWeekday) {
    throw new Error("Du er allerede tilmeldt en aktivitet på denne ugedag")
  }

  const response = await fetch(
    `http://localhost:4000/api/v1/users/${userId}/classes/${courseId}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }
  )

  if (!response.ok) throw new Error("Kunne ikke tilmelde aktivitet")

  revalidatePath(`/courses/${courseId}`)
  return response.json()
}


//Til at fjerne en bruger fra course
export async function leaveCourse(courseId) {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value
  const userId = cookieStore.get("userId")?.value

  if (!token || !userId) return redirect("/login")

  const response = await fetch(
    `http://localhost:4000/api/v1/users/${userId}/classes/${courseId}`,
    { 
        method: "DELETE", 
        headers:{ Authorization: `Bearer ${token}` }, 
        cache: "no-store" }
  )

  if (!response.ok) throw new Error("Kunne ikke afmelde aktivitet")

  revalidatePath(`/courses/${courseId}`)
  return { success: true }
}