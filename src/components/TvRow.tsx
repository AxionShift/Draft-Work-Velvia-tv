import React, { useRef, useEffect } from 'react';
import { MediaItem } from '../types/media';
import { TvMediaCard } from './TvMediaCard';

interface TvRowProps {
  title: string;
  items: MediaItem[];
  rowIndex: number;
  currentRowIndex: number;
  focusedColIndex: number;
  isLandscape?: boolean;
  onSelectMedia: (media: MediaItem) => void;
  onFocusMedia: (media: MediaItem) => void;
}

export const TvRow: React.FC<TvRowProps> = ({
  title,
  items,
  rowIndex,
  currentRowIndex,
  focusedColIndex,
  isLandscape = false,
  onSelectMedia,
  onFocusMedia,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isRowActive = rowIndex === currentRowIndex;

  useEffect(() => {
    if (isRowActive && containerRef.current) {
      const cardWidth = isLandscape ? 300 : 190;
      const targetScroll = Math.max(0, focusedColIndex * cardWidth - 100);
      containerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  }, [isRowActive, focusedColIndex, isLandscape]);

  if (!items.length) return null;

  return (
    <div className="mb-8">
      {/* Row Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className={`text-lg font-bold transition-colors ${
          isRowActive ? 'text-white' : 'text-slate-400'
        }`}>
          {title}
        </h3>
        <span className="text-xs text-slate-500 font-mono">
          {items.length} titles
        </span>
      </div>

      {/* Horizontal Cards Scrollable Strip */}
      <div
        ref={containerRef}
        className="flex items-center gap-5 overflow-x-auto pb-4 pt-2 px-1 scroll-smooth no-scrollbar"
      >
        {items.map((item, colIdx) => {
          const isCardFocused = isRowActive && colIdx === focusedColIndex;

          return (
            <TvMediaCard
              key={item.id}
              media={item}
              isLandscape={isLandscape}
              isFocused={isCardFocused}
              onClick={() => onSelectMedia(item)}
              onFocus={() => onFocusMedia(item)}
            />
          );
        })}
      </div>
    </div>
  );
};
