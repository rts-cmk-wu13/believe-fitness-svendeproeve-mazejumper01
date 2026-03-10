

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();
  const images = ["/assets/bg1.png", "/assets/bg2.png"];
  const [bgImage, setBgImage] = useState(images[0]);
  const [showContent, setShowContent] = useState(false);

  // Vælg tilfældigt billede
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setBgImage(images[randomIndex]);

    // Sæt animationen til at starte efter 700ms
    const timer = setTimeout(() => setShowContent(true), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="w-screen h-screen bg-cover bg-center grid grid-cols-[20px_1fr_20px]  pb-10 items-end"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div
        className={` transition-all duration-700 grid grid-rows-3 col-start-2 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <h1 className="text-6xl font-bold w-[7ch] text-[#f1c40e] mb-4">
          Belive fitness
        </h1>
        <button
          onClick={() => router.push("/home")}
          className="btn row-start-3 w-45 mx-auto max-h-12 text-sm"
        >
          start training
        </button>
      </div>
    </div>
  );
}