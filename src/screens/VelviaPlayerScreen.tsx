import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Subtitles as SubtitlesIcon,
  Music,
  Settings,
  Maximize,
  ArrowLeft,
  Check,
  RotateCcw,
  RotateCw,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { StreamingSource } from '../types/media';

export interface VelviaPlayerScreenProps {
  streamSource: StreamingSource;
  title: string;
  onExit: () => void;
}

const SUBTITLE_OPTIONS = [
  'Off',
  'English',
  'French',
  'German',
  'Chinese (Simplified)',
  'Spanish'
];

export const VelviaPlayerScreen: React.FC<VelviaPlayerScreenProps> = ({
  streamSource,
  title,
  onExit,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSubtitlePopover, setShowSubtitlePopover] = useState(false);
  const [selectedSubtitle, setSelectedSubtitle] = useState('Off');
  const [focusedPopoverIndex, setFocusedPopoverIndex] = useState(0);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetControlsTimer = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying && !showSubtitlePopover) {
        setShowControls(false);
      }
    }, 4500);
  };

  useEffect(() => {
    resetControlsTimer();
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying, showSubtitlePopover]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    resetControlsTimer();
  };

  const handleSeek = (secs: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + secs));
    resetControlsTimer();
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Remote key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      resetControlsTimer();
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          handleSeek(-10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleSeek(10);
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (showSubtitlePopover) {
            setFocusedPopoverIndex((prev) => Math.max(0, prev - 1));
          } else {
            setShowControls(true);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (showSubtitlePopover) {
            setFocusedPopoverIndex((prev) => Math.min(SUBTITLE_OPTIONS.length - 1, prev + 1));
          } else {
            setShowControls(true);
          }
          break;
        case ' ':
        case 'Enter':
          e.preventDefault();
          if (showSubtitlePopover) {
            setSelectedSubtitle(SUBTITLE_OPTIONS[focusedPopoverIndex]);
            setShowSubtitlePopover(false);
          } else {
            togglePlay();
          }
          break;
        case 'Escape':
        case 'Backspace':
          e.preventDefault();
          if (showSubtitlePopover) {
            setShowSubtitlePopover(false);
          } else {
            onExit();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSubtitlePopover, focusedPopoverIndex, duration, isPlaying]);

  return (
    <div
      onMouseMove={resetControlsTimer}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center select-none overflow-hidden"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={streamSource.url}
        autoPlay
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={() => videoRef.current && setCurrentTime(videoRef.current.currentTime)}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration);
            setIsBuffering(false);
          }
        }}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => setIsBuffering(false)}
        onError={() => {
          setIsBuffering(false);
          setHasError(true);
        }}
        className="w-full h-full object-contain"
      />

      {/* Buffering Indicator */}
      {isBuffering && !hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-20">
          <div className="w-12 h-12 border-3 border-white/20 border-t-white rounded-full animate-spin mb-3" />
          <span className="text-white text-xs font-semibold tracking-wider">
            Loading {streamSource.quality}...
          </span>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-30 p-6">
          <div className="max-w-md bg-[#161822] border border-white/10 js-radius p-6 text-center">
            <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-white mb-2">Stream Playback Error</h4>
            <p className="text-xs text-slate-300 mb-6">
              Could not load media stream from server.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setHasError(false);
                  setIsBuffering(true);
                  videoRef.current?.load();
                  videoRef.current?.play().catch(() => {});
                }}
                className="px-4 py-2 js-radius bg-white text-slate-900 text-xs font-bold cursor-pointer"
              >
                Retry
              </button>
              <button
                onClick={onExit}
                className="px-4 py-2 js-radius bg-white/10 text-white text-xs font-semibold cursor-pointer"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subtitles Close Caption Popover (JetStream PDF Page 10) */}
      {showSubtitlePopover && (
        <div className="absolute right-14 bottom-24 w-60 bg-[#1c1f2b]/95 backdrop-blur-2xl border border-white/15 js-radius p-3 shadow-2xl z-40 animate-fadeIn">
          <div className="px-3 py-1.5 text-xs font-bold text-slate-400 border-b border-white/10 mb-1">
            Subtitles
          </div>
          <div className="space-y-0.5">
            {SUBTITLE_OPTIONS.map((sub, idx) => {
              const isSelected = selectedSubtitle === sub;
              const isFocused = focusedPopoverIndex === idx;

              return (
                <button
                  key={sub}
                  onClick={() => {
                    setSelectedSubtitle(sub);
                    setShowSubtitlePopover(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 js-radius text-xs cursor-pointer transition-colors ${
                    isFocused
                      ? 'tv-focused-button bg-white text-slate-900 font-bold'
                      : 'text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <span>{sub}</span>
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* JetStream Video Player OSD Overlay (PDF Page 10) */}
      <div
        className={`absolute inset-0 flex flex-col justify-between p-10 bg-gradient-to-t from-black/90 via-transparent to-black/60 transition-opacity duration-300 pointer-events-none ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Top Exit button */}
        <div className="pointer-events-auto">
          <button
            onClick={onExit}
            className="flex items-center gap-2 px-3 py-1.5 js-radius bg-black/60 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md cursor-pointer border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>

        {/* Bottom Playback Section (JetStream Page 10) */}
        <div className="pointer-events-auto w-full max-w-5xl mx-auto space-y-3">
          {/* Title on Left, Action Icons on Right */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-tight drop-shadow">
              {title}
            </h2>

            <div className="flex items-center gap-3">
              {/* Subtitles Button */}
              <button
                onClick={() => setShowSubtitlePopover(!showSubtitlePopover)}
                className={`p-2.5 js-radius cursor-pointer transition-all ${
                  showSubtitlePopover || selectedSubtitle !== 'Off'
                    ? 'bg-white text-slate-900 font-bold'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                title="Subtitles"
              >
                <SubtitlesIcon className="w-4 h-4" />
              </button>

              {/* Audio Track */}
              <button
                onClick={() => {}}
                className="p-2.5 js-radius bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                title="Audio Tracks"
              >
                <Music className="w-4 h-4" />
              </button>

              {/* Settings */}
              <button
                onClick={() => {}}
                className="p-2.5 js-radius bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                title="Video Settings"
              >
                <Settings className="w-4 h-4" />
              </button>

              {/* Aspect Ratio */}
              <button
                onClick={() => {}}
                className="p-2.5 js-radius bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                title="Aspect Ratio"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Time & Scrub Bar (JetStream Page 10) */}
          <div className="space-y-1.5">
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                if (videoRef.current && duration > 0) {
                  videoRef.current.currentTime = pos * duration;
                }
              }}
              className="w-full h-1.5 bg-white/25 hover:h-2 rounded-full overflow-hidden cursor-pointer relative transition-all"
            >
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const JetStreamPlayerScreen = VelviaPlayerScreen;
