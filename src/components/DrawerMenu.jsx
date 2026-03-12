"use client"

import { useState } from "react"
import Link from "next/link"
import { logOutUser } from "@/lib/logout"

export default function DrawerMenu() {
  const [open, setOpen] = useState(false)

  const links = [
    { name: "Home", href: "/home" },
    { name: "Popular classes", href: "/courses" },
    { name: "Search", href: "/search" },
    { name: "My profile", href: "/kalender" },
  ]

  return (
    <div>
     
      <button
        onClick={() => setOpen(!open)}
        className="relative  z-60 text-3xl">
        {open ? "X" : "="}
      </button>

      
      <div
        className={`fixed top-0 right-0 h-screen w-screen bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full items-center justify-center">
          <nav className="flex flex-col items-center gap-10 text-3xl">
            
           
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:opacity-60 transition">
                {link.name}
              </Link>
            ))}

            
            <form action={logOutUser}>
              <button
                type="submit"
                className="hover:opacity-60 transition">
                Log out
              </button>
            </form>

          </nav>
        </div>
      </div>
    </div>
  )
}