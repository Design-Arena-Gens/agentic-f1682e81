'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const MapContainer = dynamic(
  async () => (await import('react-leaflet')).MapContainer,
  { ssr: false }
);
const TileLayer = dynamic(async () => (await import('react-leaflet')).TileLayer, { ssr: false });
const Marker = dynamic(async () => (await import('react-leaflet')).Marker, { ssr: false });
const Popup = dynamic(async () => (await import('react-leaflet')).Popup, { ssr: false });

export default function MeetupMap({ meetups = [], onAdd }) {
  const [position, setPosition] = useState([37.7749, -122.4194]); // default SF

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      pos => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {}
    );
  }, []);

  function handleClick(e) {
    if (!onAdd) return;
    const { lat, lng } = e.latlng;
    const name = prompt('Meetup name?');
    if (!name) return;
    const when = prompt('When? (e.g., Friday 7pm)');
    const notes = prompt('Notes? (optional)') || '';
    onAdd({
      title: name,
      description: notes,
      time: when || '',
      lat,
      lng
    });
  }

  return (
    <MapContainer
      center={position}
      zoom={12}
      scrollWheelZoom
      style={{ height: 480, width: '100%' }}
      whenCreated={map => {
        map.on('click', handleClick);
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {meetups.map(m => (
        <Marker key={m.id} position={[m.lat, m.lng]}>
          <Popup>
            <div className="space-y-1">
              <div className="font-medium">{m.title}</div>
              {m.time && <div className="text-sm">{m.time}</div>}
              {m.description && <div className="text-sm text-neutral-300">{m.description}</div>}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

