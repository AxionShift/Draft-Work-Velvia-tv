import React from 'react';
import { MediaItem } from '../types/media';

export interface VelviaCardProps {
  media: MediaItem;
  isFocused: boolean;
  aspectRatio?: '2:3' | '16:9';
  rankNumber?: number; // If provided, shows prominent Top 10 number like #1, #2
  onClick: () => void;
  onFocus?: () => void;
}

export const VelviaCard: React.FC<VelviaCardProps> = ({
  media,
  isFocused,
  aspectRatio = '2:3',
  rankNumber,
  onClick,
  onFocus,
}) => {
  const isLandscape = aspectRatio === '16:9';

  return (
    <div
      onClick={onClick}
      onFocus={onFocus}
      className="flex flex-col select-none cursor-pointer group"
    >
      <div className="flex items-end gap-2">
        {/* Prominent Immersive List Rank Number (Monochrome Titanium Gray) */}
        {rankNumber !== undefined && (
          <span className="text-5xl md:text-6xl font-black italic tracking-tighter text-zinc-600 group-hover:text-white transition-colors shrink-0 -mr-3 z-10 drop-shadow-md select-none font-mono">
            {rankNumber}
          </span>
        )}

        {/* The Card with 4dp radius and 3dp outline focus */}
        <div
          className={`relative js-radius overflow-hidden transition-all duration-200 bg-zinc-900 ${
            isLandscape ? 'w-80 h-44' : 'w-48 h-72'
          } ${
            isFocused
              ? 'tv-focused ring-4 ring-white'
              : 'border border-zinc-800 hover:border-zinc-600'
          }`}
        >
          <img
            src={isLandscape ? media.backdropUrl : media.posterUrl}
            alt={media.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Monochrome Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

          {/* Continue Watching Progress (Monochrome White) */}
          {media.continueWatchingProgress !== undefined && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-900/80">
              <div
                className="h-full bg-white"
                style={{ width: `${media.continueWatchingProgress}%` }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Title Below Card */}
      <div className="mt-2 px-1 max-w-[190px]">
        <h4 className={`text-xs font-semibold truncate transition-colors ${
          isFocused ? 'text-white font-bold' : 'text-zinc-300'
        }`}>
          {media.title}
        </h4>
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 mt-0.5">
          <span>{media.year}</span>
          <span>•</span>
          <span className="truncate">{media.genres[0]}</span>
        </div>
      </div>
    </div>
  );
};

export const JetStreamCard = VelviaCard;

