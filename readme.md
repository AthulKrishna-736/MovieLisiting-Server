# Movie Listing Server (Backend)

A simple Node.js + Express backend for a Movie Listing application that allows users to search movies using the OMDB API and manage a list of favourite movies using server-side storage.

---

## Features

- Search movies using the OMDB API
- Add or remove movies from favourites
- Store favourites using server-side file storage
- No user authentication or login required
- Clean and simple REST APIs

---

## Tech Stack

- Node.js
- Express.js
- Axios
- CORS
- File-based storage

---

## Environment Variables

Create a `.env` file in the root of the backend project and add:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
OMDB_API_KEY=your_omdb_api_key_here
OMDB_URL=https://www.omdbapi.com
```
---

## Project Setup

```npm init -y```

```npm install```

```npm run start```
