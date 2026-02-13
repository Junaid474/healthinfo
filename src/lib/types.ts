export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
  description: string;
  category?: string;
  tags?: string[];
  author?: string;
}

export type PostMeta = Omit<Post, 'content'>;
