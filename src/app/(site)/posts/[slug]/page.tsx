import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { reader } from '../../../../utils/reader';
import { formatDate } from '../../../../utils/formatDate';
import AdSensePlaceholder from '../../../../components/AdSensePlaceholder';
import MedicalDisclaimer from '../../../../components/MedicalDisclaimer';
import Schema from '../../../../components/Schema';

export async function generateStaticParams() {
  try {
    const posts = await reader.collections.posts.all();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await reader.collections.posts.read(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await reader.collections.posts.read(slug);

  if (!post) notFound();

  const content = await post.content();

  let author = null;
  if (post.author) {
    author = await reader.collections.authors.read(post.author);
  }

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
      <Schema
        type="Article"
        data={{
          headline: post.title,
          image: post.coverImage ? [post.coverImage] : [],
          datePublished: post.publishedDate,
          author: {
            '@type': 'Person',
            name: author ? author.name : 'HealthBlog Team',
            url: author?.socials?.[0]?.url, // Link to first social if available
          },
          publisher: {
            '@type': 'Organization',
            name: 'HealthBlog',
            logo: {
              '@type': 'ImageObject',
              url: 'https://your-health-blog.com/logo.png', // Replace with real URL
            },
          },
          description: post.excerpt,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://your-health-blog.com/posts/${slug}`,
          },
        }}
      />
      <main className="w-full lg:w-3/4">
        <article>
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>

            <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400 mb-8 border-b pb-8 border-zinc-200 dark:border-zinc-800">
              {author && (
                <div className="flex items-center gap-2">
                  {author.avatar && (
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <span className="font-medium text-black dark:text-white">{author.name}</span>
                  {author.credentials && <span className="text-zinc-500 text-xs uppercase tracking-wider ml-1">{author.credentials}</span>}
                </div>
              )}
              <span className="mx-2">•</span>
              <time dateTime={post.publishedDate || ''}>{formatDate(post.publishedDate)}</time>
              {post.categories && post.categories.length > 0 && (
                <>
                  <span className="mx-2">•</span>
                  <div className="flex gap-2">
                    {post.categories.map((cat: string) => (
                      <span key={cat} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-0.5 rounded-full text-xs font-semibold">
                        {cat}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            {post.coverImage && (
              <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-8 shadow-md">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </header>

          <MedicalDisclaimer />

          <div className="prose prose-lg dark:prose-invert max-w-none prose-blue">
            <MDXRemote source={content} components={{ AdSensePlaceholder }} />
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <AdSensePlaceholder slot="bottom-post" format="horizontal" />
          </div>

          {author && (
            <div className="mt-12 bg-zinc-50 dark:bg-zinc-900 p-8 rounded-xl border border-zinc-100 dark:border-zinc-800">
              <h3 className="text-xl font-bold mb-4">About the Author</h3>
              <div className="flex gap-6 items-start">
                 {author.avatar && (
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                    />
                  )}
                  <div>
                    <h4 className="font-bold text-lg mb-1">{author.name} {author.credentials && <span className="text-sm font-normal text-zinc-500">{author.credentials}</span>}</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">{author.bio}</p>
                    {author.socials && author.socials.length > 0 && (
                      <div className="flex gap-4">
                        {author.socials.map((social: { platform: string; url: string | null }) => (
                          social.url ? (
                            <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-medium">
                              {social.platform}
                            </a>
                          ) : null
                        ))}
                      </div>
                    )}
                  </div>
              </div>
            </div>
          )}
        </article>
      </main>

      <aside className="w-full lg:w-1/4 space-y-8">
        <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg">
          <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-zinc-500">Advertisement</h3>
          <AdSensePlaceholder slot="sidebar-post" format="rectangle" className="h-[300px] w-full" />
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-lg">
           <h3 className="font-bold text-lg mb-4">Popular Categories</h3>
           <ul className="space-y-2">
             <li><a href="#" className="text-blue-600 hover:underline">Nutrition</a></li>
             <li><a href="#" className="text-blue-600 hover:underline">Fitness</a></li>
             <li><a href="#" className="text-blue-600 hover:underline">Mental Health</a></li>
           </ul>
        </div>
      </aside>
    </div>
  );
}
