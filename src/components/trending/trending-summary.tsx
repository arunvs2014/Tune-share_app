"use client";
import { useState, useEffect } from "react";
import { summarizeTrendingSongs, TrendingSongsSummaryInput, TrendingSongsSummaryOutput } from "@/ai/flows/trending-songs-summarization";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { samplePosts } from "@/lib/data";
import { Bot } from "lucide-react";

export default function TrendingSummary() {
  const [summary, setSummary] = useState<TrendingSongsSummaryOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getSummary() {
      try {
        setLoading(true);
        // In a real app, fetch trending songs from Firestore
        const trendingSongsInput: TrendingSongsSummaryInput = {
          songs: samplePosts
            .filter(p => (new Date().getTime() - new Date(p.timestamp).getTime()) < 1000 * 60 * 60 * 24)
            .sort((a,b) => b.likes.length - a.likes.length)
            .slice(0, 5)
            .map(p => ({
                songName: p.songName,
                artist: p.artist,
                likeCount: p.likes.length,
                commentsCount: p.commentCount || 0,
            })),
          communityHighlights: "The #SummerVibes challenge is currently ongoing.",
        };
        
        if (trendingSongsInput.songs.length === 0) {
            setSummary({ summary: "It's a bit quiet right now. Be the first to start a new trend!" });
            return;
        }

        const result = await summarizeTrendingSongs(trendingSongsInput);
        setSummary(result);
      } catch (e) {
        console.error(e);
        setError("Could not generate trending summary.");
      } finally {
        setLoading(false);
      }
    }
    getSummary();
  }, []);

  return (
    <Card className="bg-primary/5 border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
          <Bot />
          AI Trend Analysis
        </CardTitle>
        <CardDescription>An AI-powered summary of what's hot right now.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )}
        {error && <p className="text-destructive">{error}</p>}
        {summary && <p className="font-body text-base">{summary.summary}</p>}
      </CardContent>
    </Card>
  );
}
