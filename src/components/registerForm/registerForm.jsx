"use client"
import { useActionState } from "react"
import { registerUser } from "./action"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function RegisterForm() {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(registerUser, {
    values: { name: "", username: "", password: "", confirmPassword: "" },
    errors: undefined,
  })


  useEffect(() => {
    if (state?.success) {
      router.push("/login")
    }
  }, [state, router])

  return (
    <section className="col-start-2 mt-10">
      <form className="flex flex-col gap-5" action={formAction} noValidate>
        <h2 className="font-bold text-lg">Sign up as a new user</h2>

        <input 
          className="inpt-s" 
          type="text" 
          name="name" 
          placeholder="Full name"
          defaultValue={state.values?.name || ""}
        />
        {state.errors?.name && <p>{state.errors.name}</p>}

        <input 
          className="inpt-s" 
          type="text" 
          name="username" 
          placeholder="username" 
         defaultValue={state.values?.username || ""}
        />
        {state.errors?.username && <p>{state.errors.username}</p>}

        <input 
          className="inpt-s" 
          type="password" 
          name="password" 
          placeholder="password" 
          defaultValue={state.values?.password || ""}
        />
        {state.errors?.password && <p>{state.errors.password}</p>}

        <input 
          className="inpt-s" 
          type="password" 
          name="confirmPassword" 
          placeholder="repeat password" 
         defaultValue={state.values?.confirmPassword || ""}
        />
        {state.errors?.confirmPassword && <p>{state.errors.confirmPassword}</p>}

        {state.errors?.form && <p>{state.errors.form}</p>}

        <button 
          type="submit" 
          disabled={isPending} 
          className="btn w-full self-center disabled:opacity-50"
        >
          {isPending ? "signing up" : "sign up"}
        </button>
      </form>
    </section>
  )
}