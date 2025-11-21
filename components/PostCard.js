'use client';

import Image from 'next/image';

export default function PostCard({ post, onDelete }) {
  const { id, createdAt, title, vehicleType, make, model, year, specs, mods, images, location } =
    post;
  const created = new Date(createdAt);
  return (
    <article className="card mb-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {title || `${year || ''} ${make || ''} ${model || ''}`.trim()}
          </h3>
          <p className="text-sm text-neutral-400">
            {vehicleType ? vehicleType : 'Vehicle'} ? {created.toLocaleString()}
            {location?.name ? ` ? ${location.name}` : ''}
          </p>
        </div>
        {onDelete && (
          <button className="btn !px-3 !py-1.5" onClick={() => onDelete(id)}>
            Delete
          </button>
        )}
      </div>
      {images && images.length > 0 && (
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {images.map((src, i) => (
            <div key={i} className="relative aspect-video overflow-hidden rounded-md border border-neutral-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="vehicle" className="object-cover w-full h-full" />
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 grid sm:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-1">Specs</h4>
          <ul className="text-sm text-neutral-300 space-y-1">
            {Object.entries(specs || {}).map(([k, v]) => (
              <li key={k}>
                <span className="text-neutral-500">{k}: </span>
                <span>{String(v)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-1">Mods</h4>
          <ul className="text-sm text-neutral-300 list-disc pl-5 space-y-1">
            {(mods || []).map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

