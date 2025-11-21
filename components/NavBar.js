'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavLink({ href, label }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        active ? 'bg-brand-600 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
      }`}
    >
      {label}
    </Link>
  );
}

export default function NavBar() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
      <Link href="/" className="text-xl font-semibold text-white">
        Gearheads
      </Link>
      <nav className="flex items-center gap-1">
        <NavLink href="/" label="Feed" />
        <NavLink href="/create" label="Create" />
        <NavLink href="/meetups" label="Meetups" />
        <NavLink href="/connect" label="Connect" />
        <NavLink href="/profile" label="Profile" />
      </nav>
    </div>
  );
}

