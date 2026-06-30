# Columbia Undergraduate Research Conference

Frontend-only React app for the 2026 National Premier Undergraduate Research Conference at Columbia University.

## Project Structure

```
curesearchconference/
├── client/          # React frontend (Vite)
├── server/          # Node.js + Express backend (deployed on Render)
```

## Requirements
- Node.js 16+
- npm

## Local Development

Install dependencies:
```bash
cd client
npm install
```

Start the dev server:
```bash
cd client
npm run dev
```

The app runs at `http://localhost:5173`.

## Build

Create a production build:
```bash
cd client
npm run build
```

Preview the production build:
```bash
cd client
npm run preview
```

## Deployment (Vercel)

This repo includes `vercel.json` for Vercel.

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Deploy

Vercel builds the Vite app and serves `client/dist` with SPA routing enabled.
# curesearchconference
