import './globals.css';
import Link from 'next/link';
import NavBar from '../components/NavBar';

export const metadata = {
  title: 'Gearheads',
  description: 'Share your builds, specs, mods, and meetups'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="min-h-screen bg-neutral-950 text-neutral-100">
        <header className="sticky top-0 z-50 bg-neutral-900 border-b border-neutral-800">
          <NavBar />
        </header>
        <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
        <footer className="max-w-5xl mx-auto px-4 py-6 text-sm text-neutral-400">
          Built for car and bike enthusiasts. Keep it respectful and fun.
        </footer>
      </body>
    </html>
  );
}

