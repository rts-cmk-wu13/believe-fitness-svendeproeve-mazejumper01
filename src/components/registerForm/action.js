import { postRegister } from "@/lib/dal"
import { z } from "zod"
import { redirect } from "next/navigation"

const registerSchema = z
  .object({
    userFirstName: z.string().min(1, "First name is required."),
    userLastName: z.string().min(1, "Last name is required."),
    username: z.string().min(3, "Username needs at least 3 characters."),
    password: z.string().min(4, "Password needs at least 4 characters."),
    confirmPassword: z.string().min(4, "Please repeat the password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords dont match.",
    path: ["confirmPassword"],
  })

export async function registerUser(prevState, formData) {

  const name = formData.get("name")
  const username = formData.get("username")
  const password = formData.get("password")
  const confirmPassword = formData.get("confirmPassword")

  const nameParts = name?.trim().split(" ") || []

 
  if (nameParts.length < 2) {
    return {
      values: { name, username, password, confirmPassword },
      errors: { name: ["Please write your full name."] },
    }
  }

  const userFirstName = nameParts[0]
  const userLastName = nameParts.slice(1).join(" ")

  const result = registerSchema.safeParse({
    userFirstName,
    userLastName,
    username,
    password,
    confirmPassword,
  })

  if (!result.success) {
    return {
      values: { name, username, password, confirmPassword },
      errors: z.flattenError(result.error).fieldErrors,
    }
  }

  try {
    await postRegister({ userFirstName, userLastName, username, password })

        return { success: true }

  } catch (error) {
    return {
      values: { name, username, password, confirmPassword },
      errors: { form: [error.message] },
    }
  }
}