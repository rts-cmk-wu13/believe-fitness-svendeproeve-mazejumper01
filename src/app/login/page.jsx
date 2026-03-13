import LoginForm from "@/components/loginform/LoginForm.jsx";
import RegLogHeader from "@/components/RegLogHeader";

import Link from "next/link";

export default function Login() {
    return (

        <main >

        
            <div className="page-grid  gap-5 mt-10">
                
                 <RegLogHeader />





                <LoginForm/>
            </div>
           <div className="flex flex-col items-center ">
            <p className="w-[25ch] text-gray-500 text-center">Are You not yet a Believer?</p>
            <p className="text-gray-500"><Link className="underline " href="/register">Sign up here</Link> to start training like a pro.</p>
            </div>

        </main>

    );

    };