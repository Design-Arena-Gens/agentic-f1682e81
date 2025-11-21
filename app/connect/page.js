'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { exportAll, importAll, getProfile } from '../../lib/storage';
import QRCode from 'qrcode';

function encode(data) {
  try {
    return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
  } catch {
    return '';
  }
}

function decode(str) {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(str))));
  } catch {
    return null;
  }
}

export default function ConnectPage() {
  const [blob, setBlob] = useState('');
  const [message, setMessage] = useState('');
  const canvasRef = useRef(null);
  const profile = getProfile();

  useEffect(() => {
    const data = exportAll();
    const encoded = encode(data);
    setBlob(encoded);
  }, []);

  useEffect(() => {
    // Render QR for profile only (smaller)
    const encoded = encode({ profile: getProfile(), v: 1 });
    if (canvasRef.current && encoded) {
      QRCode.toCanvas(canvasRef.current, encoded, { width: 220 }, err => {
        if (err) console.error(err);
      });
    }
  }, [profile.username, profile.bio]);

  function handleImport() {
    const data = decode(blob);
    if (!data) {
      setMessage('Invalid data');
      return;
    }
    const ok = importAll(data);
    setMessage(ok ? 'Imported successfully' : 'Import failed');
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-semibold">Connect & Share</h1>

      <div className="card space-y-3">
        <h2 className="font-medium">Export / Import Everything</h2>
        <p className="text-sm text-neutral-400">
          Copy this code to share your posts and meetups with friends. They can paste it to import.
        </p>
        <textarea
          className="input min-h-[160px]"
          value={blob}
          onChange={e => setBlob(e.target.value)}
        />
        <div className="flex items-center gap-3">
          <button className="btn" onClick={() => navigator.clipboard.writeText(blob)}>
            Copy
          </button>
          <button className="btn !bg-neutral-800 hover:!bg-neutral-700" onClick={handleImport}>
            Import
          </button>
          {message && <span className="text-sm text-brand-400">{message}</span>}
        </div>
      </div>

      <div className="card space-y-3">
        <h2 className="font-medium">Share Your Profile (QR)</h2>
        <p className="text-sm text-neutral-400">
          Scan this QR to add your profile info on another device.
        </p>
        <canvas ref={canvasRef} className="bg-white rounded-md w-[220px] h-[220px]" />
      </div>
    </div>
  );
}

