'use client';

import { useState } from 'react';

export default function ImagePicker({ onChange }) {
  const [previews, setPreviews] = useState([]);

  async function handleFiles(files) {
    const arr = Array.from(files);
    const base64s = await Promise.all(
      arr.map(
        file =>
          new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
          })
      )
    );
    const next = [...previews, ...base64s].slice(0, 8);
    setPreviews(next);
    onChange?.(next);
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Photos</label>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {previews.map((src, i) => (
          <div
            key={i}
            className="relative aspect-video overflow-hidden rounded-md border border-neutral-800 bg-neutral-800/40"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="preview" className="object-cover w-full h-full" />
          </div>
        ))}
        <label className="aspect-video flex items-center justify-center rounded-md border-2 border-dashed border-neutral-700 text-neutral-400 hover:border-brand-600 hover:text-brand-400 cursor-pointer">
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={e => handleFiles(e.target.files)}
          />
          Add
        </label>
      </div>
      <p className="text-xs text-neutral-500 mt-2">Up to 8 images, stored locally on this device.</p>
    </div>
  );
}

