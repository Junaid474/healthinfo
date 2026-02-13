# Health Blog - High Performance & AdSense Ready

A high-performance, SEO-optimized health blog built with Next.js 15, Tailwind CSS, and Keystatic CMS. Designed for AdSense compliance and high traffic.

## Features

*   **Fast & SEO Optimized**: Built on Next.js App Router for server-side rendering and speed.
*   **Local CMS (Keystatic)**: Manage your content directly from your desktop browser. No complex backend setup.
*   **AdSense Ready**: Pre-built placeholders for AdSense units. Just add your Publisher ID.
*   **Health Compliance**: Includes Medical Disclaimer, Privacy Policy, Terms, and Author Bio components for E-E-A-T (Expertise, Authoritativeness, Trustworthiness).
*   **Responsive Design**: Mobile-first layout using Tailwind CSS.

## Getting Started (Desktop Control)

Since you want control from your desktop, this project is set up to run locally where you can write content, then push changes to GitHub.

### 1. Installation

1.  Clone this repository to your computer.
2.  Open a terminal in the project folder.
3.  Install dependencies:
    ```bash
    npm install
    ```

### 2. Running the Blog & CMS

1.  Start the development server:
    ```bash
    npm run dev
    ```
2.  Open your browser to:
    *   **Blog**: [http://localhost:3000](http://localhost:3000)
    *   **CMS Admin**: [http://localhost:3000/keystatic](http://localhost:3000/keystatic)

### 3. Writing Content

1.  Go to the CMS Admin URL.
2.  Create **Authors** first (needed for posts).
3.  Create **Posts**.
    *   You can upload images directly in the editor.
    *   Use the "Medical Disclaimer" will automatically appear on posts.
4.  Save your changes. Keystatic will write files to `src/content/posts` and `src/content/authors` in your project folder.

### 4. Publishing

1.  After writing content, use Git to commit your changes:
    ```bash
    git add .
    git commit -m "New post: [Title]"
    git push origin main
    ```
2.  Your hosting provider (e.g., Vercel, Netlify) will detect the push and redeploy the site.

## AdSense Configuration

To enable real ads:

1.  Create a file named `.env.local` in the root directory.
2.  Add your AdSense Publisher ID:
    ```env
    NEXT_PUBLIC_ADSENSE_ID=ca-pub-YOUR_ID_HERE
    ```
3.  In the CMS or code, you can customize ad slots. The default placeholders are set up in `src/app/(site)/page.tsx` and `src/app/(site)/posts/[slug]/page.tsx`.
    *   **Sidebar Slot ID**: Replace `slot="sidebar-home"` with your actual unit ID.
    *   **In-Article Slot ID**: Replace `slot="bottom-post"` etc.

## Customization

*   **Logo/Branding**: Update `src/components/Header.tsx`.
*   **Legal Pages**: Edit the text in `src/app/(site)/privacy-policy/page.tsx`, etc., to match your specific details.
*   **Colors/Fonts**: Edit `src/app/globals.css` and `tailwind.config.ts` (or CSS variables).

## Tech Stack

*   **Framework**: Next.js 15
*   **Styling**: Tailwind CSS v4
*   **CMS**: Keystatic
*   **Language**: TypeScript
