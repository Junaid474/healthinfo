import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { PostMeta } from '../lib/types';

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl font-bold mb-2">
        <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800">
          {post.title}
        </Link>
      </h2>
      <div className="text-gray-500 text-sm mb-4">
        <time dateTime={post.date}>{format(parseISO(post.date), 'LLLL d, yyyy')}</time>
      </div>
      <p className="text-gray-700 mb-4">{post.description}</p>
      <Link href={`/blog/${post.slug}`} className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
        Read More
      </Link>
    </div>
  );
}
