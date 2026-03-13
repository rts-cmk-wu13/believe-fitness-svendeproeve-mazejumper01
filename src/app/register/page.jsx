import RegisterForm from "@/components/registerForm/registerForm.jsx";
import RegLogHeader from "@/components/RegLogHeader";


export default function Register() {
    return (
        <main>


            <div className="page-grid mt-10  gap-5">
                <RegLogHeader />
                <RegisterForm />
            </div>
        </main>
    )
}
