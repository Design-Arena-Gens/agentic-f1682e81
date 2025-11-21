'use client';

import { useEffect, useState } from 'react';
import MeetupMap from '../../components/MeetupMap';
import { addMeetup, deleteMeetup, getMeetups } from '../../lib/storage';

export default function MeetupsPage() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    setMeetups(getMeetups());
  }, []);

  function handleAdd(m) {
    addMeetup(m);
    setMeetups(getMeetups());
  }

  function handleDelete(id) {
    deleteMeetup(id);
    setMeetups(getMeetups());
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Meetup Spots</h1>
      </div>
      <div className="card">
        <p className="text-neutral-300 mb-3">
          Click anywhere on the map to add a meetup. Provide a name, time, and notes. These are
          saved locally on your device.
        </p>
        <MeetupMap meetups={meetups} onAdd={handleAdd} />
      </div>
      <div className="card">
        <h2 className="font-medium mb-2">Your Meetups</h2>
        {meetups.length === 0 ? (
          <p className="text-neutral-400">No meetups yet.</p>
        ) : (
          <ul className="divide-y divide-neutral-800">
            {meetups.map(m => (
              <li key={m.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{m.title}</div>
                  <div className="text-sm text-neutral-400">
                    {m.time || 'Time TBA'} ? {m.lat.toFixed(4)}, {m.lng.toFixed(4)}
                  </div>
                  {m.description && <div className="text-sm text-neutral-300">{m.description}</div>}
                </div>
                <button className="btn !px-3 !py-1.5" onClick={() => handleDelete(m.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

