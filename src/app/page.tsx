"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Typewriter } from "react-simple-typewriter";
import { useState, useEffect } from "react";

export default function Intro() {
  const router = useRouter();
  const [showButton, setShowButton] = useState(false);

  const handleTypingDone = () => {
    setTimeout(() => {
      setShowButton(true);
    }, 500); // Short delay before showing the button
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-miac-white text-miac-green">
      <div className="text-center">
        <Image
          src="/logo.jpg"
          alt="Kalaveeryam Arts Fest Logo"
          width={300}
          height={300}
          priority
          className="mx-auto mb-8 rounded-full"
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          <Typewriter
            words={["Welcome to Kalaveeryam – MIAC Arts Fest"]}
            loop={1}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
            onLoopDone={handleTypingDone}
          />
        </h1>
        {showButton && (
          <button
            onClick={() => router.push("/home")}
            className="bg-miac-gold text-miac-green font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 animate-fade-in"
          >
            Enter
          </button>
        )}
      </div>
    </div>
  );
}

// Add a simple fade-in animation to globals.css if it's not there
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// .animate-fade-in { animation: fadeIn 1s ease-in-out; }