"use client";

import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';

// Define interfaces for our data structures
interface Candidate {
  id: string;
  name: string;
  team_id: string;
  image_url?: string;
  teams?: { name: string };
}

interface Event {
  id: string;
  name: string;
  category: string;
}

interface Result {
    id: string;
    event_id: string;
    candidate_id: string;
    points: number | null;
    events?: { name: string };
    candidates?: { name: string };
}

interface Team {
  id:string;
  name: string;
}

const AdminDashboard = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  const [newCandidate, setNewCandidate] = useState({ name: '', team_id: '' });
  const [newEvent, setNewEvent] = useState({ name: '', category: '' });
  const [newResult, setNewResult] = useState({ event_id: '', candidate_id: '', points: '' });
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingResult, setEditingResult] = useState<Result | null>(null);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: candidatesData } = await supabase.from('candidates').select('*, teams(name)');
    const { data: eventsData } = await supabase.from('events').select('*');
    const { data: resultsData } = await supabase.from('results').select('*, events(name), candidates(name)');
    const { data: teamsData } = await supabase.from('teams').select('*');

    setCandidates(candidatesData || []);
    setEvents(eventsData || []);
    setResults(resultsData || []);
    setTeams(teamsData || []);
  };

  const handleAddOrUpdateCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCandidate.name || !newCandidate.team_id) return;

    if (editingCandidate) {
      await supabase.from('candidates').update({ name: newCandidate.name, team_id: newCandidate.team_id }).eq('id', editingCandidate.id);
      setEditingCandidate(null);
    } else {
      await supabase.from('candidates').insert([newCandidate]);
    }

    setNewCandidate({ name: '', team_id: '' });
    fetchData();
  };

  const handleDeleteCandidate = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      await supabase.from('candidates').delete().eq('id', id);
      fetchData();
    }
  };

  const handleAddOrUpdateEvent = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newEvent.name || !newEvent.category) return;

      if (editingEvent) {
        await supabase.from('events').update({ name: newEvent.name, category: newEvent.category }).eq('id', editingEvent.id);
        setEditingEvent(null);
      } else {
        await supabase.from('events').insert([newEvent]);
      }
      setNewEvent({ name: '', category: '' });
      fetchData();
  };

  const handleDeleteEvent = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      await supabase.from('events').delete().eq('id', id);
      fetchData();
    }
  };

  const handleAddOrUpdateResult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResult.event_id || !newResult.candidate_id || !newResult.points) return;
    const resultData = { ...newResult, points: parseInt(newResult.points) };

    if (editingResult) {
        await supabase.from('results').update(resultData).eq('id', editingResult.id);
        setEditingResult(null);
    } else {
        await supabase.from('results').insert([resultData]);
    }

    setNewResult({ event_id: '', candidate_id: '', points: '' });
    fetchData();
  };

  const handleDeleteResult = async (id: string) => {
    if (window.confirm('Are you sure?')) {
        await supabase.from('results').delete().eq('id', id);
        fetchData();
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) return;
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) setMessage(`Error: ${error.message}`);
    else setMessage('Password updated!');
    setNewPassword('');
  };

  const handleImageUpload = async (candidateId: string) => {
      if (!imageFile) return;

      const fileName = `${candidateId}-${Date.now()}`;
      await supabase.storage.from('candidate_images').upload(fileName, imageFile);
      const { data: { publicUrl } } = supabase.storage.from('candidate_images').getPublicUrl(fileName);
      await supabase.from('candidates').update({ image_url: publicUrl }).eq('id', candidateId);

      setImageFile(null);
      fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-miac-green text-center mb-10">Admin Dashboard</h1>
      {message && <p className="text-center text-miac-gold bg-miac-green p-3 rounded-md my-4">{message}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Candidate Management */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">{editingCandidate ? 'Edit Candidate' : 'Add Candidate'}</h2>
          <form onSubmit={handleAddOrUpdateCandidate}>
            <input type="text" placeholder="Candidate Name" value={newCandidate.name} onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })} className="w-full p-2 mb-2 border rounded" />
            <select value={newCandidate.team_id} onChange={(e) => setNewCandidate({ ...newCandidate, team_id: e.target.value })} className="w-full p-2 mb-4 border rounded">
              <option value="">Select Team</option>
              {teams.map(team => <option key={team.id} value={team.id}>{team.name}</option>)}
            </select>
            <button type="submit" className="w-full bg-miac-green text-white p-2 rounded">{editingCandidate ? 'Update' : 'Add'}</button>
            {editingCandidate && <button onClick={() => { setEditingCandidate(null); setNewCandidate({ name: '', team_id: ''}); }} className="w-full bg-gray-500 text-white p-2 rounded mt-2">Cancel</button>}
          </form>
          <ul className="mt-4 space-y-2">
            {candidates.map(c => (
              <li key={c.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span>{c.name} ({c.teams?.name})</span>
                <div>
                  <button onClick={() => { setEditingCandidate(c); setNewCandidate({ name: c.name, team_id: c.team_id }); }} className="text-sm bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                  <button onClick={() => handleDeleteCandidate(c.id)} className="text-sm bg-red-500 text-white px-2 py-1 rounded">Del</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Event Management */}
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">{editingEvent ? 'Edit Event' : 'Add Event'}</h2>
            <form onSubmit={handleAddOrUpdateEvent}>
                <input type="text" placeholder="Event Name" value={newEvent.name} onChange={e => setNewEvent({...newEvent, name: e.target.value})} className="w-full p-2 mb-2 border rounded"/>
                <input type="text" placeholder="Category" value={newEvent.category} onChange={e => setNewEvent({...newEvent, category: e.target.value})} className="w-full p-2 mb-4 border rounded"/>
                <button type="submit" className="w-full bg-miac-green text-white p-2 rounded">{editingEvent ? 'Update' : 'Add'}</button>
                {editingEvent && <button onClick={() => { setEditingEvent(null); setNewEvent({ name: '', category: ''}); }} className="w-full bg-gray-500 text-white p-2 rounded mt-2">Cancel</button>}
            </form>
            <ul className="mt-4 space-y-2">
              {events.map(e => (
                <li key={e.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span>{e.name} ({e.category})</span>
                  <div>
                    <button onClick={() => { setEditingEvent(e); setNewEvent({ name: e.name, category: e.category }); }} className="text-sm bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                    <button onClick={() => handleDeleteEvent(e.id)} className="text-sm bg-red-500 text-white px-2 py-1 rounded">Del</button>
                  </div>
                </li>
              ))}
            </ul>
        </div>

        {/* Result Management */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">{editingResult ? 'Edit Result' : 'Add Result'}</h2>
          <form onSubmit={handleAddOrUpdateResult}>
            <select value={newResult.event_id} onChange={e => setNewResult({...newResult, event_id: e.target.value})} className="w-full p-2 mb-2 border rounded">
                <option value="">Select Event</option>
                {events.map(event => <option key={event.id} value={event.id}>{event.name}</option>)}
            </select>
            <select value={newResult.candidate_id} onChange={e => setNewResult({...newResult, candidate_id: e.target.value})} className="w-full p-2 mb-2 border rounded">
                <option value="">Select Candidate</option>
                {candidates.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input type="number" placeholder="Points" value={newResult.points} onChange={e => setNewResult({...newResult, points: e.target.value})} className="w-full p-2 mb-4 border rounded"/>
            <button type="submit" className="w-full bg-miac-gold text-miac-green p-2 rounded">{editingResult ? 'Update' : 'Add'}</button>
             {editingResult && <button onClick={() => { setEditingResult(null); setNewResult({ event_id: '', candidate_id: '', points: ''}); }} className="w-full bg-gray-500 text-white p-2 rounded mt-2">Cancel</button>}
          </form>
           <ul className="mt-4 space-y-2">
              {results.map(r => (
                <li key={r.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span>{r.events?.name} - {r.candidates?.name}: {r.points} pts</span>
                  <div>
                    <button onClick={() => { setEditingResult(r); setNewResult({ event_id: r.event_id, candidate_id: r.candidate_id, points: String(r.points) }); }} className="text-sm bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                    <button onClick={() => handleDeleteResult(r.id)} className="text-sm bg-red-500 text-white px-2 py-1 rounded">Del</button>
                  </div>
                </li>
              ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;