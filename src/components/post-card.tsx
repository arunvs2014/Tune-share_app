'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { Post } from '@/lib/types';
import { Heart, MessageCircle, Link as LinkIcon, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';
import CommentsSheet from './comments-sheet';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(user ? post.likes.includes(user.uid) : false);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    // In a real app, this would be an atomic update to Firestore
    if (isLiked) {
      setLikeCount(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikeCount(prev => prev + 1);
      setIsLiked(true);
    }
  };

  return (
    <>
      <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex-row gap-3 items-center p-4">
          <Avatar>
            <AvatarImage src={post.user?.profilePic} alt={post.user?.name} />
            <AvatarFallback>{post.user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{post.user?.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto">
            <MoreHorizontal />
          </Button>
        </CardHeader>
        <CardContent className="p-0 flex flex-col sm:flex-row gap-4">
            <div className="sm:w-1/3 w-full p-4 pt-0 sm:p-4 sm:pr-0">
                <div className="aspect-square relative rounded-md overflow-hidden">
                    <Image
                        src={post.coverArt}
                        alt={`${post.songName} by ${post.artist}`}
                        fill
                        className="object-cover"
                        data-ai-hint="abstract music"
                    />
                </div>
                <div className="mt-2 text-center">
                    <h3 className="font-bold text-lg font-headline">{post.songName}</h3>
                    <p className="text-muted-foreground text-sm">{post.artist}</p>
                </div>
            </div>
          <div className="sm:w-2/3 p-4 pt-0 sm:pt-4">
            <p className="font-body text-base whitespace-pre-wrap">{post.caption}</p>
          </div>
        </CardContent>
        <CardFooter className="p-4 flex justify-between items-center">
            <div className="flex gap-4">
                <Button variant="ghost" size="sm" onClick={handleLike} className="flex items-center gap-2">
                    <Heart className={`h-5 w-5 ${isLiked ? 'text-red-500 fill-current' : ''}`} />
                    <span className="text-sm">{likeCount}</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowComments(true)} className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-sm">{post.commentCount ?? 0}</span>
                </Button>
            </div>
            {post.link && (
                <Button variant="ghost" size="icon" asChild>
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                        <LinkIcon className="h-5 w-5 text-muted-foreground hover:text-primary"/>
                    </a>
                </Button>
            )}
        </CardFooter>
      </Card>
      {showComments && <CommentsSheet post={post} open={showComments} onOpenChange={setShowComments} />}
    </>
  );
}
