"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { supabase } from '@/lib/supabaseClient';
import { motion } from "framer-motion";

interface Result {
  id: string;
  eventName: string;
  candidateName: string;
  teamName: string;
  category: string;
  points: number | null;
}

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [filteredResults, setFilteredResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    event: '',
    candidate: '',
    team: '',
    category: '',
  });

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('results')
        .select(`
          id,
          points,
          events ( name, category ),
          candidates ( name, teams ( name ) )
        `);

      if (error) {
        console.error('Error fetching results:', error);
        setResults([]);
      } else {
        const formattedResults = data.map((result: any) => ({
          id: result.id,
          eventName: result.events.name,
          candidateName: result.candidates.name,
          teamName: result.candidates.teams.name,
          category: result.events.category,
          points: result.points,
        }));
        setResults(formattedResults);
        setFilteredResults(formattedResults);
      }
      setLoading(false);
    };

    fetchResults();
  }, []);

  useEffect(() => {
    let tempResults = results;

    if (filters.event) {
      tempResults = tempResults.filter(r => r.eventName.toLowerCase().includes(filters.event.toLowerCase()));
    }
    if (filters.candidate) {
      tempResults = tempResults.filter(r => r.candidateName.toLowerCase().includes(filters.candidate.toLowerCase()));
    }
    if (filters.team) {
      tempResults = tempResults.filter(r => r.teamName.toLowerCase().includes(filters.team.toLowerCase()));
    }
    if (filters.category) {
      tempResults = tempResults.filter(r => r.category.toLowerCase().includes(filters.category.toLowerCase()));
    }

    setFilteredResults(tempResults);
  }, [filters, results]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const rowVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-miac-white text-miac-green">
       <motion.header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 120 }} className="bg-miac-green text-miac-white p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center">
          <Image src="/logo.jpg" alt="Kalaveeryam Logo" width={50} height={50} className="rounded-full"/>
          <h1 className="text-2xl font-bold ml-4">Kalaveeryam Arts Fest</h1>
        </div>
        <nav>
            <Link href="/home" className="mx-2 hover:text-miac-gold transition-colors">Home</Link>
            <Link href="/teams" className="mx-2 hover:text-miac-gold transition-colors">Teams</Link>
            <Link href="/admin" className="mx-2 hover:text-miac-gold transition-colors">Admin</Link>
            <Link href="/about" className="mx-2 hover:text-miac-gold transition-colors">About</Link>
        </nav>
      </motion.header>

      <main className="p-8">
        <motion.section initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Event Results</h2>
          <p className="text-lg text-gray-600">Live results from all competitions.</p>
        </motion.section>

        <motion.section initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 0.2}} className="mb-8 p-4 bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input type="text" name="event" placeholder="Filter by event..." value={filters.event} onChange={handleFilterChange} className="p-2 border rounded w-full focus:ring-2 focus:ring-miac-gold"/>
            <input type="text" name="candidate" placeholder="Filter by candidate..." value={filters.candidate} onChange={handleFilterChange} className="p-2 border rounded w-full focus:ring-2 focus:ring-miac-gold"/>
            <input type="text" name="team" placeholder="Filter by team..." value={filters.team} onChange={handleFilterChange} className="p-2 border rounded w-full focus:ring-2 focus:ring-miac-gold"/>
            <input type="text" name="category" placeholder="Filter by category..." value={filters.category} onChange={handleFilterChange} className="p-2 border rounded w-full focus:ring-2 focus:ring-miac-gold"/>
          </div>
        </section>

        <motion.section initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 0.4}}>
          <div className="overflow-x-auto">
            <motion.table variants={tableVariants} initial="hidden" animate="visible" className="min-w-full bg-white border rounded-lg shadow-md">
              <thead className="bg-miac-green text-miac-white">
                <tr>
                  <th className="py-3 px-4 border-b">Event</th>
                  <th className="py-3 px-4 border-b">Candidate</th>
                  <th className="py-3 px-4 border-b">Team</th>
                  <th className="py-3 px-4 border-b">Category</th>
                  <th className="py-3 px-4 border-b">Points</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                    <tr><td colSpan={5} className="py-4 px-4 text-center">Loading...</td></tr>
                ) : filteredResults.length > 0 ? (
                  filteredResults.map((result) => (
                    <motion.tr variants={rowVariants} key={result.id} className="hover:bg-miac-gold/10">
                      <td className="py-2 px-4 border-b text-center">{result.eventName}</td>
                      <td className="py-2 px-4 border-b text-center">{result.candidateName}</td>
                      <td className="py-2 px-4 border-b text-center">{result.teamName}</td>
                      <td className="py-2 px-4 border-b text-center">{result.category}</td>
                      <td className="py-2 px-4 border-b text-center font-bold">{result.points ?? 'N/A'}</td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-4 px-4 text-center">No results found.</td>
                  </tr>
                )}
              </tbody>
            </motion.table>
          </div>
        </motion.section>
      </main>

      <footer className="bg-miac-green text-miac-white text-center p-4 mt-12">
        <p>&copy; 2024 Kalaveeryam Arts Fest. All Rights Reserved.</p>
      </footer>
    </div>
  );
}