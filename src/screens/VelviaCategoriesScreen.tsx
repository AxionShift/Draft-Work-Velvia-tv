import React, { useState } from 'react';
import { MediaItem } from '../types/media';
import { VELVIA_CATEGORIES } from '../data/sampleMedia';
import { VelviaCard } from '../components/VelviaCard';
import { ArrowLeft } from 'lucide-react';

export interface VelviaCategoriesScreenProps {
  mediaList: MediaItem[];
  focusedCategoryIndex: number;
  focusedGridIndex: number;
  activeSection: 'categories' | 'detailsGrid';
  onSelectMedia: (media: MediaItem) => void;
  onBackToCategories?: () => void;
}

export const VelviaCategoriesScreen: React.FC<VelviaCategoriesScreenProps> = ({
  mediaList,
  focusedCategoryIndex,
  focusedGridIndex,
  activeSection,
  onSelectMedia,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categoryItems = selectedCategory
    ? mediaList.filter((m) =>
        m.genres.some((g) => g.toLowerCase().includes(selectedCategory.toLowerCase()))
      )
    : [];

  // Category Details View (Monochrome Header and 2:3 grid)
  if (selectedCategory) {
    return (
      <div className="pb-16 select-none animate-fadeIn">
        {/* Category Header with Monochrome Scrim */}
        <div className="relative w-full h-48 mb-8 js-radius overflow-hidden flex flex-col justify-end p-8 bg-gradient-to-t from-[#09090b] via-zinc-900 to-zinc-950 border border-zinc-800">
          <button
            onClick={() => setSelectedCategory(null)}
            className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 js-radius text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer transition-colors border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Categories</span>
          </button>
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              {selectedCategory}
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              {categoryItems.length} curated titles available in {selectedCategory}
            </p>
          </div>
        </div>

        {/* 5-Column 2:3 Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-1">
          {categoryItems.map((item, idx) => {
            const isFocused = activeSection === 'detailsGrid' && focusedGridIndex === idx;

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
    );
  }

  // Categories Grid View (Monochrome Dark Charcoal Cards)
  return (
    <div className="pb-16 select-none">
      <div className="mb-6 px-1">
        <h2 className="text-2xl font-bold text-white tracking-tight">Categories</h2>
        <p className="text-xs text-zinc-400 mt-1">Browse catalogue by genre and category</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 px-1">
        {VELVIA_CATEGORIES.map((cat, idx) => {
          const isFocused = activeSection === 'categories' && focusedCategoryIndex === idx;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.label)}
              className={`h-32 js-radius flex items-center justify-center p-6 text-center cursor-pointer transition-all duration-200 border ${
                isFocused
                  ? 'tv-focused-button bg-white text-black border-white font-extrabold scale-105 shadow-2xl'
                  : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-200 font-semibold hover:border-zinc-700'
              }`}
            >
              <span className="text-base tracking-wide">{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const JetStreamCategoriesScreen = VelviaCategoriesScreen;
