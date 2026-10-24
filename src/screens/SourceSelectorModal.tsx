import React from 'react';
import { CheckCircle2, AlertCircle, XCircle, Play, X, ShieldCheck } from 'lucide-react';
import { StreamingSource } from '../types/media';

interface SourceSelectorModalProps {
  title: string;
  sources: StreamingSource[];
  focusedIndex: number;
  onSelectSource: (source: StreamingSource) => void;
  onClose: () => void;
}

export const SourceSelectorModal: React.FC<SourceSelectorModalProps> = ({
  title,
  sources,
  focusedIndex,
  onSelectSource,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-md select-none animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-700 js-radius p-6 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <h3 className="text-xl font-bold text-white">Stream Source Selector</h3>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Select stream source for <span className="text-white font-semibold">{title}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 js-radius bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white cursor-pointer transition-colors border border-zinc-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Source List (Monochrome) */}
        <div className="space-y-3 mb-6">
          {sources.map((source, idx) => {
            const isFocused = focusedIndex === idx;

            return (
              <button
                key={source.id}
                onClick={() => onSelectSource(source)}
                className={`w-full flex items-center justify-between p-4 js-radius text-left transition-all duration-200 cursor-pointer ${
                  isFocused
                    ? 'tv-focused bg-white text-black'
                    : 'bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-white'
                }`}
              >
                {/* Left: Source details */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-11 h-11 js-radius flex items-center justify-center font-bold text-xs border ${
                      isFocused
                        ? 'bg-black text-white border-black'
                        : 'bg-zinc-900 text-zinc-300 border-zinc-700'
                    }`}
                  >
                    {source.protocol}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${isFocused ? 'text-black' : 'text-white'}`}>
                        {source.name}
                      </span>
                      <span className={`px-1.5 py-0.5 js-radius text-[10px] font-bold ${
                        isFocused ? 'bg-zinc-200 text-black' : 'bg-zinc-800 text-zinc-300'
                      }`}>
                        {source.quality}
                      </span>
                    </div>
                    <div className={`flex items-center gap-2 text-xs mt-1 ${isFocused ? 'text-zinc-700' : 'text-zinc-400'}`}>
                      <span>{source.audioChannels}</span>
                      <span>•</span>
                      <span>{source.bitrate}</span>
                      <span>•</span>
                      <span>{source.subtitles.length} Subtitles</span>
                    </div>
                  </div>
                </div>

                {/* Right: Latency & Status */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span
                      className={`text-xs font-bold flex items-center gap-1 justify-end ${
                        isFocused ? 'text-black' : 'text-zinc-300'
                      }`}
                    >
                      {source.status === 'active' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {source.status === 'degraded' && <AlertCircle className="w-3.5 h-3.5" />}
                      {source.status === 'offline' && <XCircle className="w-3.5 h-3.5" />}
                      {source.status.toUpperCase()}
                    </span>
                    <span className={`text-[10px] font-mono ${isFocused ? 'text-zinc-600' : 'text-zinc-500'}`}>
                      {source.pingMs}ms latency
                    </span>
                  </div>

                  <div
                    className={`w-9 h-9 js-radius flex items-center justify-center transition-colors ${
                      isFocused ? 'bg-black text-white' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Remote Prompt Helper */}
        <div className="flex items-center justify-between text-xs text-zinc-400 pt-3 border-t border-zinc-800">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-zinc-300" />
            <span>Encrypted HLS / TLS Stream Pipe</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-zinc-800 text-white rounded font-mono text-[10px]">↑/↓</kbd> Select
            <kbd className="px-1.5 py-0.5 bg-zinc-800 text-white rounded font-mono text-[10px]">OK</kbd> Play
            <kbd className="px-1.5 py-0.5 bg-zinc-800 text-white rounded font-mono text-[10px]">Back</kbd> Dismiss
          </div>
        </div>
      </div>
    </div>
  );
};
