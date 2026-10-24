import React, { useState } from 'react';
import { MediaItem } from '../types/media';
import { VelviaCard } from '../components/VelviaCard';
import { Check } from 'lucide-react';

export interface VelviaFavoritesScreenProps {
  mediaList: MediaItem[];
  activeZone: 'chips' | 'grid';
  focusedChipIndex: number;
  focusedGridIndex: number;
  onSelectMedia: (media: MediaItem) => void;
}

export const FAVORITE_CHIPS = [
  { id: 'movies', label: 'Movies' },
  { id: 'shows', label: 'TV Shows' },
  { id: 'added', label: 'Added last week' },
  { id: '4k', label: 'Available in 4K' },
];

export const VelviaFavoritesScreen: React.FC<VelviaFavoritesScreenProps> = ({
  mediaList,
  activeZone,
  focusedChipIndex,
  focusedGridIndex,
  onSelectMedia,
}) => {
  const [selectedChips, setSelectedChips] = useState<string[]>(['movies']);

  const toggleChip = (id: string) => {
    setSelectedChips((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const filteredItems = mediaList.filter((m) => {
    if (selectedChips.includes('movies') && m.type !== 'movie') return false;
    if (selectedChips.includes('shows') && m.type !== 'series') return false;
    return true;
  });

  return (
    <div className="pb-16 select-none animate-fadeIn">
      {/* Filter Chips Bar (Monochrome) */}
      <div className="flex items-center gap-3 mb-8 px-1">
        {FAVORITE_CHIPS.map((chip, idx) => {
          const isSelected = selectedChips.includes(chip.id);
          const isFocused = activeZone === 'chips' && focusedChipIndex === idx;

          return (
            <button
              key={chip.id}
              onClick={() => toggleChip(chip.id)}
              className={`flex items-center gap-2 px-4 py-2 js-radius text-xs font-semibold cursor-pointer transition-all ${
                isFocused
                  ? 'tv-focused-button bg-white text-black'
                  : isSelected
                  ? 'bg-zinc-800 text-white border border-white/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>

      {/* 5-Column 2:3 Poster Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-1">
        {filteredItems.map((item, idx) => {
          const isCardFocused = activeZone === 'grid' && focusedGridIndex === idx;

          return (
            <VelviaCard
              key={item.id}
              media={item}
              aspectRatio="2:3"
              isFocused={isCardFocused}
              onClick={() => onSelectMedia(item)}
            />
          );
        })}
      </div>
    </div>
  );
};

export const JetStreamFavoritesScreen = VelviaFavoritesScreen;
