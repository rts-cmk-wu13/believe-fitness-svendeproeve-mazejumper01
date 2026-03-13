"use client"

import { useActionState } from "react"
import { sendKontaktMessage } from "./kontaktAction"

const initialState = {
  values: { name: "", email: "", message: "" },
  errors: undefined,
  success: undefined
}

export default function KontaktForm() {
  const [state, formAction, isPending] = useActionState(sendKontaktMessage, initialState)

  return (
    <form action={formAction} className=" col-start-2 flex flex-col gap-3">
      <h2 className="text-2xl font-bold mb-2">Contact us</h2>
      <p>Ask us anything about <span className="capitalize">believe fitness</span></p>

      <input
        type="text"
        name="name"
        placeholder="Enter your name..."
        defaultValue={state.values.name}
        className="inpt-s p-2"
      />
      {state.errors?.name && <p >{state.errors.name}</p>}

      <input
        type="email"
        name="email"
        placeholder="Enter your email..."
        defaultValue={state.values.email}
        className="inpt-s"
      />
      {state.errors?.email && <p >{state.errors.email}</p>}

      <textarea
        name="message"
        placeholder="Enter your message..."
        defaultValue={state.values.message}
        className="inpt-m h-30"
      />
      {state.errors?.message && <p >{state.errors.message}</p>}

      {state.errors?.form && <p >{state.errors.form}</p>}
      {state.success && <p>{state.success}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="btn mt-2 capitalize px-4 py-2 rounded disabled:opacity-50"
      >
        {isPending ? "sending" : "send message"}
      </button>
    </form>
  )
}