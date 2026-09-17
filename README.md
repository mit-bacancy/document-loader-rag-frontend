# RAG Chat Agent — Frontend

## What this does

The chat interface where a user uploads a document and asks questions about it. Messages are sent to the backend, which answers using only the content of the uploaded document.

## Tech stack

Next.js + React + Tailwind CSS.

## Setup

### 1. Prerequisites

- Node.js 20+
- The backend service running (see `backend/README.md`)

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in this folder:

```
NEXT_PUBLIC_BACKENCD_URL=http://localhost:8000
```

(Point this at wherever the backend is running.)

### 4. Run the app

```bash
npm run dev
```

App runs at `http://localhost:3000`.

## Notes

- `.env` is gitignored — never commit it.
- `npm run build` + `npm run start` for a production build.
