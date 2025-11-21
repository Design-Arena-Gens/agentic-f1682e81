'use client';

import { useState } from 'react';
import { addPost } from '../../lib/storage';
import ImagePicker from '../../components/ImagePicker';
import { useRouter } from 'next/navigation';

export default function CreatePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    vehicleType: 'Car',
    make: '',
    model: '',
    year: '',
    specs: {
      engine: '',
      horsepower: '',
      transmission: '',
      drivetrain: '',
      color: ''
    },
    mods: '',
    images: [],
    location: { name: '' }
  });

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function updateSpec(field, value) {
    setForm(prev => ({ ...prev, specs: { ...prev.specs, [field]: value } }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const modsArray = form.mods
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);
    addPost({
      title: form.title,
      vehicleType: form.vehicleType,
      make: form.make,
      model: form.model,
      year: form.year,
      specs: form.specs,
      mods: modsArray,
      images: form.images,
      location: form.location?.name ? form.location : undefined
    });
    router.push('/');
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold mb-4">Share Your Build</h1>
      <form onSubmit={handleSubmit} className="card space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              className="input"
              placeholder="e.g., My Widebody WRX"
              value={form.title}
              onChange={e => update('title', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Vehicle Type</label>
            <select
              className="input"
              value={form.vehicleType}
              onChange={e => update('vehicleType', e.target.value)}
            >
              <option>Car</option>
              <option>Bike</option>
              <option>Truck</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Make</label>
            <input className="input" value={form.make} onChange={e => update('make', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Model</label>
            <input className="input" value={form.model} onChange={e => update('model', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Year</label>
            <input
              className="input"
              value={form.year}
              onChange={e => update('year', e.target.value)}
              inputMode="numeric"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location Name (optional)</label>
            <input
              className="input"
              placeholder="City or meetup spot"
              value={form.location.name}
              onChange={e => update('location', { name: e.target.value })}
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Engine</label>
            <input className="input" value={form.specs.engine} onChange={e => updateSpec('engine', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Horsepower</label>
            <input className="input" value={form.specs.horsepower} onChange={e => updateSpec('horsepower', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Transmission</label>
            <input className="input" value={form.specs.transmission} onChange={e => updateSpec('transmission', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Drivetrain</label>
            <input className="input" value={form.specs.drivetrain} onChange={e => updateSpec('drivetrain', e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1">Color</label>
            <input className="input" value={form.specs.color} onChange={e => updateSpec('color', e.target.value)} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mods (one per line)</label>
          <textarea
            className="input min-h-[120px]"
            value={form.mods}
            onChange={e => update('mods', e.target.value)}
            placeholder="Exhaust&#10;Coilovers&#10;Tune"
          />
        </div>

        <ImagePicker onChange={imgs => update('images', imgs)} />

        <div className="flex items-center gap-3">
          <button className="btn" type="submit">
            Post
          </button>
          <button
            className="btn !bg-neutral-800 hover:!bg-neutral-700"
            type="button"
            onClick={() => router.push('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

