import type { Timestamp } from 'firebase/firestore';

export type User = {
  uid: string;
  name: string;
  email: string;
  bio: string;
  profilePic: string;
  createdAt: Timestamp | Date;
  following?: string[];
  followers?: string[];
};

export type Song = {
  songName: string;
  artist: string;
  coverArt?: string;
};

export type Post = {
  id: string;
  uid: string;
  songName: string;
  artist: string;
  link?: string;
  caption: string;
  timestamp: Timestamp | Date;
  likes: string[];
  coverArt: string;
  // Populated data
  user?: User;
  commentCount?: number;
};

export type Comment = {
  id: string;
  postId: string;
  uid: string;
  text: string;
  timestamp: Timestamp | Date;
  // Populated data
  user?: User;
};

export type Playlist = {
  id: string;
  uid: string;
  title: string;
  songs: Song[];
};
