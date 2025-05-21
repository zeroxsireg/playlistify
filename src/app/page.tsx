import { getServerSession } from "next-auth";
import Link from "next/link";
import { Music, Sparkles, Users, Brain } from "lucide-react";

const features = [
  {
    name: "AI-Powered Recommendations",
    description:
      "Our advanced AI understands your music taste and creates personalized playlists just for you.",
    icon: Brain,
  },
  {
    name: "Discover New Music",
    description:
      "Find fresh sounds and hidden gems that match your taste perfectly.",
    icon: Sparkles,
  },
  {
    name: "Similar Artist Discovery",
    description:
      "Start with your favorite artists and discover new ones you'll love.",
    icon: Users,
  },
  {
    name: "Seamless Spotify Integration",
    description:
      "Create and save playlists directly to your Spotify account with one click.",
    icon: Music,
  },
];

export default async function Home() {
  const session = await getServerSession();

  return (
    <div className="relative isolate">
      {/* Hero section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Create AI-Powered Spotify Playlists
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Experience the future of music discovery. Our AI technology crafts
              personalized Spotify playlists that perfectly match your mood,
              introducing you to fresh sounds and timeless tunes.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {session ? (
                <Link
                  href="/create"
                  className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
                  Create Playlist
                </Link>
              ) : (
                <Link
                  href="/api/auth/signin"
                  className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Get Started
                </Link>
              )}
              <Link
                href="#features"
                className="text-sm font-semibold leading-6 text-white"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-green-600">
              Features
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to create the perfect playlist
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Whether you're looking for upbeat workout music or chill evening
              vibes, just describe what you want and we'll create the perfect
              playlist.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                    <feature.icon
                      className="h-5 w-5 flex-none text-green-600"
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
