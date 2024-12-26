import { Post } from '../types';
import { models } from './models';

// Generate feed posts from models
const feedPosts: Post[] = models.map((model) => ({
  id: `post-${model.id}`,
  modelId: model.id,
  content: `${model.bio} #fashion #model #photoshoot`,
  image: model.gallery[0],
  timestamp: new Date(Date.now() - Math.random() * 10000000000),
  likes: Math.floor(Math.random() * 5000) + 100,
  comments: [],
  reactions: []
}));

// Add video posts
const videoPosts: Post[] = [
  {
    id: 'video-1',
    modelId: '1',
    content: 'Behind the scenes at my latest runway show in Milan! 🇮🇹 #MilanFashionWeek',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b',
    videoUrl: 'https://example.com/runway-video.mp4',
    timestamp: new Date(),
    likes: 3420,
    comments: [],
    reactions: []
  },
  {
    id: 'video-2',
    modelId: '2',
    content: 'Quick makeup tutorial for my signature look! 💄 #BeautyTips',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b',
    videoUrl: 'https://example.com/makeup-tutorial.mp4',
    timestamp: new Date(),
    likes: 2891,
    comments: [],
    reactions: []
  }
];

const textPosts: Post[] = [
  {
    id: 'text-1',
    modelId: '3',
    content: 'Just finished an amazing photoshoot! Can\'t wait to share the results with you all! 📸✨ #BehindTheScenes',
    timestamp: new Date(),
    likes: 1543,
    comments: [],
    reactions: []
  },
  {
    id: 'text-2',
    modelId: '4',
    content: 'Thank you all for the amazing support! Love you! ❤️',
    timestamp: new Date(),
    likes: 2156,
    comments: [],
    reactions: []
  }
];

export const allPosts = [...feedPosts, ...videoPosts, ...textPosts].sort((a, b) => 
  b.timestamp.getTime() - a.timestamp.getTime()
);