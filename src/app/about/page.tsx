"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

  return (
    <div className="min-h-screen bg-miac-white text-miac-green">
      <motion.header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 120 }} className="bg-miac-green text-miac-white p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center">
          <Image
            src="/logo.jpg"
            alt="Kalaveeryam Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold ml-4">Kalaveeryam Arts Fest</h1>
        </div>
        <nav>
          <Link href="/home" className="mx-2 hover:text-miac-gold transition-colors">Home</Link>
          <Link href="/results" className="mx-2 hover:text-miac-gold transition-colors">Results</Link>
          <Link href="/teams" className="mx-2 hover:text-miac-gold transition-colors">Teams</Link>
          <Link href="/admin" className="mx-2 hover:text-miac-gold transition-colors">Admin</Link>
        </nav>
      </motion.header>

      <main className="p-8">
        <motion.section initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">About Kalaveeryam</h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-600">
            Kalaveeryam is the annual arts festival of Maunathul Islam Arabic College, Puthuponnani, organized by the class union SIDRA under the guidance of class teacher KP Salman Hudawi. It's a vibrant platform for students to showcase their artistic talents and compete in a spirit of healthy rivalry.
          </p>
        </motion.section>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-2 gap-12">
            <motion.section variants={itemVariants} className="mb-12 text-center">
              <h3 className="text-3xl font-bold mb-8">The Organizers</h3>
              <div className="p-6 bg-white rounded-lg shadow-xl">
                  <p className="text-2xl font-semibold">SIDRA (Class Union)</p>
                  <p className="text-md text-gray-500 mb-4">Official Conductors of Kalaveeryam</p>
                  <p className="text-md mt-2">Under the supervision of</p>
                  <p className="text-2xl font-semibold text-miac-gold">KP Salman Hudawi</p>
              </div>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h3 className="text-3xl font-bold text-center mb-8">Competing Teams</h3>
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-lg shadow-xl">
                  <h4 className="text-2xl font-bold mb-2">MAMLUK</h4>
                  <p className="font-semibold text-gray-700">Leaders: Muhammed Sinan V, Mehabin</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-xl">
                  <h4 className="text-2xl font-bold mb-2">SELJUK</h4>
                  <p className="font-semibold text-gray-700">Leaders: Huwais, Suhan</p>
                </div>
              </div>
            </motion.section>
        </motion.div>
      </main>

      <footer className="bg-miac-green text-miac-white text-center p-4 mt-12">
        <p>&copy; 2024 Kalaveeryam Arts Fest. All Rights Reserved.</p>
      </footer>
    </div>
  );
}