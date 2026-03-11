"use client"
import { useActionState } from "react"
import { registerUser } from "./action"

const initialState = {
    values: {
        userFirstName: "",
        userLastName: "",
        username: "",
 
        password: "",
        confirmPassword: ""
    },
    errors: undefined
}

export default function RegisterForm() {
    const [state, formAction, isPending] = useActionState(registerUser, initialState)

    return (
        <section className="col-start-2">
            <form className="flex flex-col gap-2" action={formAction} noValidate>
                <input 
                    className="inpt" 
                    type="text" 
                    name="userFirstName" 
                    placeholder="Fornavn" 
                    defaultValue={state.values.userFirstName} 
                />
                {state.errors?.userFirstName && <p>{state.errors.userFirstName}</p>}

                <input 
                    className="inpt" 
                    type="text" 
                    name="userLastName" 
                    placeholder="Efternavn" 
                    defaultValue={state.values.userLastName} 
                />
                {state.errors?.userLastName && <p>{state.errors.lastnuserLastNameame}</p>}

                <input 
                    className="inpt" 
                    type="text" 
                    name="username" 
                    placeholder="Brugernavn" 
                    defaultValue={state.values.username} 
                />
                {state.errors?.username && <p>{state.errors.username}</p>}



                <input 
                    className="inpt" 
                    type="password" 
                    name="password" 
                    placeholder="Adgangskode" 
                    defaultValue={state.values.password} 
                />
                {state.errors?.password && <p>{state.errors.password}</p>}

                <input 
                    className="inpt" 
                    type="password" 
                    name="confirmPassword" 
                    placeholder="Gentag adgangskode" 
                    defaultValue={state.values.confirmPassword} 
                />
                {state.errors?.confirmPassword && <p>{state.errors.confirmPassword}</p>}

                {state.errors?.form && <p>{state.errors.form}</p>}

                <button 
                    type="submit" 
                    disabled={isPending} 
                    className="btn self-center disabled:opacity-50"
                >
                    {isPending ? "Opretter bruger..." : "Opret bruger"}
                </button>
            </form>
        </section>
    )
}