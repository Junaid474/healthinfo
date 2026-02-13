import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - HealthInfo',
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Privacy Policy</h1>
      <div className="prose prose-lg text-gray-700">
        <p className="mb-4">Last updated: January 1, 2024</p>
        <p className="mb-4">
          This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
        </p>
        <p className="mb-4">
          We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Collecting and Using Your Personal Data</h2>
        <h3 className="text-xl font-bold mt-4 mb-2">Types of Data Collected</h3>
        <p className="mb-4">
          While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Usage Data</li>
        </ul>

        <h3 className="text-xl font-bold mt-4 mb-2">Usage Data</h3>
        <p className="mb-4">
          Usage Data is collected automatically when using the Service.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, You can contact us:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>By email: contact@healthinfo-blog.com</li>
        </ul>
      </div>
    </div>
  );
}
