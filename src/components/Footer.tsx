import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 py-12 mt-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="text-xl font-bold tracking-tight block mb-4">
            Health<span className="text-blue-600">Blog</span>
          </Link>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-xs">
            Providing reliable health information and wellness tips. Your journey to a better life starts here.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Links</h3>
          <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li><Link href="/about" className="hover:text-blue-600">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li><Link href="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link></li>
            <li><Link href="/terms-of-service" className="hover:text-blue-600">Terms of Service</Link></li>
            <li><Link href="/disclaimer" className="hover:text-blue-600">Disclaimer</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-xs text-zinc-500">
        &copy; {new Date().getFullYear()} HealthBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
