"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function logOutUser() {
  const cookieStore = await cookies()

  cookieStore.delete("accessToken")
  cookieStore.delete("userId")
  cookieStore.delete("role")

  redirect("/")
}