import LoginForm from '@/components/auth/login-form';
import { Music } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <Music className="mx-auto h-12 w-12 text-primary"/>
            <h1 className="text-4xl font-headline mt-4 text-primary">Welcome to TuneShare</h1>
            <p className="text-muted-foreground mt-2 font-body">The social network for music lovers.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
