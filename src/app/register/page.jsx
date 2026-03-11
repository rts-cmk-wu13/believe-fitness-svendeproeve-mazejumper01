import RegisterForm from "@/components/registerForm/registerForm.jsx";


export default function Register() {
    return (
        <main>


            <div className="grid grid-cols-[10px_1fr_10px] gap-5">
                <h1 className="col-start-2 text-4xl">Opret ny bruger</h1>
                <RegisterForm />
            </div>
        </main>
    )
}
