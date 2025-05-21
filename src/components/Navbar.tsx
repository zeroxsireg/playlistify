'use client';

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Music, LogIn, LogOut } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Create Playlist", href: "/create" },
  { name: "My Playlists", href: "/playlists" },
];

export function Navbar({ session }: { session: Session | null }) {
  const pathname = usePathname();

  return (
    <nav className="bg-black/50 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center text-xl font-bold text-white"
            >
              <Music className="h-6 w-6 mr-2" />
              Plailistify
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        isActive
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            {session ? (
              <button
                onClick={() => signOut()}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => signIn("spotify")}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-500 rounded-md"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Sign In with Spotify
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 