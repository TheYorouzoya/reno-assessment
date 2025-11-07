This is my submission for the Web Developer position at Reno Platforms.

## Getting Started

First, install dependencies:

```bash
npm i
#or
pnpm i
```

Second, create a Postgres database and supply the connection string as the `RENO_POSTGRES_URL` env variable (see `.env.example`).

Then, run the development server:

```bash
npm run dev
# or
pnpm run dev
```

Seed the database with some intial data. Open [http://localhost:3000/seed](http://localhost:3000/seed), which will run the seed script (initializing the school table) and populate the database with some dummy entries.

If you ever have to reset/truncate the school table, visit [http://localhost:3000/reset](http://localhost:3000/reset). Then, revisit the seed route to seed the data again.

# Vercel Deployment

This app is deployed on Vercel. The caveat here is that the assignment asked for storing the school image on a local folder. This isn't possible on a serverless deployment like Vercel, Netlify, etc., since those environments are read-only. This would require adding in an external file hosting service. If you're running this locally, the images will be saved in the `/public/schoolImages` folder upon a successful save.