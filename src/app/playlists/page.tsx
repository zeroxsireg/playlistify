'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Music, Loader2 } from "lucide-react";

interface Playlist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  external_urls: { spotify: string };
  tracks: { total: number };
}

export default function Playlists() {
  const { data: session } = useSession();
  const router = useRouter();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session) {
      router.push("/api/auth/signin");
      return;
    }

    const fetchPlaylists = async () => {
      try {
        const response = await fetch("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch playlists");
        }

        const data = await response.json();
        setPlaylists(data.items.filter((playlist: Playlist) => 
          playlist.name.startsWith("AI Playlist:")
        ));
      } catch (error) {
        console.error("Error fetching playlists:", error);
        setError("Failed to load playlists");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [session, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="rounded-md bg-red-500/10 border border-red-500 p-4">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (playlists.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <Music className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-white">No playlists</h3>
        <p className="mt-1 text-sm text-gray-400">
          Get started by creating your first AI-generated playlist.
        </p>
        <div className="mt-6">
          <button
            onClick={() => router.push("/create")}
            className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Create Playlist
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Your AI Playlists</h1>
        <button
          onClick={() => router.push("/create")}
          className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Create New Playlist
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {playlists.map((playlist) => (
          <a
            key={playlist.id}
            href={playlist.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block bg-black/30 rounded-lg overflow-hidden hover:bg-black/50 transition"
          >
            <div className="aspect-square">
              {playlist.images[0] ? (
                <img
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-900">
                  <Music className="h-12 w-12 text-gray-600" />
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-white truncate">
                {playlist.name.replace("AI Playlist:", "").trim()}
              </h3>
              <p className="mt-1 text-sm text-gray-400 line-clamp-2">
                {playlist.description || `${playlist.tracks.total} tracks`}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
} 