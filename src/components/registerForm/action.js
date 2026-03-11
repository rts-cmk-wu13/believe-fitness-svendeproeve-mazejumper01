import { postRegister } from "@/lib/dal"
import { z } from "zod"
import { redirect } from "next/navigation"

const registerSchema = z
  .object({
    userFirstName: z.string().min(1, "Fornavn er påkrævet."),
    userLastName: z.string().min(1, "Efternavn er påkrævet."),
    username: z.string().min(3, "Brugernavn skal være mindst 3 karakterer."),
    password: z.string().min(4, "Adgangskode skal være mindst 4 karakterer."),
    confirmPassword: z.string().min(4, "Gentag adgangskode skal udfyldes."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Adgangskoderne matcher ikke.",
    path: ["confirmPassword"],
  })

export async function registerUser(prevState, formData) {
  const userFirstName = formData.get("userFirstName")
  const userLastName = formData.get("userLastName")
  const username = formData.get("username")
  const password = formData.get("password")
  const confirmPassword = formData.get("confirmPassword")

  const result = registerSchema.safeParse({ userFirstName, userLastName, username, password, confirmPassword })

  if (!result.success) {
    return {
      values: { userFirstName, userLastName, username, password, confirmPassword },
      errors: z.flattenError(result.error).fieldErrors,
    }
  }

  try {
    await postRegister({ userFirstName, userLastName, username, password })
    return redirect("/login")
  } catch (error) {
    return {
      values: { userFirstName, userLastName, username, password, confirmPassword },
      errors: { form: [error.message] },
    }
  }
}