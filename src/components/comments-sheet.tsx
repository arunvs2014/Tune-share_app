'use client';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { Comment, Post, User } from '@/lib/types';
import { sampleComments, sampleUsers } from '@/lib/data';
import { formatDistanceToNow } from 'date-fns';
import { Send } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

interface CommentsSheetProps {
  post: Post;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CommentsSheet({ post, open, onOpenChange }: CommentsSheetProps) {
    const { user: currentUser } = useAuth();
    // In a real app, comments would be fetched from Firestore
    const comments: Comment[] = sampleComments
        .filter(c => c.postId === post.id)
        .map(comment => ({
            ...comment,
            user: sampleUsers.find(u => u.uid === comment.uid)
        }));

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader className="text-left">
          <SheetTitle className="font-headline text-2xl">Comments</SheetTitle>
          <SheetDescription>For "{post.songName}" by {post.artist}</SheetDescription>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto pr-4 -mr-6 space-y-6 py-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.user?.profilePic} />
                <AvatarFallback>{comment.user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{comment.user?.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm font-body">{comment.text}</p>
              </div>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-center text-muted-foreground pt-10">Be the first to comment!</p>
          )}
        </div>
        
        <div className="mt-auto border-t pt-4 -mb-2">
            <div className="flex items-start gap-3">
                 <Avatar className="h-9 w-9">
                    <AvatarImage src={currentUser?.profilePic} />
                    <AvatarFallback>{currentUser?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 relative">
                    <Textarea placeholder="Add a comment..." className="pr-14" />
                    <Button size="icon" className="absolute right-2 top-2 h-8 w-8 bg-accent hover:bg-accent/90">
                        <Send className="h-4 w-4"/>
                    </Button>
                </div>
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
