'use client';
import { useState } from 'react';
import { samplePlaylists } from '@/lib/data';
import type { Playlist } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ListMusic, Plus, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function PlaylistEditor() {
  const [playlists, setPlaylists] = useState<Playlist[]>(samplePlaylists);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-headline">Your Playlists</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="mr-2 h-4 w-4" />
              New Playlist
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Playlist</DialogTitle>
              <DialogDescription>Give your new playlist a title to get started.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Input placeholder="e.g., Summer Vibes" />
            </div>
            <DialogFooter>
              <Button type="submit" className='bg-accent hover:bg-accent/90'>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <Card key={playlist.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline flex items-center justify-between">
                {playlist.title}
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>{playlist.songs.length} songs</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3 font-body">
                {playlist.songs.slice(0, 3).map((song, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm">
                    <ListMusic className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-semibold">{song.songName}</p>
                      <p className="text-muted-foreground">{song.artist}</p>
                    </div>
                  </li>
                ))}
                {playlist.songs.length > 3 && (
                  <li className="text-sm text-muted-foreground">...and {playlist.songs.length - 3} more.</li>
                )}
              </ul>
            </CardContent>
          </Card>
        ))}
         {playlists.length === 0 && (
            <p className='text-center text-muted-foreground py-8 col-span-full'>No playlists yet. Create one!</p>
        )}
      </div>
    </div>
  );
}
