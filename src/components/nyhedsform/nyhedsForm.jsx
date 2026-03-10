"use client"

import { useActionState } from "react"
import { subscribeToNewsletter } from "@/components/nyhedsform/nyhedsAction";

const initialState = {
    values: { email: "" },
    errors: undefined,
    success: undefined
}

export default function NyhedsForm() {

    const [state, formAction, isPending] = useActionState(
        subscribeToNewsletter,
        initialState
    )

    return (
        <section className="pt-10 col-start-2 flex flex-col gap-5">
            <h3 className="info-h3">Sign up for our newsletter</h3>
            <p>Sign up to receive the latest news and announcements from Believe Fitness</p>
            <form action={formAction} className="flex flex-col  gap-2">
                
                <div className="flex gap-5 items-center">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        defaultValue={state.values.email}
                        className="inpt-s max-w-63.75  rounded-full border-gray-400 border focus:outline-none focus:ring-0 p-2"
                    />

                                <button
                        type="submit"
                        disabled={isPending}
                        className=" btn w-27 h-13.25 text-black rounded disabled:opacity-50"
                    >
                        {isPending ? "signing up..." : "signup"}
                    </button>
                </div>

                {state.errors?.email && <p>{state.errors.email}</p>}
                {state.errors?.form && <p>{state.errors.form}</p>}
                {state.success && <p>{state.success}</p>}


            </form>
        </section>
    )
}