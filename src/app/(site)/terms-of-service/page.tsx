export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <div className="prose dark:prose-invert">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>
          By accessing this website we assume you accept these terms and conditions. Do not continue to use HealthBlog
          if you do not agree to take all of the terms and conditions stated on this page.
        </p>

        <h2>License</h2>
        <p>
          Unless otherwise stated, HealthBlog and/or its licensors own the intellectual property rights for all material on HealthBlog.
          All intellectual property rights are reserved. You may access this from HealthBlog for your own personal use subjected to restrictions set in these terms and conditions.
        </p>

        <h2>You must not:</h2>
        <ul>
          <li>Republish material from HealthBlog</li>
          <li>Sell, rent or sub-license material from HealthBlog</li>
          <li>Reproduce, duplicate or copy material from HealthBlog</li>
          <li>Redistribute content from HealthBlog</li>
        </ul>
      </div>
    </div>
  );
}
