import { db } from './config';
import {
  collection,
  query,
  getDocs,
  orderBy,
  limit,
  doc,
  getDoc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import type { Post, User } from '@/lib/types';

// Helper function to get user data
async function getUser(uid: string): Promise<User | undefined> {
  if (!uid) return undefined;
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data() as User;
    }
    return undefined;
  } catch (error) {
    console.error(`Error fetching user ${uid}:`, error);
    return undefined;
  }
}

/**
 * Fetches the most recent posts from Firestore.
 */
export async function getPosts(postLimit: number = 20): Promise<Post[]> {
  try {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('timestamp', 'desc'), limit(postLimit));
    const querySnapshot = await getDocs(q);

    const posts: Post[] = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const postData = doc.data() as Omit<Post, 'id' | 'user'>;
        
        // Fetch author information
        const user = await getUser(postData.uid);

        return {
          id: doc.id,
          ...postData,
          user,
        };
      })
    );

    return posts;
  } catch (error) {
    console.error("Error fetching posts from Firestore:", error);
    return [];
  }
}

/**
 * Creates a new post in Firestore.
 */
export async function createPost(postData: {
    uid: string;
    songName: string;
    artist: string;
    caption: string;
    link?: string;
}) {
    try {
        const postsCollection = collection(db, 'posts');
        const newPost = {
            ...postData,
            likes: [],
            coverArt: `https://picsum.photos/seed/${Math.random()}/300/300`, // random placeholder
            timestamp: serverTimestamp(),
        };
        const docRef = await addDoc(postsCollection, newPost);
        return docRef.id;
    } catch (error) {
        console.error("Error creating post in Firestore:", error);
        throw new Error("Failed to create post.");
    }
}
