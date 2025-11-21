'use client';

import { useEffect, useState } from 'react';
import { getProfile, saveProfile } from '../../lib/storage';

export default function ProfilePage() {
  const [profile, setProfile] = useState(getProfile());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setProfile(getProfile());
  }, []);

  function update(field, value) {
    setProfile(prev => ({ ...prev, [field]: value }));
  }

  function handleSave() {
    saveProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="text-2xl font-semibold">Your Profile</h1>
      <div className="card space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input className="input" value={profile.username} onChange={e => update('username', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea className="input min-h-[120px]" value={profile.bio} onChange={e => update('bio', e.target.value)} />
        </div>
        <div className="flex items-center gap-3">
          <button className="btn" onClick={handleSave}>Save</button>
          {saved && <span className="text-sm text-brand-400">Saved</span>}
        </div>
      </div>
      <div className="text-sm text-neutral-400">
        Your profile and posts are stored locally in your browser.
      </div>
    </div>
  );
}

