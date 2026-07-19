# Expense Tracker

A personal expense tracker built with React — no backend, no database, just components, props, state, and events.

## Features

- Add an expense (label, category, amount) through a controlled form
- View all expenses in a list, each with **Edit** and **Delete**
- Live total that recomputes automatically as items are added, edited, or removed
- Filter by category, with a friendly empty-state when nothing matches
- Biggest expense is highlighted in red
- Expenses persist to `localStorage`, so they survive a page refresh

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Deploy — GitHub + Vercel

1. `git init`, `git add .`, `git commit -m "Initial commit"`
2. Create an empty repo on GitHub, then:
   ```bash
   git remote add origin <repo-url>
   git push -u origin main
   ```
3. Go to [vercel.com](https://vercel.com), sign in with GitHub, click **Add New Project**, and import this repo.
4. Vercel auto-detects Vite/React — leave the defaults and click **Deploy**.
5. Copy the live `https://your-app.vercel.app` URL. Every future `git push` auto-redeploys it.

## Project structure

```
expense-tracker/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   └── index.css
└── README.md
```
