import { Input } from '@/components/ui/input';
import { Search as SearchIcon } from 'lucide-react';

export default function SearchPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-headline mb-8 text-foreground">Search</h1>
      <div className="relative mb-8">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search for songs, artists, or users..." className="pl-10 text-base py-6 rounded-full" />
      </div>
      <div className="text-center py-16">
        <p className="text-muted-foreground font-body">
          Find your favorite tracks or discover new friends.
        </p>
      </div>
    </div>
  );
}
