import Image from "next/image";
import { getNews } from "../lib/dal";

export default async function Home() {

  const news = await getNews();
  return (
    <div className="grid grid-cols-[20px_1fr_20px]">
  <header className="relative min-h-102.5 w-full bg-[url('/assets/heroimg.png')] bg-cover bg-center grid grid-cols-subgrid justify-between items-end col-span-full">

    <div className="col-start-2 mb-10">
      <h1 className="text-4xl mb-3 font-bold text-[#f1c40e]">Welcome to Belive Fitness</h1>

      <div className=" flex gap-4 ">
        <button className=" btn w-28.25 h-13.25 ">classes</button>
        <button className="btn w-28.25 h-13.25">log in</button>
      </div>
    </div>

  </header>


   <main className="col-start-2">
      <h2 className="text-[#f1c40e] text-6xl font-bold py-5">News</h2>
      <section className="flex flex-col gap-20">


        {news.map((item) => (
          <article key={item.id} className="flex flex-col gap-4">
            <h3 className="info-h3">{item.title}</h3>
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
   </main>
   </div>
  );
}
