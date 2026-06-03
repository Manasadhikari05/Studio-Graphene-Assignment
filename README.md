# GitHub Repo Explorer

Hey! This is a full-stack web app I built to search for any GitHub user and check out their profile, repositories, and the coding languages they use.

## How it works

I didn't just connect the frontend straight to GitHub. Instead, I built a backend server that acts as a middleman (a proxy). 

When you search for a user:
1. The React frontend asks our backend for the data.
2. The backend securely talks to the GitHub API to get it.
3. The backend saves (caches) this data for 60 seconds. If someone searches for the exact same user again right away, it just sends the saved data instantly instead of asking GitHub again.

This is super important because it stops us from hitting GitHub's strict rate limits!

## Tech Stack

Here is what I used to build this project:
- **Frontend**: React, TypeScript, Vite, Tailwind CSS (for styling), and Recharts (for the language pie charts).
- **Backend**: Node.js, Express, and TypeScript.
- **Testing**: Vitest to write tests and make sure the code actually works.

## Features

- Search for any GitHub username
- View their profile info (avatar, followers, following, bio)
- Browse a list of their public repositories with pagination
- Sort repos by recently updated, most stars, or by name
- See a pie chart of the programming languages they use the most
- Click on a repo to see extra details like open issues and forks
- Saves your recent searches so you don't have to type them again
- Dark mode toggle!

## How to run this on your machine

You need to run both the frontend and the backend for this app to work.

### 1. Start the Backend
Open a terminal, go into the `backend` folder, and run:
```bash
npm install
npm run dev
```

### 2. Start the Frontend
Open a completely separate terminal window, go into the `frontend` folder, and run:
```bash
npm install
npm run dev
```

The website will pop up at `http://localhost:5173`.

**One small tip:** If you want to do a ton of searching without getting temporarily blocked by GitHub, you can create a file called `.env` inside the `backend` folder and add your own GitHub personal access token like this: `GITHUB_TOKEN=your_token_here`.
