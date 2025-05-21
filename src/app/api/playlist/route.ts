import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { SpotifyAPI } from "@/lib/spotify";
import {
  generatePlaylistDescription,
  generatePlaylistFromDescription,
  suggestSimilarArtists,
} from "@/lib/openai";

export async function POST(request: Request) {
  const session = await getServerSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { method, input } = await request.json();

    if (!method || !input) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const accessToken = session.accessToken as string;

    const tracks: string[] = [];
    let description = "";

    switch (method) {
      case "description": {
        description = await generatePlaylistDescription(input);
        const suggestions = await generatePlaylistFromDescription(input);
        
        // Search for each suggested song on Spotify
        for (const suggestion of suggestions) {
          const searchResults = await SpotifyAPI.searchTracks(
            accessToken,
            suggestion,
            1
          );
          if (searchResults.length > 0) {
            tracks.push(searchResults[0].uri);
          }
        }
        break;
      }

      case "similar": {
        const artists = input.split(",").map((a: string) => a.trim());
        const similarArtists = await suggestSimilarArtists(artists);
        
        // Search for top tracks from each artist
        for (const artist of [...artists, ...similarArtists]) {
          const searchResults = await SpotifyAPI.searchTracks(
            accessToken,
            `artist:${artist}`,
            3
          );
          tracks.push(...searchResults.map((track) => track.uri));
        }
        description = `A playlist featuring ${artists.join(", ")} and similar artists.`;
        break;
      }

      case "mood": {
        description = await generatePlaylistDescription(input);
        const suggestions = await generatePlaylistFromDescription(
          `Songs that match the mood: ${input}`
        );
        
        // Search for each suggested song on Spotify
        for (const suggestion of suggestions) {
          const searchResults = await SpotifyAPI.searchTracks(
            accessToken,
            suggestion,
            1
          );
          if (searchResults.length > 0) {
            tracks.push(searchResults[0].uri);
          }
        }
        break;
      }

      default:
        return NextResponse.json(
          { error: "Invalid generation method" },
          { status: 400 }
        );
    }

    // Create the playlist
    const playlist = await SpotifyAPI.createPlaylist(
      session.user.id,
      accessToken,
      `AI Playlist: ${input.slice(0, 30)}...`,
      description,
      tracks
    );

    return NextResponse.json({ playlist });
  } catch (error) {
    console.error("Error generating playlist:", error);
    return NextResponse.json(
      { error: "Failed to generate playlist" },
      { status: 500 }
    );
  }
} 