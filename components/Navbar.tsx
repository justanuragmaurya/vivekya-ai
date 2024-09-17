"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);



  return (
    <div className="flex justify-between items-center px-4 sm:px-8 py-2 backdrop-blur-sm sticky top-0 z-10 text-white shadow-lg border-b-[0.5px] border-gray-600">
      <div className="">
        <Link href="/" className="flex items-center justify-center">
        <img src="https://i.pinimg.com/564x/a1/64/ea/a164eafa8fdf2d4cdbbb65ed518a24ed.jpg" alt="Logo" className="w-8 sm:w-10" />
        <h2 className="bg-clip-text text-transparent bg-gradient-to-br  from-[#fafafa] to-[#c3c3c3]  text-lg sm:text-xl font-bold ml-2">Vivekya</h2>
        </Link>
      </div>
      <div className="lg:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-[#fafafa] focus:outline-none p-2"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } lg:flex flex-col lg:flex-row lg:items-center absolute lg:static left-0 top-full w-full lg:w-auto bg-black lg:bg-transparent py-4 lg:py-0 px-4 lg:px-0 gap-4 lg:gap-5`}
      >
        <Link href="/" className="font-semibold bg-clip-text text-transparent bg-gradient-to-b from-[#fafafa] to-[#c3c3c3] hover:scale-105 transition-all">
          Home
        </Link>
        <Link href="/postjob" className="font-semibold bg-clip-text text-transparent bg-gradient-to-b from-[#fafafa] to-[#c3c3c3] hover:scale-105 transition-all">
          Post Job
        </Link>
        <Link href="/jobs" className="font-semibold bg-clip-text text-transparent bg-gradient-to-b from-[#fafafa] to-[#c3c3c3] hover:scale-105 transition-all">
          Jobs
        </Link>
        <Link href="/aboutus" className="font-semibold bg-clip-text text-transparent bg-gradient-to-b from-[#fafafa] to-[#c3c3c3]  hover:scale-105 transition-all">
          About Us
        </Link>
        <Link href="Get Started">
          <Button className="w-full lg:w-auto bg-neutral-200 hover:bg-neutral-300 hover:scale-105 transition-all  text-[#1a1a1a]">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;