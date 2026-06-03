# GitHub Repo Explorer

A simple application to search for GitHub users and view their profiles and repositories.

## How to run

1. **Backend**
   Open a terminal, go to the `backend` folder and run:
   ```bash
   npm install
   npm run dev
   ```

2. **Frontend**
   Open another terminal, go to the `frontend` folder and run:
   ```bash
   npm install
   npm run dev
   ```

The app will run at `http://localhost:5173`.

*(Optional: Create a `.env` file in the backend folder and add your `GITHUB_TOKEN=your_token_here` if you want to avoid rate limits).*

## Features
- Search GitHub users
- View repositories (sorted by latest, stars, name)
- See what languages they use the most
- Dark mode
- Saves your recent searches
