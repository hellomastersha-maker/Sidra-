"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { supabase } from '@/lib/supabaseClient';

interface CandidateResult {
  name: string;
  points: number;
}

interface Team {
  id: string;
  name: string;
  leaders: string[];
  total_points: number;
  candidates: CandidateResult[];
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      setLoading(true);

      const { data: teamsData, error: teamsError } = await supabase
        .from('teams')
        .select('id, name, leaders');

      if (teamsError) {
        console.error('Error fetching teams:', teamsError);
        setTeams([]);
        setLoading(false);
        return;
      }

      const { data: resultsData, error: resultsError } = await supabase
        .from('results')
        .select(`
            points,
            candidates (
                id,
                name,
                team_id
            )
        `);

      if (resultsError) {
        console.error('Error fetching results:', resultsError);
      }

      const teamPoints: { [key: string]: number } = {};
      const teamCandidates: { [key: string]: CandidateResult[] } = {};

      if (resultsData) {
        for (const result of resultsData) {
          if (result.candidates) {
            const teamId = result.candidates.team_id;
            const candidateName = result.candidates.name;
            const points = result.points || 0;

            if (!teamPoints[teamId]) {
              teamPoints[teamId] = 0;
              teamCandidates[teamId] = [];
            }

            teamPoints[teamId] += points;

            const existingCandidate = teamCandidates[teamId].find(c => c.name === candidateName);
            if (existingCandidate) {
              existingCandidate.points += points;
            } else {
              teamCandidates[teamId].push({ name: candidateName, points });
            }
          }
        }
      }

      const finalTeams = teamsData.map(team => ({
        ...team,
        total_points: teamPoints[team.id] || 0,
        candidates: (teamCandidates[team.id] || []).sort((a, b) => b.points - a.points),
      }));

      setTeams(finalTeams.sort((a, b) => b.total_points - a.total_points));
      setLoading(false);
    };

    fetchTeamData();
  }, []);

  if (loading) {
    return (
        <div className="min-h-screen bg-miac-white text-miac-green flex justify-center items-center">
            <header className="bg-miac-green text-miac-white p-4 flex items-center justify-between w-full absolute top-0">
              <div className="flex items-center">
                <Image src="/logo.jpg" alt="Kalaveeryam Logo" width={50} height={50} className="rounded-full"/>
                <h1 className="text-2xl font-bold ml-4">Kalaveeryam Arts Fest</h1>
              </div>
              <nav>
                <Link href="/home" className="mx-2 hover:text-miac-gold">Home</Link>
                <Link href="/results" className="mx-2 hover:text-miac-gold">Results</Link>
                <Link href="/admin" className="mx-2 hover:text-miac-gold">Admin</Link>
                <Link href="/about" className="mx-2 hover:text-miac-gold">About</Link>
              </nav>
            </header>
            <p className="text-2xl animate-pulse">Loading Team Data...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-miac-white text-miac-green">
      <header className="bg-miac-green text-miac-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/logo.jpg" alt="Kalaveeryam Logo" width={50} height={50} className="rounded-full"/>
          <h1 className="text-2xl font-bold ml-4">Kalaveeryam Arts Fest</h1>
        </div>
        <nav>
          <Link href="/home" className="mx-2 hover:text-miac-gold">Home</Link>
          <Link href="/results" className="mx-2 hover:text-miac-gold">Results</Link>
          <Link href="/admin" className="mx-2 hover:text-miac-gold">Admin</Link>
          <Link href="/about" className="mx-2 hover:text-miac-gold">About</Link>
        </nav>
      </header>

      <main className="p-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Team Leaderboard</h2>
          <p className="text-lg">Live points, leaderboards, and team details.</p>
        </section>

        <section className="grid md:grid-cols-2 gap-8 text-center mb-12">
          {teams.map((team) => (
            <div key={team.id} className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-3xl font-bold text-miac-green mb-2">{team.name}</h3>
              <p className="text-2xl font-semibold text-miac-gold">Total Points: {team.total_points}</p>
            </div>
          ))}
        </section>

        <section>
          <h3 className="text-3xl font-bold text-center mb-8">Team Details</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {teams.map((team) => (
              <div key={team.id}>
                <h4 className="text-2xl font-bold mb-4 text-center">{team.name}</h4>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <p className="font-bold">Leaders: {team.leaders.join(', ')}</p>
                  <ul className="mt-4">
                    <li className="flex justify-between py-1 border-b font-bold">
                      <span>Candidate</span>
                      <span>Points</span>
                    </li>
                    {team.candidates.length > 0 ? (
                      team.candidates.map((candidate, index) => (
                        <li key={index} className="flex justify-between py-1 border-b">
                          <span>{candidate.name}</span>
                          <span>{candidate.points}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-center py-2">No results yet.</li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-miac-green text-miac-white text-center p-4 mt-12">
        <p>&copy; 2024 Kalaveeryam Arts Fest. All Rights Reserved.</p>
      </footer>
    </div>
  );
}