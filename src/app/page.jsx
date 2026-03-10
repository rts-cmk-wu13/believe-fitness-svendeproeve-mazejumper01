import Image from "next/image";
import { getNews } from "../lib/dal";
import NyhedsForm from "@/components/nyhedsform/NyhedsForm";
import Slider from "@/components/Slider";
import KontaktForm from "@/components/kontaktform/KontaktForm";

export default async function Home() {

  const news = await getNews();
  return (
    <>
  <header className="relative min-h-102.5 w-full bg-[url('/assets/heroimg.png')] bg-cover bg-center grid grid-cols-[20px_1fr_20px] justify-between items-end col-span-full">

    <div className="col-start-2 mb-10">
      <h1 className="text-4xl mb-3 font-bold text-[#f1c40e]">Welcome to Belive Fitness</h1>

      <div className=" flex gap-4 ">
        <button className=" btn w-28.25 h-13.25 ">classes</button>
        <button className="btn w-28.25 h-13.25">log in</button>
      </div>
    </div>

  </header>


   <main className="col-start-2 grid grid-cols-[20px_1fr_20px]">
      <h2 className="text-[#f1c40e] col-start-2 text-6xl font-bold py-5">News</h2>
      <section className="flex flex-col col-start-2 gap-20">


        {news.map((item) => (
          <article key={item.id} className="flex  flex-col gap-4">
            <h3 className="info-h3 ">{item.title}</h3>
            <Image 
              src={item.asset.url}
              width={500}
              height={300}
              alt={item.title}
            />
            <p>{item.text}</p>
          </article>

        ))}
        
      </section>

      <NyhedsForm />
      <Slider />
      <KontaktForm />
   </main>


    </>
  );
}
