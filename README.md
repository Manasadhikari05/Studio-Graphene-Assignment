# GitHub Repo Explorer

A full-stack application to search GitHub users and explore their repositories, built with React and Express.

## Overview

GitHub Repo Explorer lets you search any GitHub username and view:

- **Profile information** — avatar, name, bio, followers, following, public repo count
- **Repository listing** — name, description, language, stars, last updated
- **Repository analytics** — language distribution charts
- **Search history** — recently searched users

The frontend communicates exclusively through the Express backend, which acts as a proxy to the GitHub API with server-side caching.

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Query (TanStack Query)
- Recharts
- Axios

### Backend
- Node.js
- Express
- TypeScript
- Axios
- NodeCache

### Testing
- Vitest
- React Testing Library
- Supertest

## Architecture

```
User → React Frontend → Express Backend → GitHub API
                                ↕
                          Cache Layer (60s TTL)
```

The backend proxy architecture provides:
- **Rate limit protection** — caches responses to reduce GitHub API calls
- **Unified error handling** — consistent error responses for the frontend
- **Security** — API tokens stay on the server, never exposed to the client

## Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/Manasadhikari05/Studio-Graphene-Assignment.git
cd Studio-Graphene-Assignment

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running Locally

```bash
# Start the backend (from /backend)
npm run dev

# Start the frontend (from /frontend)
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:5000`.

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
GITHUB_TOKEN=your_github_personal_access_token  # optional, increases rate limit
```

## Project Structure

```
├── frontend/               # React frontend
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Page-level components
│       ├── hooks/          # Custom React hooks
│       ├── services/       # API service layer
│       ├── context/        # React context providers
│       ├── types/          # TypeScript type definitions
│       └── utils/          # Utility functions
│
├── backend/                # Express backend
│   └── src/
│       ├── routes/         # API route definitions
│       ├── controllers/    # Request handlers
│       ├── services/       # Business logic & GitHub API calls
│       ├── middlewares/    # Express middleware
│       ├── cache/          # Cache configuration
│       ├── types/          # TypeScript type definitions
│       └── utils/          # Utility functions
```

## Features

- [x] GitHub user search
- [x] User profile display
- [x] Repository listing with sorting
- [x] Server-side caching (60s TTL)
- [x] Pagination (Load More)
- [x] Repository details expansion
- [x] Language analytics chart
- [x] Recently searched users
- [x] Debounced search
- [x] Dark mode with persistence
- [x] Responsive design
- [x] Loading skeletons
- [x] Error handling

## License

MIT
