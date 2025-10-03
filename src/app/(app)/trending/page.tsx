'use client';
import PostCard from '@/components/post-card';
import { samplePosts, sampleUsers } from '@/lib/data';
import type { Post } from '@/lib/types';
import { Flame } from 'lucide-react';

export default function TrendingPage() {
    
  // In a real app, you'd fetch posts from the last 24 hours and sort by likes
  const trendingPosts: Post[] = [...samplePosts]
    .sort((a, b) => b.likes.length - a.likes.length)
    .map(post => ({
      ...post,
      user: sampleUsers.find(u => u.uid === post.uid),
      commentCount: 2 // Mock comment count
    }));

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Flame className="w-10 h-10 text-primary" />
        <h1 className="text-4xl font-headline text-foreground">Trending on TuneShare</h1>
      </div>
      
      <h2 className="text-2xl font-headline mt-12 mb-6">Top Tracks Right Now</h2>
      <div className="space-y-6">
        {trendingPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
