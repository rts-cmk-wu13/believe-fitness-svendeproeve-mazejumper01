import LoginForm from "@/components/loginform/LoginForm.jsx";

import Link from "next/link";

export default function Login() {
    return (

        <main >


            <div className="grid grid-cols-[20px_1fr_20px]  gap-5 mt-10">
                
                 <h1 className="highlight font-bold col-start-2 max-w-[7ch] text-6xl">Belive Fitness</h1>
                 <div className="col-span-full gap-x-5 items-center grid grid-cols-[20px_1fr_20px]">
                 <div className="w-7.75 h-0.5 col-start-1  bg-black"></div>
                 
                    
                    <h2 className="text-xl  font-bold">train like a pro</h2>
                    </div>




                <LoginForm/>
            </div>
           <div className="flex flex-col items-center ">
            <p className="w-[25ch] text-gray-500 text-center">Are You not yet a Believer?</p>
            <p className="text-gray-500"><Link className="underline " href="/register">Sign up here</Link> to start training like a pro.</p>
            </div>

        </main>

    );

    };