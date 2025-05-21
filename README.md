# Playlistify - AI-Powered Spotify Playlist Generator

Playlistify is a modern web application that leverages artificial intelligence to create personalized Spotify playlists. By combining the power of OpenAI's language models with Spotify's extensive music library, Playlistify helps you discover new music and create the perfect playlists based on your preferences, mood, or any description you provide.

## ✨ Features

- **AI-Powered Playlist Generation**: Describe your mood, occasion, or musical preferences, and let our AI create the perfect playlist
- **Spotify Integration**: Seamless connection with your Spotify account for instant playlist creation and saving
- **Smart Music Discovery**: Find new artists and songs that match your taste using advanced recommendation algorithms
- **Natural Language Input**: Simply describe what you want in plain English, and let the AI do the work
- **Modern UI/UX**: Beautiful, responsive interface built with Next.js and Tailwind CSS
- **Secure Authentication**: Safe and secure login through Spotify using NextAuth.js

## 🚀 Tech Stack

- **Frontend**: Next.js 15 with App Router, React 19
- **Styling**: Tailwind CSS, HeadlessUI
- **Authentication**: NextAuth.js
- **APIs**: 
  - Spotify Web API (music data and playlist management)
  - OpenAI API (natural language processing)
- **Language**: TypeScript
- **Icons**: Lucide React, Heroicons

## 🛠️ Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn
- Spotify Developer Account
- OpenAI API Account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/zeroxsireg/playlistify.git
   cd playlistify
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret-key
   
   SPOTIFY_CLIENT_ID=your-spotify-client-id
   SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
   
   OPENAI_API_KEY=your-openai-api-key
   ```

4. Set up Spotify Developer Account:
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new application
   - Add `http://localhost:3000/api/auth/callback/spotify` to the Redirect URIs
   - Copy the Client ID and Client Secret to your `.env.local` file

5. Set up OpenAI API:
   - Visit [OpenAI Platform](https://platform.openai.com)
   - Create an account or sign in
   - Generate an API key
   - Copy the API key to your `.env.local` file

6. Start the development server:
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## 🔒 Security Notes

- Never commit your `.env.local` file
- Keep your API keys secure and rotate them regularly
- Use environment variables for all sensitive information

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
