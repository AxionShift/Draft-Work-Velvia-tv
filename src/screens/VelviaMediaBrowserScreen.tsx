import React from 'react';
import { MediaItem, MediaType } from '../types/media';
import { VelviaCard } from '../components/VelviaCard';

export interface VelviaMediaBrowserScreenProps {
  title: string;
  mediaType: MediaType;
  mediaList: MediaItem[];
  featuredTitles: [string, string];
  bottomRowTitle: string;
  activeZone: 'featured' | 'grid';
  focusedFeaturedIndex: number;
  focusedGridIndex: number;
  onSelectMedia: (media: MediaItem) => void;
}

export const VelviaMediaBrowserScreen: React.FC<VelviaMediaBrowserScreenProps> = ({
  title,
  mediaType,
  mediaList,
  featuredTitles,
  bottomRowTitle,
  activeZone,
  focusedFeaturedIndex,
  focusedGridIndex,
  onSelectMedia,
}) => {
  const categoryItems = mediaList.filter((m) => m.type === mediaType);

  // Find the two featured 16:9 items
  const featured1 = categoryItems.find((m) => m.title.toLowerCase().includes(featuredTitles[0].toLowerCase())) || categoryItems[0];
  const featured2 = categoryItems.find((m) => m.title.toLowerCase().includes(featuredTitles[1].toLowerCase())) || categoryItems[1] || categoryItems[0];

  const gridItems = categoryItems;

  return (
    <div className="pb-16 select-none animate-fadeIn">
      {/* Top 16:9 Featured Cards (Monochrome) */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 px-1">{title} Featured</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-1">
          {[featured1, featured2].filter(Boolean).map((media, idx) => {
            const isFocused = activeZone === 'featured' && focusedFeaturedIndex === idx;

            return (
              <div
                key={media.id}
                onClick={() => onSelectMedia(media)}
                className={`relative h-60 js-radius overflow-hidden cursor-pointer transition-all duration-200 group ${
                  isFocused ? 'tv-focused ring-4 ring-white' : 'border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <img
                  src={media.backdropUrl}
                  alt={media.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex flex-col justify-end p-5">
                  <span className="text-xs text-zinc-400 font-medium line-clamp-1 mb-1">
                    {media.genres.join(' • ')}
                  </span>
                  <h3 className="text-xl font-bold text-white truncate drop-shadow">
                    {media.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Content Grid */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4 px-1">{bottomRowTitle}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-1">
          {gridItems.map((item, idx) => {
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
    </div>
  );
};

export const JetStreamMediaBrowserScreen = VelviaMediaBrowserScreen;
