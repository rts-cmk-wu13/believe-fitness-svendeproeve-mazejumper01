"use server"
import { z } from "zod"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

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

    const result = loginSchema.safeParse({username, password})

    if (!result.success) {
        console.log(z.flattenError(result.error).fieldErrors)
        return {
            values: { username, password },
            errors: z.flattenError(result.error).fieldErrors
        }
    }

    const response = await fetch("http://localhost:4000/auth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })

    if (!response.ok) {

        return {
            values: { username, password },
            errors: { form: ["Forkert username eller adgangskode."] }
        }
    }


    const data = await response.json()
    console.log(data)

    cookieStore.set("accessToken", data.token)
    cookieStore.set("userId", data.userId)

    return redirect("/kalender")

}