# **App Name**: TuneShare

## Core Features:

- Firebase Authentication: Enable user authentication using Firebase Auth with email/password and Google Sign-In. Store user data (name, email, bio, profilePic, createdAt) in the 'users' collection in Firestore upon signup.
- Real-time Feed: Display posts in real-time, ordered by timestamp in descending order. Each PostCard should display the song name, artist, caption, a like button, and the comment count. Display sample posts.
- New Post Submission: Provide a form for users to submit new posts, including fields for song name, artist, an optional link, and a caption. Save posts to the 'posts' collection in Firestore, including a server timestamp and an empty likes array. Also add sample new posts in Firestore.
- Like Toggle: Implement a like button that adds or removes the current user's UID from the 'likes' array in the corresponding 'posts' document using an atomic operation.
- Comments Section: Create an interactive comments section (either in a modal or expanded view) where users can view and post comments. Store comments in the 'comments' collection in Firestore, linking each comment to its parent post via the postId.
- Profile Page: Show user profile data as well as their song posts. Allow to create and edit song playlists. Playlists will be saved in the 'playlists' collection in Firestore. 
- Trending Songs: AI powered tool to keep track of the current trends. Periodically aggregate songs to measure the average engagement in the past 24 hours and use it to highlight the ones that trending in TuneShare.

## Style Guidelines:

- Primary color: Energetic purple (#A020F0), reflecting the vibrancy of music and social connection.
- Background color: Light gray (#E0E0E0), providing a neutral backdrop that ensures readability and focus on content.
- Accent color: Teal (#008080), used sparingly for interactive elements like buttons and links to draw attention and provide contrast.
- Headline font: 'Belleza', a humanist sans-serif to provide personality and a stylish edge; for body, use 'Alegreya', a contemporary serif for an elegant, intellectual feel.
- Responsive design with a card-based feed for a visually engaging and organized layout across various devices.
- Use consistent and modern icons to represent actions and categories, enhancing user experience and visual appeal.
- Subtle animations, such as smooth transitions and hover effects, to provide a polished and interactive feel without being distracting.