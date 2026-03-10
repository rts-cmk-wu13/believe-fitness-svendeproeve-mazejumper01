import LoginForm from "@/components/loginform/LoginForm.jsx";

import Link from "next/link";

export default function Login() {
    return (

        <main >


            <div className="grid grid-cols-[10px_1fr_10px] gap-5">

                 <h1 className="col-start-2 text-4xl">Log ind</h1>

                <LoginForm/>
            </div>
           
            <p className="w-screen text-center">Are You not yet a Believer?<Link className="underline" href="/register">Sign up here</Link> to start training like a pro.</p>

        </main>

    );

    };