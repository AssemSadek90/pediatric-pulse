"use client"
import { Vortex } from "@/components/ui/vortex";
import Image from "next/image";
export default function Home() {
  return (
    <main className="">
      <div className="w-100 mx-auto h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={120}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        <div>
          <Image
            className="w-auto h-80"
            src="/logoBig.png"
            alt="logo"
            width={1080}
            height={1} 
          />
        </div>
        <p className="text-orange-200 text-sm opacity-80 md:text-2xl max-w-xl mt-6 text-center">
          We Provide High Quality Care for Your Child
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <button className="px-4 opacity-80 border-2 border-orange-200 text-orange-200 rounded-md h-full hover:bg-orange-200 hover:text-black hover:transition duration-150 ease-linear">
            Contact Us
          </button>
          <button className="px-4 py-2 text-white ">About Us</button>
        </div>
      </Vortex>
    </div>
    </main>
  );
}
