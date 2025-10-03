'use client';
import PostCard from '@/components/post-card';
import { samplePosts, sampleUsers } from '@/lib/data';
import type { Post } from '@/lib/types';

export default function FeedPage() {
  // In a real app, this would use React state and fetch data from Firestore.
  const posts: Post[] = samplePosts.map(post => {
    const user = sampleUsers.find(u => u.uid === post.uid);
    return {
      ...post,
      user: user,
      commentCount: 2, // Mock comment count
    };
  });

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-headline mb-8 text-foreground">Community Feed</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
