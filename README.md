# Job AI Backend

Secure Job AI Backend with Google OAuth, Cloudflare D1 Database, and Cloudflare R2 Object Storage.

## Environment & Cloudflare Configuration

- **Live Backend Endpoint**: `https://job-ai-backend.ahmed-mohammed8694.workers.dev`
- **Cloudflare Account ID**: `59c3664f6fa4641913319c39b4b6047b`
- **Cloudflare D1 Database**: `job-ai-db` (`5d6e5a34-b240-463a-a14a-519538fd2fc4`)
- **Cloudflare R2 Bucket**: `jobassistantpremium`
- **S3 API Endpoint**: `https://59c3664f6fa4641913319c39b4b6047b.r2.cloudflarestorage.com/jobassistantpremium`

## Tampermonkey UserScript

The UserScript is located at **[job-assistant-userscript.user.js](file:///d:/My%20Applications/job-ai-backend/job-assistant-userscript.user.js)**.
It tracks job applications automatically from Naukri, LinkedIn, Indeed, Glassdoor, and other job portals directly into your Cloudflare D1 Database and R2 Storage!

## Getting Started

1. Copy `.env.example` to `.env` if not already present.
2. Run development server locally:
   ```bash
   npm run dev
   ```
3. Deploy updates to Cloudflare Workers:
   ```bash
   npx wrangler deploy
   ```