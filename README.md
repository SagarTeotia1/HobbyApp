# HobbyApp

AI-powered hobby learning with a dopamine game loop: watch a short lesson, lock in a key insight, earn XP, and unlock the next topic.

## Why it exists
HobbyApp blends curated video lessons with AI-generated learning support so users can progress fast without getting stuck. It focuses on short, actionable knowledge steps and a clear sense of momentum.

## Core experience
- Pick a hobby and set your daily time + level
- Follow a visual roadmap of connected topics
- Watch a lesson video and absorb the key insight
- Earn XP and unlock the next node
- Open the AI tutor any time for help

## Tech stack
**Mobile (React Native CLI)**
- React Native 0.74
- TypeScript (strict)
- Zustand (state)
- TanStack Query (server state)
- MMKV (fast local storage)
- Zod (validation)

**Backend (Node + Express)**
- Node.js 20 + Express 5
- MongoDB Atlas (data)
- Upstash Redis (cache + queues)
- Groq Llama 3.1 8B Instant (fast AI)
- Gemini fallback (optional)

## Features
- Visual roadmap and learn graph for each topic
- Video learning feed with AI summaries
- XP, streaks, and progress tracking
- AI tutor that responds in real-time
- Redis caching for fast reads

## Project structure
```
HobbyApp/
├── mobile/    # React Native app
└── server/    # Node/Express API
```

## Quick start

### 1) Backend
```
cd server
npm install
npm run build
npm run dev
```

Create a `.env` in `server/` using the values in `.env.example`.

### 2) Mobile
```
cd mobile
npm install
npx react-native run-android
```

## Environment variables (server)
Use `.env.example` as a template and never commit secrets. Example keys:
```
NODE_ENV=development
PORT=3000
MONGODB_URI=your_mongodb_uri
UPSTASH_REDIS_URL=your_redis_url
UPSTASH_REDIS_TOKEN=your_redis_token
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_key
GROQ_MODEL_FAST=llama-3.1-8b-instant
AI_PROVIDER=groq
AI_FALLBACK_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_key
```

## API health check
After the server is running:
```
http://localhost:3000
http://localhost:3000/health
```

## Notes
- The app uses a strict module boundary architecture for clarity and scalability.
- All learning graphs, cards, and AI outputs are validated with Zod.
- Roadmap and feed data are cached and prefetched for speed.

## Contributing
PRs are welcome. Please keep code strict, typed, and aligned to the module boundaries.

## License
ISC
