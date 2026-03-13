"use server"

import { z } from "zod"
import { postNewsletter } from "@/lib/dal"

const newsletterSchema = z.object({
  email: z
    .string()
    .min(3, "Email required")
    .email("Invalid email address")
})

export async function subscribeToNewsletter(prevState, formData) {

  const rawData = {
    email: formData.get("email")
  }

  const validatedFields = newsletterSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      values: rawData,
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  try {
    await postNewsletter(validatedFields.data.email)

    return {
      values: { email: "" },
      success: "You are now subscribed to the newsletter"
    }

  } catch {
    return {
      values: rawData,
      errors: { form: ["Could not subscribe please try again later."] }
    }
  }
}