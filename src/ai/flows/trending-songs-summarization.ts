'use server';

/**
 * @fileOverview Summarizes trending songs on TuneShare, explaining their popularity.
 *
 * - summarizeTrendingSongs -  A function that summarizes trending songs.
 * - TrendingSongsSummaryInput - The input type for the summarizeTrendingSongs function.
 * - TrendingSongsSummaryOutput - The return type for the summarizeTrendingSongs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TrendingSongsSummaryInputSchema = z.object({
  songs: z.array(
    z.object({
      songName: z.string(),
      artist: z.string(),
      likeCount: z.number().describe('Number of likes the song received.'),
      commentsCount: z.number().describe('Number of comments the song received.'),
    })
  ).describe('An array of trending songs with their like and comment counts.'),
  communityHighlights: z.string().optional().describe('Any current community highlights or events that might influence song popularity.'),
});

export type TrendingSongsSummaryInput = z.infer<typeof TrendingSongsSummaryInputSchema>;

const TrendingSongsSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of the trending songs, explaining why they are popular in the community.'),
});

export type TrendingSongsSummaryOutput = z.infer<typeof TrendingSongsSummaryOutputSchema>;

export async function summarizeTrendingSongs(input: TrendingSongsSummaryInput): Promise<TrendingSongsSummaryOutput> {
  return trendingSongsSummaryFlow(input);
}

const trendingSongsSummaryPrompt = ai.definePrompt({
  name: 'trendingSongsSummaryPrompt',
  input: { schema: TrendingSongsSummaryInputSchema },
  output: { schema: TrendingSongsSummaryOutputSchema },
  prompt: `You are a social media trend analyst for TuneShare, a music-sharing platform. Analyze the provided list of trending songs and community highlights to create a concise summary explaining why these songs are currently popular among TuneShare users.\n\nTrending Songs:\n{{#each songs}}\n- "{{songName}}" by {{artist}} (Likes: {{likeCount}}, Comments: {{commentsCount}})\n{{/each}}\n\n{{#if communityHighlights}}\nCommunity Highlights: {{communityHighlights}}\n{{/if}}\n\nBased on this data, provide a summary that explains the songs' popularity. Consider factors like recent events, community challenges, or viral sounds that might be driving the trends. Keep the summary concise and engaging for TuneShare users.`
});

const trendingSongsSummaryFlow = ai.defineFlow(
  {
    name: 'trendingSongsSummaryFlow',
    inputSchema: TrendingSongsSummaryInputSchema,
    outputSchema: TrendingSongsSummaryOutputSchema,
  },
  async input => {
    const { output } = await trendingSongsSummaryPrompt(input);
    return output!;
  }
);
