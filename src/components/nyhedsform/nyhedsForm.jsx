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
            <form action={formAction} className="flex flex-col  gap-2">
                
                <div className="flex gap-2 items-center">
                    <input
                        type="email"
                        name="email"
                        placeholder="Indtast din email"
                        defaultValue={state.values.email}
                        className="max-w-63.75 h-11.25 bg-white text-black p-2"
                    />

                                <button
                        type="submit"
                        disabled={isPending}
                        className=" w-20.75 h-13.25 bg-gray-300 text-black rounded disabled:opacity-50"
                    >
                        {isPending ? "Tilmeldes..." : "Tilmeld"}
                    </button>
                </div>

                {state.errors?.email && <p>{state.errors.email}</p>}
                {state.errors?.form && <p>{state.errors.form}</p>}
                {state.success && <p>{state.success}</p>}


            </form>
        )
    }