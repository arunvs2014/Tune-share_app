'use client';
import { useEffect, useState } from 'react';
import PostCard from '@/components/post-card';
import type { Post } from '@/lib/types';
import { getPosts } from '@/lib/firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

function PostSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
       <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
      </div>
    </div>
  )
}


export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-headline mb-8 text-foreground">Community Feed</h1>
      <div className="space-y-6">
        {loading ? (
           <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
           </>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <p className="text-center text-muted-foreground py-8">No posts yet. Be the first to share a tune!</p>
        )}
      </div>
    </div>
  );
}
