import Link from "next/link";


export default function NoAccess () {

    return (
        <main className="flex flex-col gap-5 items-center">
            <h1 className=" font-bold mt-10  text-2xl under">You do not have access to this page </h1>


            <Link className="underline"  href="/home">Head back to home</Link>
        </main>
    )
}