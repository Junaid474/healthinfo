import Link from 'next/link';
import { reader } from '../../utils/reader';
import { formatDate } from '../../utils/formatDate';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import { metadata } from './metadata';

export { metadata };

export default async function Home() {
  const posts = await reader.collections.posts.all();

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.entry.publishedDate || '').getTime();
    const dateB = new Date(b.entry.publishedDate || '').getTime();
    return dateB - dateA;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-3/4">
          <h1 className="text-4xl font-bold mb-8">Latest Health Articles</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sortedPosts.map((post) => (
              <article key={post.slug} className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white dark:bg-zinc-900">
                <Link href={`/posts/${post.slug}`} className="block">
                  {post.entry.coverImage && (
                    <div className="relative h-48 w-full bg-zinc-100 dark:bg-zinc-800">
                      {/* Note: In a real app, use next/image. For now, we assume local paths work if public. */}
                      <img
                        src={post.entry.coverImage}
                        alt={post.entry.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                      {post.entry.title}
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 line-clamp-3">
                      {post.entry.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <span>{formatDate(post.entry.publishedDate)}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
            {sortedPosts.length === 0 && (
              <div className="col-span-full text-center py-12 text-zinc-500">
                <p>No articles found. Start writing in the CMS!</p>
                <Link href="/keystatic" className="text-blue-600 hover:underline mt-2 inline-block">
                  Go to Admin Dashboard
                </Link>
              </div>
            )}
          </div>
        </div>

        <aside className="w-full md:w-1/4">
          <div className="sticky top-24">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Advertisement</h3>
            <AdSensePlaceholder slot="sidebar-home" format="rectangle" className="h-[250px]" />

            <div className="mt-8">
              <h3 className="font-bold text-lg mb-4 border-b pb-2">Popular Topics</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/category/nutrition" className="hover:text-blue-600">Nutrition</Link></li>
                <li><Link href="/category/fitness" className="hover:text-blue-600">Fitness</Link></li>
                <li><Link href="/category/mental-health" className="hover:text-blue-600">Mental Health</Link></li>
                <li><Link href="/category/wellness" className="hover:text-blue-600">Wellness</Link></li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
