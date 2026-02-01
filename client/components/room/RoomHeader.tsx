import React from "react";

type Props = {
  roomId: string;
  isConnected: boolean;
  collaborators: number;
  totalNotes: number;
  onUndo: () => void;
  onAddNote: () => void;
  onCopyLink: () => void;
  copied: boolean;
};

const RoomHeader: React.FC<Props> = ({
  roomId,
  isConnected,
  collaborators,
  totalNotes,
  onUndo,
  onAddNote,
  onCopyLink,
  copied,
}) => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm flex items-center justify-between px-8 animate-slide-down">
      <div className="flex items-center gap-6">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            {/* icon */}
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Collaborative Board
            </h1>

            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    isConnected
                      ? "bg-emerald-500 animate-pulse-slow"
                      : "bg-gray-400"
                  }`}
                />
                {isConnected ? "Connected" : "Disconnected"}
              </div>

              {collaborators > 0 && (
                <>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs text-gray-500">
                    {collaborators} {collaborators === 1 ? "person" : "people"}{" "}
                    online
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Room ID Section */}
        <div className="h-10 w-px bg-gray-200" />

        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
          <code className="text-xs font-mono text-gray-600 select-all">
            {roomId.slice(0, 8)}...
          </code>

          <button
            onClick={onCopyLink}
            className="ml-1 text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            {copied ? "✓ Copied" : "Copy link"}
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <div className="text-right mr-2">
          <div className="text-xs text-gray-500">Total notes</div>
          <div className="text-lg font-bold text-gray-900">{totalNotes}</div>
        </div>

        <button
          onClick={onUndo}
          className="group px-4 py-2.5 rounded-xl bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-all border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow flex items-center gap-2"
        >
          Undo
        </button>

        <button
          onClick={onAddNote}
          className="btn-ripple px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
        >
          Add Note
        </button>
      </div>
    </header>
  );
};

export default RoomHeader;
