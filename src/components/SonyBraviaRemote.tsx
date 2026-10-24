import React, { useState } from 'react';
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Undo2,
  Home,
  Play,
  Volume2,
  VolumeX,
  FastForward,
  Rewind,
  Subtitles,
  Settings,
  Tv,
  Mic,
  Maximize2,
  Minimize2,
  Keyboard
} from 'lucide-react';

interface SonyBraviaRemoteProps {
  onDpadUp: () => void;
  onDpadDown: () => void;
  onDpadLeft: () => void;
  onDpadRight: () => void;
  onSelect: () => void;
  onBack: () => void;
  onHome: () => void;
  onPlayPause: () => void;
  onSeekForward: () => void;
  onSeekBackward: () => void;
  onToggleSubtitles: () => void;
  onOpenSettings: () => void;
}

export const SonyBraviaRemote: React.FC<SonyBraviaRemoteProps> = ({
  onDpadUp,
  onDpadDown,
  onDpadLeft,
  onDpadRight,
  onSelect,
  onBack,
  onHome,
  onPlayPause,
  onSeekForward,
  onSeekBackward,
  onToggleSubtitles,
  onOpenSettings,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showKeyHints, setShowKeyHints] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <aside
      aria-label="Sony Bravia TV Remote Controller"
      className="fixed right-4 bottom-4 z-50 flex flex-col items-end select-none pointer-events-auto"
    >
      {/* Remote Toggle Pill (Monochrome) */}
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={() => setShowKeyHints(!showKeyHints)}
          title="Remote Keyboard Shortcuts"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 backdrop-blur-md border border-white/10 text-xs text-zinc-300 hover:text-white shadow-lg cursor-pointer transition-all"
        >
          <Keyboard className="w-3.5 h-3.5 text-zinc-300" />
          <span>Keys</span>
        </button>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 backdrop-blur-md border border-white/10 text-xs text-zinc-300 hover:text-white shadow-lg cursor-pointer transition-all"
        >
          <Tv className="w-3.5 h-3.5 text-zinc-300" />
          <span>{isCollapsed ? 'Show Bravia Remote' : 'Hide Remote'}</span>
          {isCollapsed ? (
            <Maximize2 className="w-3 h-3 text-zinc-500" />
          ) : (
            <Minimize2 className="w-3 h-3 text-zinc-500" />
          )}
        </button>
      </div>

      {/* Keyboard Shortcuts Overlay Card */}
      {showKeyHints && (
        <div className="mb-3 w-72 p-3.5 rounded-2xl bg-zinc-950/95 backdrop-blur-xl border border-zinc-800 shadow-2xl text-xs text-zinc-300">
          <div className="font-semibold text-white mb-2 flex items-center justify-between border-b border-zinc-800 pb-1.5">
            <span>D-Pad Remote Shortcuts</span>
            <span className="text-[10px] text-zinc-400 font-mono">Velvia TV</span>
          </div>
          <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Navigate:</span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 font-mono text-[10px] text-white">↑ ↓ ← →</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">OK / Select:</span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 font-mono text-[10px] text-white">Enter</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Back:</span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 font-mono text-[10px] text-white">Esc / Bksp</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Play/Pause:</span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 font-mono text-[10px] text-white">Space</kbd>
            </div>
          </div>
        </div>
      )}

      {/* Sony Bravia Physical Remote Body (Pure Monochrome Charcoal/Black) */}
      {!isCollapsed && (
        <div className="w-56 p-4 rounded-3xl bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border border-zinc-800 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.95)] flex flex-col items-center">
          {/* Top Sony / Velvia TV Brand */}
          <div className="w-full flex items-center justify-between px-2 mb-3">
            <span className="text-[10px] font-extrabold tracking-[0.25em] text-zinc-400">SONY</span>
            <span className="text-[9px] font-semibold text-zinc-400 tracking-widest">VELVIA TV</span>
          </div>

          {/* Power & TV Input Row */}
          <div className="w-full flex items-center justify-between px-2 mb-4">
            <button
              onClick={() => onHome()}
              title="Power / Home"
              className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white active:scale-95 transition-all cursor-pointer"
            >
              <Tv className="w-3.5 h-3.5" />
            </button>
            <button
              title="Google Assistant"
              className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white active:scale-95 transition-all cursor-pointer"
            >
              <Mic className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenSettings}
              title="Settings"
              className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white active:scale-95 transition-all cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Circular Monochrome D-Pad Controller */}
          <div className="relative w-40 h-40 rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 border-2 border-zinc-700 shadow-[inset_0_2px_8px_rgba(255,255,255,0.06),0_10px_20px_rgba(0,0,0,0.8)] flex items-center justify-center mb-4">
            {/* D-Pad Up */}
            <button
              onClick={onDpadUp}
              title="D-Pad Up"
              className="absolute top-1.5 w-14 h-9 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 active:scale-95 rounded-t-full transition-all cursor-pointer"
            >
              <ChevronUp className="w-5 h-5" />
            </button>

            {/* D-Pad Down */}
            <button
              onClick={onDpadDown}
              title="D-Pad Down"
              className="absolute bottom-1.5 w-14 h-9 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 active:scale-95 rounded-b-full transition-all cursor-pointer"
            >
              <ChevronDown className="w-5 h-5" />
            </button>

            {/* D-Pad Left */}
            <button
              onClick={onDpadLeft}
              title="D-Pad Left"
              className="absolute left-1.5 w-9 h-14 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 active:scale-95 rounded-l-full transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* D-Pad Right */}
            <button
              onClick={onDpadRight}
              title="D-Pad Right"
              className="absolute right-1.5 w-9 h-14 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 active:scale-95 rounded-r-full transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Center OK / Select Button (High Contrast White / Black) */}
            <button
              onClick={onSelect}
              title="OK / Select"
              className="w-16 h-16 rounded-full bg-white border border-zinc-300 flex flex-col items-center justify-center text-black hover:bg-zinc-200 active:scale-90 shadow-lg transition-all cursor-pointer group"
            >
              <span className="text-xs font-black tracking-wider group-hover:scale-110 transition-transform">OK</span>
            </button>
          </div>

          {/* Back & Home Functional Navigation Buttons */}
          <div className="w-full grid grid-cols-2 gap-3 px-1 mb-4">
            <button
              onClick={onBack}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-medium text-zinc-200 active:scale-95 transition-all cursor-pointer"
            >
              <Undo2 className="w-3.5 h-3.5 text-zinc-300" />
              <span>Back</span>
            </button>
            <button
              onClick={onHome}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-medium text-zinc-200 active:scale-95 transition-all cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-zinc-300" />
              <span>Home</span>
            </button>
          </div>

          {/* Media Playback Control Row */}
          <div className="w-full flex items-center justify-between px-1 mb-3 pt-1 border-t border-zinc-800">
            <button
              onClick={onSeekBackward}
              title="Rewind 10s"
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 active:scale-90 transition-all cursor-pointer"
            >
              <Rewind className="w-4 h-4" />
            </button>
            <button
              onClick={onPlayPause}
              title="Play / Pause"
              className="w-9 h-9 rounded-full bg-white hover:bg-zinc-200 text-black flex items-center justify-center active:scale-90 shadow-md transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-black translate-x-0.5" />
            </button>
            <button
              onClick={onSeekForward}
              title="Forward 10s"
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 active:scale-90 transition-all cursor-pointer"
            >
              <FastForward className="w-4 h-4" />
            </button>
            <button
              onClick={onToggleSubtitles}
              title="Subtitles (CC)"
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 active:scale-90 transition-all cursor-pointer"
            >
              <Subtitles className="w-4 h-4" />
            </button>
          </div>

          {/* Volume Mute Indicator */}
          <div className="w-full flex items-center justify-between px-2 pt-2 border-t border-zinc-800 text-[11px] text-zinc-400">
            <span>VOL</span>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="flex items-center gap-1 text-zinc-400 hover:text-white cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-200" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isMuted ? 'Muted' : 'TV Audio'}</span>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
