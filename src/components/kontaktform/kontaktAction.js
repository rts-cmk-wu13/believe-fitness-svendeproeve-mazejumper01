"use server"

import { z } from "zod"
import { postMessages } from "@/lib/dal"

const kontaktSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(5, "Message needs to be at least 5 charecters")
})

export async function sendKontaktMessage(prevState, formData) {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message")
  }

  const validation = kontaktSchema.safeParse(rawData)

  if (!validation.success) {
    return {
      values: rawData,
      errors: validation.error.flatten().fieldErrors
    }
  }

    try {
        await postMessages(validation.data)

        return {
        values: { name: "", email: "", message: "" },
        success: "Your message has been sent. We will get back to you as soon as possible."
        }
    } catch (error) {
        return {
        values: rawData,
        errors: { form: ["Could not send the message. Please try again later."] }
        }

    }

}