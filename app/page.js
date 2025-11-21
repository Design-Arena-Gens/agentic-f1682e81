'use client';

import { useEffect, useState } from 'react';
import { deletePost, getPosts } from '../lib/storage';
import PostCard from '../components/PostCard';
import Link from 'next/link';

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  function handleDelete(id) {
    deletePost(id);
    setPosts(getPosts());
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Community Feed (Local)</h1>
        <Link href="/create" className="btn">
          Share a Build
        </Link>
      </div>
      {posts.length === 0 ? (
        <div className="card">
          <p className="text-neutral-300">
            No posts yet. Be the first to{' '}
            <Link href="/create" className="text-brand-400 underline">
              share your ride
            </Link>
            !
          </p>
        </div>
      ) : (
        posts.map(p => <PostCard key={p.id} post={p} onDelete={handleDelete} />)
      )}
    </div>
  );
}

