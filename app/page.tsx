import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export default function Home() {
  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center w-1/2 text-center">
      <h1 className="text-6xl bg-gradient-to-b from-[#fafafa] to-[#e0e0e0] bg-clip-text text-transparent font-bold">Speed up your <br /><span className="bg-gradient-to-b from-red-500 to-orange-500 bg-clip-text text-transparent font-bold">hiring process with</span> <br /><span className="">Vivekya AI</span></h1>
      <p className="text-sm text-gray-500 w-2/3 mt-5">Vivekya AI is a cutting-edge AI platform that streamlines the hiring process for businesses of all sizes. Our advanced algorithms and machine learning models help you identify the best candidates quickly and efficiently.</p>
      </div>
      <Button className="bg-gradient-to-b from-red-500 to-orange-500 text-white rounded-full px-8 py-4 font-bold mt-10">Get Started</Button>
    </div>
    </>
  );
}