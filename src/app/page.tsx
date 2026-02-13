import { getSortedPostsData } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export const metadata = {
  title: 'HealthInfo Blog - Your Source for Healthy Living',
  description: 'Discover the latest health tips, nutrition advice, and wellness guides on HealthInfo Blog.',
};

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to HealthInfo Blog</h1>
        <p className="text-xl text-gray-600">Your trusted source for health information.</p>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allPostsData.length > 0 ? (
          allPostsData.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No posts found.</p>
        )}
      </div>
    </div>
  );
}
