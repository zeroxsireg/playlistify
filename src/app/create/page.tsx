'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Music2, Sparkles, Users } from "lucide-react";

type GenerationMethod = "description" | "similar" | "mood";

export default function CreatePlaylist() {
  const { data: session } = useSession();
  const router = useRouter();
  const [method, setMethod] = useState<GenerationMethod>("description");
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      router.push("/api/auth/signin");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method,
          input,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to generate playlist");
      }

      const data = await response.json();
      router.push(`/playlists`);
    } catch (error) {
      console.error("Error generating playlist:", error);
      setError(
        error instanceof Error ? error.message : "Failed to generate playlist"
      );
    } finally {
      setLoading(false);
    }
  };

  const methods = [
    {
      id: "description" as const,
      name: "Natural Language",
      description: "Describe the type of playlist you want to create",
      icon: Sparkles,
      placeholder: "e.g., 'Upbeat indie rock for a road trip' or 'Chill electronic music for studying'",
    },
    {
      id: "similar" as const,
      name: "Similar Artists",
      description: "Enter artist names to find similar music",
      icon: Users,
      placeholder: "e.g., 'The Beatles, Pink Floyd, Led Zeppelin'",
    },
    {
      id: "mood" as const,
      name: "Mood Based",
      description: "Describe your current mood or vibe",
      icon: Music2,
      placeholder: "e.g., 'Happy and energetic' or 'Relaxed and peaceful'",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Create Your Playlist</h1>
        <p className="mt-2 text-gray-400">
          Choose how you want to generate your playlist
        </p>
      </div>

      <div className="mt-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {methods.map((option) => (
            <button
              key={option.id}
              onClick={() => setMethod(option.id)}
              className={`relative flex flex-col items-center p-4 rounded-lg border ${
                method === option.id
                  ? "border-green-500 bg-green-500/10"
                  : "border-gray-700 hover:border-gray-600"
              }`}
            >
              <option.icon
                className={`h-6 w-6 ${
                  method === option.id ? "text-green-500" : "text-gray-400"
                }`}
              />
              <h3 className="mt-2 font-semibold">{option.name}</h3>
              <p className="mt-1 text-sm text-gray-400">{option.description}</p>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label
            htmlFor="input"
            className="block text-sm font-medium text-gray-300"
          >
            {methods.find((m) => m.id === method)?.description}
          </label>
          <textarea
            id="input"
            name="input"
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 text-white shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2"
            placeholder={methods.find((m) => m.id === method)?.placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {error && (
          <div className="rounded-md bg-red-500/10 border border-red-500 p-4">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Generating..." : "Generate Playlist"}
        </button>
      </form>
    </div>
  );
} 