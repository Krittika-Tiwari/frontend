# FoodLens — Frontend

Next.js + Tailwind app for browsing recipes. This README covers local setup and how to connect to the backend API.

Quick setup (macOS / zsh)

1. Install dependencies

```bash
cd frontend
npm install
```

2. Configure environment variables

Create a `.env.local` in the `frontend` folder with:

```
NEXT_PUBLIC_API_URL=http://localhost:5001
```

Adjust the URL if your backend runs on a different host or port.

3. Start the dev server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

Notes

- The recipes listing is server-rendered (app router) and fetches data from the backend API using `NEXT_PUBLIC_API_URL`.
- The recipe detail page is client-side (fetches full recipe data from `/api/recipes/:id`).
- Column visibility preferences and view mode (grid/table) are stored in `localStorage`.

Deployment

- Deploy the frontend to Vercel. In Vercel, set the environment variable `NEXT_PUBLIC_API_URL` to your deployed API URL.

Troubleshooting

- If the recipes page is empty, confirm the backend is running and seeded, and that `NEXT_PUBLIC_API_URL` points to the correct host.
- If you need me to add a `vercel.json` or GitHub Action for CI/CD, tell me and I can add it.
  This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

