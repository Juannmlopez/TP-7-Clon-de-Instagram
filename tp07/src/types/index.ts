export interface CatImage {
    id: string;
    url: string;
  }
  
  export interface Post {
    id: string;
    image: string;
    username: string;
    avatar: string;
    caption: string;
    hashtags: string;
    likes: number;
    comments: number;
    time: string;
    liked: boolean;
    saved: boolean;
  }
  
  export interface Story {
    id: number;
    username: string;
    avatar: string;
    hasStory: boolean;
  }
  
  export interface SuggestedUser {
    id: number;
    username: string;
    avatar: string;
    subtitle: string;
  }