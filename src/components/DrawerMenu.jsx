"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { logOutUser } from "@/lib/logout"

export default function DrawerMenu() {
  const [open, setOpen] = useState(false)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const cookies = document.cookie
    const hasUserId = cookies.includes("userId=")
    if (hasUserId) {
      setUserId(true)
    }
  }, [])

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="relative z-60 text-3xl">
        {open ? "X" : "="}
      </button>

      <div
        className={`fixed top-0 right-0 h-screen w-screen bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full items-center justify-center">
          <nav className="flex flex-col items-center gap-10 text-3xl">

            <Link href="/home" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/courses" onClick={() => setOpen(false)}>Popular classes</Link>
            <Link href="/search" onClick={() => setOpen(false)}>Search</Link>
            {userId && (
              <Link href="/kalender" onClick={() => setOpen(false)}>
                My schedule
              </Link>
            )}


            {userId ? (
              <form action={logOutUser}>
                <button type="submit">Log out</button>
              </form>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)}>
                Log in
              </Link>
            )}

          </nav>
        </div>
      </div>
    </div>
  )
}