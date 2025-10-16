"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-miac-white text-miac-green">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="bg-miac-green text-miac-white p-4 flex items-center justify-between shadow-lg"
      >
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
          <Link href="/results" className="mx-2 hover:text-miac-gold transition-colors">Results</Link>
          <Link href="/teams" className="mx-2 hover:text-miac-gold transition-colors">Teams</Link>
          <Link href="/admin" className="mx-2 hover:text-miac-gold transition-colors">Admin</Link>
          <Link href="/about" className="mx-2 hover:text-miac-gold transition-colors">About</Link>
        </nav>
      </motion.header>

      <main className="p-8">
        <motion.section
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <Image
            src="/logo.jpg"
            alt="Kalaveeryam Arts Fest Main Logo"
            width={350}
            height={350}
            priority
            className="mx-auto mb-8 rounded-lg shadow-2xl"
          />
          <h2 className="text-5xl font-bold mb-4 text-miac-green">Event Highlights</h2>
          <p className="text-xl text-gray-600">
            A celebration of art, culture, and talent at Maunathul Islam Arabic College.
          </p>
        </motion.section>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        >
          {[
            { title: "Live Results", desc: "Check out the latest results from all events.", link: "/results" },
            { title: "Team Dashboards", desc: "Follow your team's progress and leaderboards.", link: "/teams" },
            { title: "Admin Portal", desc: "Manage events, candidates, and results.", link: "/admin" },
            { title: "About the Fest", desc: "Learn more about Kalaveeryam and its organizers.", link: "/about" },
          ].map((item, i) => (
            <motion.div key={i} variants={itemVariants} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-2">
              <h3 className="text-2xl font-bold mb-2 text-miac-green">{item.title}</h3>
              <p className="mb-4 text-gray-600">{item.desc}</p>
              <Link href={item.link} className="bg-miac-gold text-miac-green font-bold py-2 px-6 rounded-full transition-transform transform hover:scale-105 inline-block">
                View
              </Link>
            </motion.div>
          ))}
        </motion.section>
      </main>

      <footer className="bg-miac-green text-miac-white text-center p-4 mt-12">
        <p>&copy; 2024 Kalaveeryam Arts Fest. Conducted by SIDRA, MIAC Puthuponnani.</p>
      </footer>
    </div>
  );
}