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

export async function getNews() {
  const response = await fetch(`${BASE_URL}/api/v1/news`);
  if (!response.ok) throw new Error("could not fetch news")
  return response.json()
}

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

export async function getTestimonials() {
  const response = await fetch(`${BASE_URL}/api/v1/testimonials`)
  if (!response.ok) throw new Error("Kunne ikke hente testimonials")
  return response.json()
}

