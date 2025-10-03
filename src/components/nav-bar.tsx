'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { Home, PlusSquare, Flame, Search, LogOut, User as UserIcon, Music } from 'lucide-react';

const navLinks = [
  { href: '/feed', label: 'Feed', icon: Home },
  { href: '/trending', label: 'Trending', icon: Flame },
  { href: '/new-post', label: 'New Post', icon: PlusSquare },
  { href: '/search', label: 'Search', icon: Search },
];

export default function NavBar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/feed" className="mr-6 flex items-center space-x-2">
          <Music className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-xl inline-block">TuneShare</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9 border-2 border-primary/50">
                    <AvatarImage src={user.profilePic} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile"><UserIcon className="mr-2 h-4 w-4" />Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="grid grid-cols-5 h-16">
          {navLinks.map(link => (
             <Link key={`mob-${link.href}`} href={link.href} className={cn('flex flex-col items-center justify-center gap-1', pathname === link.href ? 'text-primary' : 'text-muted-foreground')}>
              <link.icon className="h-5 w-5"/>
              <span className="text-xs">{link.label}</span>
             </Link>
          ))}
          <Link href="/profile" className={cn('flex flex-col items-center justify-center gap-1', pathname === "/profile" ? 'text-primary' : 'text-muted-foreground')}>
            <UserIcon className="h-5 w-5"/>
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
