# Plailistify - AI-Powered Spotify Playlist Generator

Create personalized Spotify playlists using AI technology. This application helps you discover new music and create perfect playlists based on your preferences, mood, and listening history.

## Features

- Create AI playlists based on your music taste
- Generate playlists from your favorite songs
- Find similar artists automatically
- Natural language playlist generation
- Seamless Spotify integration
- Smart song selection
- Personalized results

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Spotify Web API
- OpenAI API
- NextAuth.js for authentication

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with the following variables:
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   
   SPOTIFY_CLIENT_ID=your-spotify-client-id
   SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
   
   OPENAI_API_KEY=your-openai-api-key
   ```
4. Run the development server:
```bash
npm run dev
   ```

## Setup Requirements

1. Spotify Developer Account
   - Create an app at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Add `http://localhost:3000/api/auth/callback/spotify` to the Redirect URIs

2. OpenAI API Key
   - Get your API key from [OpenAI Platform](https://platform.openai.com)

## License

MIT
