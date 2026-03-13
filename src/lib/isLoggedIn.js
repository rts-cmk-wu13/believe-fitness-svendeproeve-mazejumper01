"use server"

import { cookies } from "next/headers"

export async function isLoggedIn() {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value

  return !!token
}