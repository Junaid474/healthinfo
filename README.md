# Health Blog - High Performance & AdSense Ready

A high-performance, SEO-optimized health blog built with Next.js 15, Tailwind CSS, and Keystatic CMS. Designed for AdSense compliance and high traffic.

## Features

*   **Fast & SEO Optimized**: Built on Next.js App Router for server-side rendering and speed.
*   **Local CMS (Keystatic)**: Manage your content directly from your desktop browser. No complex backend setup.
*   **AdSense Ready**: Pre-built placeholders for AdSense units. Just add your Publisher ID.
*   **Health Compliance**: Includes Medical Disclaimer, Privacy Policy, Terms, and Author Bio components for E-E-A-T.
*   **Desktop App**: Includes a standalone Electron wrapper to manage and publish content without using the command line.

## Getting Started (Desktop Control)

### 1. Installation

1.  Clone this repository to your computer.
2.  Open a terminal in the project folder.
3.  Install dependencies:
    ```bash
    npm install
    ```

### 2. Running the Desktop App

To start the CMS and the Blog in a desktop window:

```bash
npm run start:desktop
```

This will:
1.  Start the local server.
2.  Launch the Electron app.
3.  Open the **Keystatic Admin Panel**.

### 3. Writing & Publishing Content

1.  **Write**: In the app, go to `Posts` and write your article. Save it.
2.  **Preview**: Click "View Local Blog" in the app menu to see how it looks.
3.  **Publish**: Go to the **Publish** menu and click **Publish to Live Site**.
    *   This automatically saves your changes and pushes them to GitHub.
    *   GitHub Actions will then build and deploy your site to the live URL.

## AdSense Configuration

To enable real ads:

1.  Create a file named `.env.local` in the root directory.
2.  Add your AdSense Publisher ID:
    ```env
    NEXT_PUBLIC_ADSENSE_ID=ca-pub-YOUR_ID_HERE
    ```

## Tech Stack

*   **Framework**: Next.js 15
*   **Styling**: Tailwind CSS v4
*   **CMS**: Keystatic
*   **Desktop Wrapper**: Electron
*   **Deployment**: GitHub Pages (via GitHub Actions)
