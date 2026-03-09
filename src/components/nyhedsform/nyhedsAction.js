"use server"

import { z } from "zod"
import { postNewsletter } from "@/lib/dal"

const newsletterSchema = z.object({
  email: z
    .string()
    .min(3, "Email er påkrævet")
    .email("Ugyldig email adresse")
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
      success: "Du er nu tilmeldt nyhedsbrevet"
    }

  } catch {
    return {
      values: rawData,
      errors: { form: ["Kunne ikke tilmelde. Prøv igen senere."] }
    }
  }
}