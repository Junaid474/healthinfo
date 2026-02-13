import { getAllPostSlugs, getPostData } from '@/lib/posts';
import { format, parseISO } from 'date-fns';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const postData = await getPostData(slug);
    return {
      title: `${postData.title} - HealthInfo`,
      description: postData.description,
      openGraph: {
        title: postData.title,
        description: postData.description,
        type: 'article',
        publishedTime: postData.date,
        authors: [postData.author || 'HealthInfo'],
      },
    };
  } catch {
    return {
      title: 'Post Not Found',
    };
  }
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let postData;
  try {
    postData = await getPostData(slug);
  } catch {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{postData.title}</h1>
        <div className="flex items-center text-gray-500 text-sm space-x-4">
          <time dateTime={postData.date}>{format(parseISO(postData.date), 'MMMM d, yyyy')}</time>
          {postData.category && (
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {postData.category}
            </span>
          )}
          {postData.author && (
             <span>by {postData.author}</span>
          )}
        </div>
      </header>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: postData.title,
            datePublished: postData.date,
            description: postData.description,
            author: {
              '@type': 'Person',
              name: postData.author || 'HealthInfo Team',
            },
          }),
        }}
      />
      
      <div 
        className="prose prose-lg prose-blue max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: postData.content }} 
      />
      
      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-gray-600 text-sm">
          Disclaimer: The content provided on this blog is for informational purposes only and is not intended as medical advice.
        </p>
      </div>
    </article>
  );
}
