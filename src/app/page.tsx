"use client";

import Image from "next/image";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Intro() {
  const [showButton, setShowButton] = useState(false);

  const handleTypingDone = () => {
    setShowButton(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-miac-white text-miac-green">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <Image
          src="/logo.jpg"
          alt="Kalaveeryam Arts Fest Logo"
          width={300}
          height={300}
          priority
          className="mx-auto mb-8 rounded-full shadow-lg"
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-8 h-20">
          <Typewriter
            words={["Welcome to Kalaveeryam – MIAC Arts Fest"]}
            loop={1}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            delaySpeed={1000}
            onLoopDone={handleTypingDone}
          />
        </h1>
        {showButton && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link href="/home"
              className="bg-miac-gold text-miac-green font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Enter
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}