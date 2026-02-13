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

1.  **Extract the Files**:
    *   Unzip the project file.
    *   You should see a folder containing `package.json`, `src`, `public`, etc.
    *   Let's say you extracted it to `C:\Users\YourName\Documents\health-blog`.

2.  **Open Terminal**:
    *   Open `Command Prompt` or `PowerShell`.
    *   Navigate to that exact folder:
        ```cmd
        cd "C:\Users\YourName\Documents\health-blog"
        ```
    *   **Verify**: Type `dir` (Windows) or `ls` (Mac/Linux). You **must** see `package.json` in the list. If you see just another folder, `cd` into that one.

3.  **Install Dependencies**:
    *   Run this command and wait for it to finish:
        ```bash
        npm install
        ```

### 2. Running the Desktop App

To start the CMS and the Blog in a desktop window:

1.  Make sure you are still in the folder where `package.json` is.
2.  Run:
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

## Folder Structure

When you unzip the project, ensure you are working in the **root** folder.

*   `package.json`: This is the most important file. Commands like `npm install` must be run in the folder containing this file.
*   `src/`: Contains all the code for your website.
*   `public/`: Contains images and static assets.
*   `electron/`: Contains the code for the desktop app.

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
