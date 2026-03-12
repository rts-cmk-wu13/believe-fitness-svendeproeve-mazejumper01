"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache"

const BASE_URL = process.env.API_BASE_URL;


// Henter billeder text osv til homep
export async function getNews() {
  const response = await fetch(`${BASE_URL}/api/v1/news`);

  if (!response.ok) throw new Error("could not fetch news")

  return response.json()
}


// Tildmelder sig nyhedsbrev
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


// Henter testimonials
export async function getTestimonials() {
  const response = await fetch(`${BASE_URL}/api/v1/testimonials`)

  if (!response.ok) throw new Error("Kunne ikke hente testimonials")

  return response.json()
}



//Sender besked afsted
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


// Henter alle classes
export async function getAllCourses() {
  const response = await fetch(`${BASE_URL}/api/v1/classes`);

  if (!response.ok) {
    throw new Error("classes kunne ikke fetches")
  }

  return response.json();
}


// Henter en enkel class med id
export async function getCourseById(id) {
  const response = await fetch(`${BASE_URL}/api/v1/classes/${id}`);

  if (!response.ok) {
    throw new Error("class kunne ikke fetches")
  }

  return response.json();
}


// Henter en enkel bruger med id
export async function getUserById(id, token) {
  const response = await fetch(`${BASE_URL}/api/v1/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Could not fetch user");
  }

  return response.json();
}


// Henter en enkel trainer med id
export async function getTrainerById(id) {
  const response = await fetch(`${BASE_URL}/api/v1/trainers/${id}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Could not fetch trainer");
  }

  return response.json();
}

// Henter alle trainers
export async function getAllTrainers() {
  const response = await fetch(`${BASE_URL}/api/v1/trainers`);

  if (!response.ok) {
    throw new Error("Could not fetch trainers");
  }

  return response.json();
}

// Logger bruger ind
export async function postLogin(username, password) {
  const response = await fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  })

  if (!response.ok) {
    return null 
  }

  return response.json()
}



//Opretter bruger
export async function postRegister({ userFirstName, userLastName, username, password, role = "default" }) {
  const response = await fetch(`${BASE_URL}/api/v1/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userFirstName,
      userLastName,
      username,
      password,
      role,
    }),
  })

  if (!response.ok) {
    throw new Error("Der opstod en fejl ved oprettelse af bruger.")
  }

  return response.json()
}


// Til at tilføje en bruger til en course
export async function joinCourse(courseId) {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value
  const userId = cookieStore.get("userId")?.value

  if (!token || !userId) return redirect("/login")

  const userResponse = await fetch(
    `${BASE_URL}/api/v1/users/${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store"
    }
  )

  if (!userResponse.ok) throw new Error("Kunne ikke hente bruger")

  const user = await userResponse.json()

  const courseResponse = await fetch(
    `${BASE_URL}/api/v1/classes/${courseId}`,
    { cache: "no-store" }
  )

  if (!courseResponse.ok) throw new Error("Kunne ikke hente aktivitet")

  const course = await courseResponse.json()

  //Sørger for at man ikke kan tilmedle to classes på samme dag
const hasSameWeekday = user.classes?.some(
  (c) => c.classDay.trim().toLowerCase() === course.classDay.trim().toLowerCase()
);


  if (hasSameWeekday) {
    throw new Error("Du er allerede tilmeldt en aktivitet på denne ugedag")
  }

  const response = await fetch(
    `${BASE_URL}/api/v1/users/${userId}/classes/${courseId}`,
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






// Til at fjerne en bruger fra course
export async function leaveCourse(courseId) {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value
  const userId = cookieStore.get("userId")?.value

  if (!token || !userId) return redirect("/login")

  const response = await fetch(
    `${BASE_URL}/api/v1/users/${userId}/classes/${courseId}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store"
    }
  )

  if (!response.ok) throw new Error("Kunne ikke afmelde aktivitet")

  revalidatePath(`/courses/${courseId}`)

  return { success: true }
}


