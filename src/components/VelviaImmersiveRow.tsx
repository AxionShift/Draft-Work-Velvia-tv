import React from 'react';
import { MediaItem } from '../types/media';
import { VelviaCard } from './VelviaCard';
import { Star } from 'lucide-react';

interface VelviaImmersiveRowProps {
  title: string;
  items: MediaItem[];
  focusedItem: MediaItem;
  rowIndex: number;
  activeRowIndex: number;
  focusedColIndex: number;
  onSelectMedia: (media: MediaItem) => void;
  onFocusMedia: (media: MediaItem) => void;
}

export const VelviaImmersiveRow: React.FC<VelviaImmersiveRowProps> = ({
  title,
  items,
  focusedItem,
  rowIndex,
  activeRowIndex,
  focusedColIndex,
  onSelectMedia,
  onFocusMedia,
}) => {
  const isRowActive = rowIndex === activeRowIndex;

  return (
    <div className="mb-10 select-none">
      {/* Row Title */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
      </div>

      {/* Dynamic preview block above row (Monochrome) */}
      {isRowActive && (
        <div className="mb-4 px-3 py-3 bg-zinc-900/90 backdrop-blur-md js-radius border border-zinc-700 max-w-xl transition-all duration-300">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-white uppercase tracking-wider">#{focusedColIndex + 1} Trending</span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-zinc-300">{focusedItem.rating}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-white font-semibold flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-white text-white" />
              {focusedItem.score}
            </span>
          </div>
          <h4 className="text-lg font-extrabold text-white">{focusedItem.title}</h4>
          <p className="text-xs text-zinc-300 line-clamp-2 mt-0.5 leading-relaxed">
            {focusedItem.synopsis}
          </p>
        </div>
      )}

      {/* 5-Column Content Row */}
      <div className="flex items-start gap-6 overflow-x-auto pb-4 pt-1 px-1 no-scrollbar">
        {items.map((item, colIdx) => {
          const isCardFocused = isRowActive && colIdx === focusedColIndex;

          return (
            <VelviaCard
              key={item.id}
              media={item}
              aspectRatio="2:3"
              rankNumber={colIdx + 1}
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

export const JetStreamImmersiveRow = VelviaImmersiveRow;
