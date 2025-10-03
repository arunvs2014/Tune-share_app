import NewPostForm from '@/components/new-post-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function NewPostPage() {
  return (
    <div className="max-w-2xl mx-auto">
       <Card className="border-2 border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary">Share a Tune</CardTitle>
          <CardDescription className="font-body">What are you listening to? Share a song that's on your mind.</CardDescription>
        </CardHeader>
        <CardContent>
          <NewPostForm />
        </CardContent>
      </Card>
    </div>
  );
}
