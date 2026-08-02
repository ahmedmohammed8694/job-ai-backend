# Job AI Backend

Secure Job AI Backend with Google OAuth, Cloudflare D1 Database, and Cloudflare R2 Object Storage.

## Environment & Cloudflare Configuration

- **Cloudflare Account ID**: `59c3664f6fa4641913319c39b4b6047b`
- **Cloudflare R2 Bucket**: `jobassistantpremium`
- **S3 API Endpoint**: `https://59c3664f6fa4641913319c39b4b6047b.r2.cloudflarestorage.com/jobassistantpremium`
- **Catalog URI**: `https://catalog.cloudflarestorage.com/59c3664f6fa4641913319c39b4b6047b/jobassistantpremium`
- **Warehouse Name**: `59c3664f6fa4641913319c39b4b6047b_jobassistantpremium`

## Getting Started

1. Copy `.env.example` to `.env` if not already present.
2. Run development server:
   ```bash
   npm run dev
   ```