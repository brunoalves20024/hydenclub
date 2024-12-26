export interface Model {
  id: string;
  name: string;
  bio: string;
  location: string;
  profileImage: string;
  gallery: string[];
  stats: {
    height: string;
    measurements: string;
    shoeSize: string;
  };
  experience: string[];
}

export interface Post {
  id: string;
  modelId: string;
  content: string;
  image?: string;
  videoUrl?: string;
  timestamp: Date;
  likes: number;
  comments: Comment[];
  reactions: string[];
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: Date;
  likes: number;
  emoji?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  modules: number;
}

export interface UserProfile {
  username: string;
  stats: {
    photosViewed: number;
    videosViewed: number;
    messagesSent: number;
    interactions: number;
  };
  favorites: {
    models: string[];
    contentTypes: {
      photos: number;
      videos: number;
    };
  };
}