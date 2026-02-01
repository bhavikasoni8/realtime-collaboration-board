"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "@/styles/Dashboard.css";

export default function DashboardPage() {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const [recentRooms, setRecentRooms] = useState<
    Array<{ id: string; name: string; lastVisited: Date }>
  >([]);
  const [userName, setUserName] = useState("User");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    // Load recent rooms from localStorage
    const stored = localStorage.getItem("recentRooms");
    if (stored) {
      setRecentRooms(JSON.parse(stored));
    }

    // Get user name from localStorage or cookie
    const name = localStorage.getItem("userName") || "User";
    setUserName(name);
  }, []);

  const createRoom = () => {
    const newRoomId = crypto.randomUUID();
    saveRecentRoom(newRoomId, "Untitled Board");
    router.push(`/room/${newRoomId}`);
  };

  const joinRoom = () => {
    if (!roomId.trim()) return;
    saveRecentRoom(roomId, "Joined Board");
    router.push(`/room/${roomId}`);
  };

  const saveRecentRoom = (id: string, name: string) => {
    const newRoom = { id, name, lastVisited: new Date() };
    const updated = [newRoom, ...recentRooms.filter((r) => r.id !== id)].slice(
      0,
      5
    );
    setRecentRooms(updated);
    localStorage.setItem("recentRooms", JSON.stringify(updated));
  };

  const copyRoomId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-white">
              Collaborative Board
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-sm font-bold">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="text-white font-medium">{userName}</span>
            </div>
            <button
              onClick={() => router.push("/")}
              className="glass px-4 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column - Quick actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Welcome card */}
            <div className="glass rounded-2xl p-6 border-2 border-white/10 animate-fade-in">
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome back, {userName}! 👋
                </h1>
                <p className="text-indigo-200">
                  Start collaborating with your team in real-time
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="glass rounded-xl p-4 border border-white/10">
                  <div className="text-2xl font-bold text-white">
                    {recentRooms.length}
                  </div>
                  <div className="text-xs text-indigo-200 mt-1">
                    Recent Rooms
                  </div>
                </div>
                <div className="glass rounded-xl p-4 border border-white/10">
                  <div className="text-2xl font-bold text-white">∞</div>
                  <div className="text-xs text-indigo-200 mt-1">
                    Unlimited Boards
                  </div>
                </div>
              </div>
            </div>

            {/* Create room card */}
            <div
              className="glass rounded-2xl p-6 border-2 border-white/10 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Create New Room
                  </h3>
                  <p className="text-sm text-indigo-200">Start a fresh board</p>
                </div>
              </div>

              <button
                onClick={createRoom}
                className="group relative w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/40 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Create Room</span>
                </div>
              </button>
            </div>

            {/* Join room card */}
            <div
              className="glass rounded-2xl p-6 border-2 border-white/10 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Join Room</h3>
                  <p className="text-sm text-indigo-200">Enter a room ID</p>
                </div>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Paste room ID here..."
                  className="w-full px-4 py-3.5 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-indigo-300/50 focus:border-blue-400 focus:bg-white/15 outline-none transition-all duration-300 input-glow"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && joinRoom()}
                />

                <button
                  onClick={joinRoom}
                  disabled={!roomId.trim()}
                  className="group w-full py-3.5 rounded-xl glass border-2 border-white/20 font-semibold text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  <span>Join Room</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right column - Recent rooms */}
          <div className="lg:col-span-2">
            <div
              className="glass rounded-2xl p-6 border-2 border-white/10 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Recent Rooms
                  </h2>
                  <p className="text-sm text-indigo-200 mt-1">
                    Quick access to your boards
                  </p>
                </div>
                <button className="glass px-4 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all text-sm font-medium">
                  View All
                </button>
              </div>

              {recentRooms.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-indigo-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    No recent rooms
                  </h3>
                  <p className="text-indigo-200 text-sm">
                    Create or join a room to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentRooms.map((room, index) => (
                    <div
                      key={room.id}
                      className="group glass rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] cursor-pointer animate-slide-in-left"
                      style={{ animationDelay: `${0.1 * index}s` }}
                      onClick={() => router.push(`/room/${room.id}`)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                            <svg
                              className="w-6 h-6 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold truncate">
                              {room.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <code className="text-xs font-mono text-indigo-300 bg-white/5 px-2 py-0.5 rounded">
                                {room.id.slice(0, 8)}...
                              </code>
                              <span className="text-xs text-indigo-300">•</span>
                              <span className="text-xs text-indigo-300">
                                {formatDate(room.lastVisited)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyRoomId(room.id);
                            }}
                            className="p-2 glass rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all"
                            title="Copy room ID"
                          >
                            {copied === room.id ? (
                              <svg
                                className="w-5 h-5 text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                              </svg>
                            )}
                          </button>
                          <svg
                            className="w-5 h-5 text-white/40 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Features grid */}
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div
                className="glass rounded-xl p-4 border border-white/10 animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-3">
                  <svg
                    className="w-5 h-5 text-indigo-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">
                  Real-time Sync
                </h3>
                <p className="text-indigo-200 text-xs">
                  Instant updates across all users
                </p>
              </div>

              <div
                className="glass rounded-xl p-4 border border-white/10 animate-fade-in"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3">
                  <svg
                    className="w-5 h-5 text-purple-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">
                  Secure Rooms
                </h3>
                <p className="text-indigo-200 text-xs">
                  Private collaboration spaces
                </p>
              </div>

              <div
                className="glass rounded-xl p-4 border border-white/10 animate-fade-in"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center mb-3">
                  <svg
                    className="w-5 h-5 text-pink-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">
                  Team Ready
                </h3>
                <p className="text-indigo-200 text-xs">
                  Unlimited collaborators
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
