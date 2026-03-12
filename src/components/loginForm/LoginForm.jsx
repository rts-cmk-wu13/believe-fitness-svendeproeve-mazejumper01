"use client"
import { useActionState } from "react"
import { loginUser } from "./loginAction"

const initialState = {
    values: {
        username: "",
        password: ""
    },
    errors: undefined
}

export default function LoginForm() {

    const [state, formAction, isPending] = useActionState(loginUser, initialState)
    console.log(state)
    return ( 
        <section className="col-start-2 mt-10">
            
        <form className="flex flex-col gap-4" action={formAction} noValidate>
            <h1 className="font-bold text-xl">Log in with your credentials</h1>
            <div >
                
                <input className=" inpt-s w-full" type="username" name="username" placeholder="Username" defaultValue={state.values.username} />
                {state.errors?.username && <p>{state.errors.username}</p> }
            </div>
            <div>
                
                <input className=" inpt-s w-full" type="password" name="password" placeholder="Password" defaultValue={state.values.password} />
                { state.errors?.password && <p>{state.errors.password}</p> }
            </div>

            
            { state.errors?.form && <p>{state.errors.form}</p>}
            <button type="submit" disabled={isPending} className="btn w-full self-center disabled:opacity-50">{ isPending ? "Logging in..." : "Log in"}</button>
        </form>
        </section>
    )
}
