import React, { useState } from 'react';
import { MediaItem } from '../types/media';
import { VelviaHeroCarousel } from '../components/VelviaHeroCarousel';
import { VelviaCard } from '../components/VelviaCard';
import { VelviaImmersiveRow } from '../components/VelviaImmersiveRow';

export interface VelviaHomeScreenProps {
  mediaList: MediaItem[];
  activeZone: 'hero' | 'trending' | 'top10' | 'recent';
  focusedCardIndex: number;
  previewItem: MediaItem;
  onSelectMedia: (media: MediaItem) => void;
  onFocusMedia: (media: MediaItem) => void;
  onWatchNow: (media: MediaItem) => void;
}

export const VelviaHomeScreen: React.FC<VelviaHomeScreenProps> = ({
  mediaList,
  activeZone,
  focusedCardIndex,
  previewItem,
  onSelectMedia,
  onFocusMedia,
  onWatchNow,
}) => {
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Featured slides for Carousel
  const featuredSlides = mediaList.filter((m) => m.featured);
  const currentHero = featuredSlides[carouselIndex] || mediaList[0];

  // 5-Column Trending Row (Monochrome)
  const trendingItems = mediaList.slice(0, 5);

  // Top 10 in the US for Immersive List
  const top10Items = mediaList.slice(0, 7);

  // Recent additions
  const recentItems = [...mediaList].reverse().slice(0, 6);

  return (
    <div className="pb-20 select-none animate-fadeIn">
      {/* Featured Carousel */}
      <VelviaHeroCarousel
        media={currentHero}
        carouselIndex={carouselIndex}
        totalSlides={featuredSlides.length}
        isFocused={activeZone === 'hero'}
        onWatchNow={onWatchNow}
      />

      {/* Row 1: Trending (5-Column Layout with 2:3 Aspect Ratio) */}
      <div className="mb-10 px-1">
        <h3 className="text-xl font-bold text-white tracking-tight mb-4">Trending</h3>
        <div className="flex items-start gap-6 overflow-x-auto pb-4 no-scrollbar">
          {trendingItems.map((item, idx) => {
            const isFocused = activeZone === 'trending' && focusedCardIndex === idx;

            return (
              <VelviaCard
                key={item.id}
                media={item}
                aspectRatio="2:3"
                isFocused={isFocused}
                onClick={() => onSelectMedia(item)}
                onFocus={() => onFocusMedia(item)}
              />
            );
          })}
        </div>
      </div>

      {/* Row 2: Top 10 in the US (Immersive List Component) */}
      <div className="px-1">
        <VelviaImmersiveRow
          title="Top 10 in the US"
          items={top10Items}
          focusedItem={previewItem}
          rowIndex={1}
          activeRowIndex={activeZone === 'top10' ? 1 : -1}
          focusedColIndex={focusedCardIndex}
          onSelectMedia={onSelectMedia}
          onFocusMedia={onFocusMedia}
        />
      </div>

      {/* Row 3: Recently Added */}
      <div className="mt-6 mb-8 px-1">
        <h3 className="text-xl font-bold text-white tracking-tight mb-4">Recently Added</h3>
        <div className="flex items-start gap-6 overflow-x-auto pb-4 no-scrollbar">
          {recentItems.map((item, idx) => {
            const isFocused = activeZone === 'recent' && focusedCardIndex === idx;

            return (
              <VelviaCard
                key={item.id}
                media={item}
                aspectRatio="2:3"
                isFocused={isFocused}
                onClick={() => onSelectMedia(item)}
                onFocus={() => onFocusMedia(item)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const JetStreamHomeScreen = VelviaHomeScreen;
