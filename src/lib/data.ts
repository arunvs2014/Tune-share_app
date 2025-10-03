import type { User, Post, Comment, Playlist } from './types';

const now = new Date();

export const sampleUsers: User[] = [
  {
    uid: 'user1',
    name: 'Alex Melody',
    email: 'alex.m@example.com',
    bio: 'Music enthusiast. DJ in the making. Catch me spinning some tunes.',
    profilePic: 'https://picsum.photos/seed/profile1/200/200',
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 5),
  },
  {
    uid: 'user2',
    name: 'Beatriz Rhythm',
    email: 'b.rhythm@example.com',
    bio: 'Living one beat at a time. Producer and songwriter.',
    profilePic: 'https://picsum.photos/seed/profile2/200/200',
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 10),
  },
  {
    uid: 'user3',
    name: 'Casey Harmony',
    email: 'casey.h@example.com',
    bio: 'Guitarist, vocalist, and all-around rock fan. Looking for new collabs!',
    profilePic: 'https://picsum.photos/seed/profile3/200/200',
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2),
  },
];

// This data can be used to seed the database if needed.
export const samplePosts: Omit<Post, 'id' | 'user' | 'commentCount'>[] = [
  {
    uid: 'user1',
    songName: 'Starlight Echo',
    artist: 'Cosmic Drift',
    caption: 'This track is pure bliss. Perfect for late-night drives. What do you all think?',
    timestamp: new Date(now.getTime() - 1000 * 60 * 30),
    likes: ['user2', 'user3'],
    coverArt: 'https://picsum.photos/seed/song1/300/300',
    link: 'https://example.com/song1',
  },
  {
    uid: 'user2',
    songName: 'Ocean Breath',
    artist: 'Tidal Flow',
    caption: 'Finally finished my new track! Let me know your thoughts on the mix. #producerlife',
    timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 2),
    likes: ['user1'],
    coverArt: 'https://picsum.photos/seed/song2/300/300',
  },
  {
    uid: 'user3',
    songName: 'Sunset Fuzz',
    artist: 'The GarageTones',
    caption: 'A little throwback to this garage rock classic. The guitar riff is just iconic!',
    timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 23),
    likes: ['user1', 'user2', 'user3'],
    coverArt: 'https://picsum.photos/seed/song3/300/300',
  },
    {
    uid: 'user1',
    songName: 'Neon Dreams',
    artist: 'Synthwave Surfers',
    caption: '80s vibes are immaculate in this one. That sax solo... unreal.',
    timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 48),
    likes: ['user3'],
    coverArt: 'https://picsum.photos/seed/song4/300/300',
    link: 'https://example.com/song4',
  },
];

export const sampleComments: Comment[] = [
  {
    id: 'comment1',
    postId: 'post1',
    uid: 'user2',
    text: 'Totally agree! It has such a dreamy vibe.',
    timestamp: new Date(now.getTime() - 1000 * 60 * 25),
  },
  {
    id: 'comment2',
    postId: 'post1',
    uid: 'user3',
    text: 'Added to my playlist instantly!',
    timestamp: new Date(now.getTime() - 1000 * 60 * 20),
  },
  {
    id: 'comment3',
    postId: 'post2',
    uid: 'user1',
    text: 'The bass is coming through perfectly on my headphones. Great job!',
    timestamp: new Date(now.getTime() - 1000 * 60 * 55),
  },
  {
    id: 'comment4',
    postId: 'post3',
    uid: 'user1',
    text: 'YES! A true classic.',
    timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 5),
  }
];

export const samplePlaylists: Playlist[] = [
  {
    id: 'playlist1',
    uid: 'user3',
    title: 'Rock Anthems',
    songs: [
      { songName: 'Sunset Fuzz', artist: 'The GarageTones' },
      { songName: 'Highway Star', artist: 'Deep Purple' },
      { songName: 'Black Dog', artist: 'Led Zeppelin' },
    ],
  },
  {
    id: 'playlist2',
    uid: 'user1',
    title: 'Chillwave & Synth',
    songs: [
      { songName: 'Starlight Echo', artist: 'Cosmic Drift' },
      { songName: 'Neon Dreams', artist: 'Synthwave Surfers' },
      { songName: 'Dayvan Cowboy', artist: 'Boards of Canada' },
    ],
  },
];
