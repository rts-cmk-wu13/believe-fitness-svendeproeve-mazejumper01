"use server"

import { z } from "zod"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { postLogin } from "@/lib/dal"

const loginSchema = z.object({
    username: z.string("Indtast en gyldig username adresse."),
    password: z.string().min(4, "Password skal være mindst 4 karakterer.")
})

export async function loginUser(prevState, formData) {



    const cookieStore = await cookies()

    

    const username = formData.get("username")
    const password = formData.get("password")

    if (username === prevState.values.username && password === prevState.values.password) {
        return prevState
    }

    const result = loginSchema.safeParse({ username, password })

    if (!result.success) {
        console.log(z.flattenError(result.error).fieldErrors)


        return {
            values: { username, password },
            errors: z.flattenError(result.error).fieldErrors
        }


    }
 
    const data = await postLogin(username, password)
    console.log(data)

    if (!data) {
        return {
            values: { username, password },
            errors: { form: ["Forkert username eller adgangskode."] }
        }
    }

    cookieStore.set("accessToken", data.token, { path: "/" })
    cookieStore.set("userId", data.userId, { path: "/" })
    cookieStore.set("role", data.role, { path: "/" })

    redirect("/kalender")
}
