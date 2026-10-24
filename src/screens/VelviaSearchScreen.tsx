import React from 'react';
import { Search, Mic, Delete } from 'lucide-react';
import { MediaItem } from '../types/media';
import { VelviaCard } from '../components/VelviaCard';

export interface VelviaSearchScreenProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  mediaList: MediaItem[];
  activeZone: 'input' | 'keyboard' | 'results';
  keyboardRow: number;
  keyboardCol: number;
  focusedResultIndex: number;
  onSelectMedia: (media: MediaItem) => void;
}

const KEYBOARD_LAYOUT = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '1'],
  ['⇧', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '.', '⌫'],
  ['123', '🌐', '🎤', 'SPACE', '↵']
];

export const VelviaSearchScreen: React.FC<VelviaSearchScreenProps> = ({
  searchQuery,
  onSearchChange,
  mediaList,
  activeZone,
  keyboardRow,
  keyboardCol,
  focusedResultIndex,
  onSelectMedia,
}) => {
  const handleKeyClick = (key: string) => {
    if (key === '⌫') {
      onSearchChange(searchQuery.slice(0, -1));
    } else if (key === 'SPACE') {
      onSearchChange(searchQuery + ' ');
    } else if (key === '↵' || key === '⇧' || key === '123' || key === '🌐' || key === '🎤') {
      // Functional keys
    } else {
      onSearchChange(searchQuery + key);
    }
  };

  const filteredItems = mediaList.filter((item) => {
    if (!searchQuery.trim()) {
      return ['ape-country', 'zaloria', 'immortal-rider', 'pink-city', 'him'].includes(item.id);
    }
    return (
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="pb-16 select-none animate-fadeIn">
      {/* Velvia TV Search Bar (Monochrome) */}
      <div className="mb-6 px-1">
        <div
          className={`relative flex items-center h-14 px-5 js-radius border transition-all ${
            activeZone === 'input'
              ? 'tv-focused bg-zinc-900 border-white'
              : 'bg-zinc-900 border-zinc-800'
          }`}
        >
          <Search className="w-5 h-5 text-zinc-400 mr-3 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for movies, shows and more..."
            className="w-full bg-transparent text-white text-base font-normal outline-none placeholder:text-zinc-500"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="text-xs text-zinc-400 hover:text-white px-2 py-1 bg-zinc-800 js-radius border border-zinc-700"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Two Column Section: On-Screen TV Keyboard + Live Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-1">
        {/* On-Screen TV Keyboard (Monochrome) */}
        <div className="lg:col-span-5 bg-zinc-900 p-5 js-radius border border-zinc-800">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-4 pb-2 border-b border-zinc-800">
            <span className="font-semibold text-white">Velvia TV Keyboard</span>
            <div className="flex items-center gap-1.5 text-zinc-300">
              <Mic className="w-3.5 h-3.5" />
              <span>Press and hold 🎤 to speak</span>
            </div>
          </div>

          <div className="space-y-2">
            {KEYBOARD_LAYOUT.map((row, rIdx) => (
              <div key={rIdx} className="flex gap-1.5 justify-center">
                {row.map((k, cIdx) => {
                  const isKeyFocused =
                    activeZone === 'keyboard' &&
                    keyboardRow === rIdx &&
                    keyboardCol === cIdx;

                  const isSpace = k === 'SPACE';
                  const isSpecial = ['123', '↵', '⌫', '⇧'].includes(k);

                  return (
                    <button
                      key={k}
                      onClick={() => handleKeyClick(k)}
                      className={`h-11 js-radius text-sm font-semibold transition-all cursor-pointer flex items-center justify-center ${
                        isSpace ? 'flex-1 px-4' : isSpecial ? 'w-12' : 'w-10'
                      } ${
                        isKeyFocused
                          ? 'tv-focused-button bg-white text-black font-bold'
                          : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700 border border-zinc-700'
                      }`}
                    >
                      {k === '⌫' ? <Delete className="w-4 h-4" /> : k}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Search Results / Suggested Grid */}
        <div className="lg:col-span-7">
          <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider mb-4">
            {searchQuery ? `Results for "${searchQuery}"` : 'Suggested Titles'}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {filteredItems.map((item, idx) => {
              const isFocused = activeZone === 'results' && focusedResultIndex === idx;

              return (
                <VelviaCard
                  key={item.id}
                  media={item}
                  aspectRatio="2:3"
                  isFocused={isFocused}
                  onClick={() => onSelectMedia(item)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const JetStreamSearchScreen = VelviaSearchScreen;
