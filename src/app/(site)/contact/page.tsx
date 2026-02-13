export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div className="prose dark:prose-invert">
        <p>
          We would love to hear from you! If you have any questions, feedback, or inquiries, please feel free to reach out to us.
        </p>

        <h2>Email</h2>
        <p>
          You can email us at: <a href="mailto:contact@healthblog.com" className="text-blue-600 hover:underline">contact@healthblog.com</a>
        </p>

        <h2>Address</h2>
        <p>
          HealthBlog Inc.<br />
          123 Wellness Street<br />
          Healthy City, HC 12345
        </p>
      </div>
    </div>
  );
}
