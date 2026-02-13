import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - HealthInfo',
};

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h1>
      <div className="prose prose-lg text-gray-700">
        <p className="mb-4">
          If you have any questions, please feel free to reach out to us at:
        </p>
        <p className="mb-4 font-bold text-lg">
          Email: <a href="mailto:contact@healthinfo-blog.com" className="text-blue-600 hover:text-blue-800">contact@healthinfo-blog.com</a>
        </p>
        <p className="mb-4">
          We will get back to you as soon as possible.
        </p>
      </div>
    </div>
  );
}
