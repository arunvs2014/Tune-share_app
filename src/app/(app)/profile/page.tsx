'use client';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PostCard from '@/components/post-card';
import PlaylistEditor from '@/components/playlist-editor';
import { samplePosts, sampleUsers } from '@/lib/data';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  const userPosts = samplePosts
    .filter(p => p.uid === user.uid)
    .map(post => ({
        ...post,
        user: sampleUsers.find(u => u.uid === post.uid)
    }));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        <Avatar className="w-32 h-32 border-4 border-primary/50 shadow-lg">
          <AvatarImage src={user.profilePic} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-headline">{user.name}</h1>
          <p className="text-muted-foreground mt-1">@{user.email.split('@')[0]}</p>
          <p className="mt-4 font-body max-w-md">{user.bio}</p>
          <Button variant="outline" className="mt-4 border-accent text-accent hover:bg-accent hover:text-accent-foreground">Edit Profile</Button>
        </div>
      </div>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted/50">
          <TabsTrigger value="posts" className="font-headline">My Posts</TabsTrigger>
          <TabsTrigger value="playlists" className="font-headline">My Playlists</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-6">
           <div className="space-y-6 max-w-2xl mx-auto">
            {userPosts.length > 0 ? (
                userPosts.map(post => <PostCard key={post.id} post={post} />)
            ) : (
                <p className='text-center text-muted-foreground py-8'>No posts yet. Share your first tune!</p>
            )}
           </div>
        </TabsContent>
        <TabsContent value="playlists" className="mt-6">
          <PlaylistEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
}
