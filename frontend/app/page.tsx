"use client"
import { SparklesCore } from "@/components/ui/sparkles";
import { HeroParallax } from "@/components/ui/hero-parallax";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";

interface Doctor {
  title: string;
  link: string;
  thumbnail: string;
}

export default function Home() {
  const [doctors, setDoctors] = useState([] as Doctor[]);
  const headers = {
    "Content-Type": "application/json"
  };
  async function fetchDoctorList() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_NAME}/doctorlist`,
      { headers }
    );
    if (!response.ok) {
      console.log("ERRORRR")
    }
    const data = await response.json();
    setDoctors(data);
  }

  useEffect(() => {
    fetchDoctorList();
  }, []);
  return (
    <>
    <Navbar />
    {doctors && <main className="w-screen h-screen">
      <div className="mx-auto h-screen">
      <HeroParallax products={doctors} />
      <div className="h-[40rem] relative w-screen bg-gray-100 flex flex-col items-center overflow-hidden">
        <div className="w-screen absolute inset-0 h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={20}
            className="w-full h-full"
            particleColor="#fb923c"
          />
        </div>
        <div>
          <Image
            className="w-auto h-80"
            src="/logoBig.png"
            alt="logo"
            width={1080}
            height={1} 
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <Link href="/ContactUs">
            <button className="px-4 py-2 opacity-80 border-orange-200 text-black rounded-md h-full hover:bg-orange-200 hover:text-black hover:transition duration-150 ease-linear">
              Contact Us
            </button>
          </Link>
          <Link href="/Signup">
            <button className="px-4 py-2 opacity-80 border-orange-200 text-black rounded-md h-full hover:bg-orange-200 hover:text-black hover:transition duration-150 ease-linear">Sign Up</button>
          </Link>     
        </div>
      </div>
    </div>
    </main>}
    </>
  );
}
