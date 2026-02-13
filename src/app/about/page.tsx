import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - HealthInfo',
};

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">About Us</h1>
      <div className="prose prose-lg text-gray-700">
        <p className="mb-4">
          Welcome to HealthInfo, your number one source for all things health-related. We&apos;re dedicated to providing you the very best of health information, with an emphasis on accuracy, reliability, and practicality.
        </p>
        <p className="mb-4">
          Founded in 2024, HealthInfo has come a long way from its beginnings. When we first started out, our passion for &quot;health for everyone&quot; drove us to start this blog, so that HealthInfo can offer you the world&apos;s most advanced health insights.
        </p>
        <p className="mb-4">
          We now serve readers all over the world, and are thrilled that we&apos;re able to turn our passion into our own website.
        </p>
        <p>
          We hope you enjoy our articles as much as we enjoy offering them to you. If you have any questions or comments, please don&apos;t hesitate to contact us.
        </p>
        <p className="mt-8 font-bold">
          Sincerely,<br />
          The HealthInfo Team
        </p>
      </div>
    </div>
  );
}
