# Requirements Document — GitHub Repo Explorer

## Functional Requirements

### Must-Have (MVP)

1. **User Search**
   - Search GitHub users by username
   - Frontend never calls GitHub API directly

2. **User Profile Display**
   - Avatar, name, bio
   - Followers count, following count
   - Public repositories count

3. **Repository Listing**
   - Repository name, description
   - Primary language, star count
   - Last updated date

4. **Sorting**
   - Sort by stars (desc)
   - Sort by name (asc)
   - Sort by updated date (desc)

5. **Error Handling**
   - User not found (404)
   - GitHub rate limit exceeded (403)
   - Network failures

6. **Loading States**
   - Skeleton loaders for profile and repo cards
   - Loading indicators during data fetch

7. **Backend Caching**
   - NodeCache with 60-second TTL
   - Cache keyed by request URL

8. **Pagination**
   - Load More button or page numbers
   - GitHub API pagination support (page, per_page params)

9. **Repository Expansion**
   - Expand repo card to show fork count, open issues, default branch

### Bonus Features

10. **Recently Searched Users**
    - Store in localStorage
    - Show last 5 searches

11. **Language Analytics**
    - Pie chart of language distribution across repos
    - Color-coded by language

12. **Debounced Search**
    - 500ms debounce on search input
    - Cancel in-flight requests

13. **Dark Mode**
    - Toggle switch in navbar
    - Persist preference in localStorage

14. **Responsive Design**
    - Mobile, tablet, desktop breakpoints

15. **Copy Repository URL**
    - One-click copy to clipboard

## Non-Functional Requirements

- TypeScript throughout (frontend & backend)
- Clean architecture with separation of concerns
- Conventional commit messages
- Feature branch workflow
- Unit and integration tests
- Production-ready error boundaries

## API Design

### Backend Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/github/user/:username` | Fetch user profile |
| GET | `/api/github/repos/:username` | Fetch user repositories |

### Query Parameters for `/api/github/repos/:username`

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `sort` | string | `updated` | Sort field (stars, name, updated) |
| `page` | number | `1` | Page number |
| `per_page` | number | `10` | Results per page |
