import React from 'react';
import { Play } from 'lucide-react';
import { MediaItem } from '../types/media';

export interface VelviaHeroCarouselProps {
  media: MediaItem;
  carouselIndex: number;
  totalSlides: number;
  isFocused: boolean;
  onWatchNow: (media: MediaItem) => void;
  onSelectSlide?: (index: number) => void;
}

export const VelviaHeroCarousel: React.FC<VelviaHeroCarouselProps> = ({
  media,
  carouselIndex,
  totalSlides,
  isFocused,
  onWatchNow,
}) => {
  return (
    <div className="relative w-full h-[440px] mb-8 select-none js-radius overflow-hidden shadow-2xl border border-white/10 group">
      {/* 16:9 Landscape Artwork Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
        style={{ backgroundImage: `url(${media.backdropUrl})` }}
      />

      {/* Velvia TV Monochrome Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/80 to-transparent w-2/3" />

      {/* Content Block */}
      <div className="absolute bottom-8 left-8 max-w-xl z-10">
        <h2 className="text-4xl font-extrabold text-white tracking-tight mb-2 drop-shadow-md">
          {media.title}
        </h2>
        <p className="text-sm text-zinc-300 font-normal leading-relaxed mb-6 line-clamp-2 max-w-lg drop-shadow">
          {media.synopsis}
        </p>

        {/* Watch Now Button (High Contrast White / Black) */}
        <button
          onClick={() => onWatchNow(media)}
          className={`flex items-center gap-2 px-6 py-2.5 js-radius text-sm font-bold cursor-pointer transition-all duration-150 shadow-lg ${
            isFocused
              ? 'tv-focused-button bg-white text-black ring-4 ring-white'
              : 'bg-white hover:bg-zinc-200 text-black'
          }`}
        >
          <Play className="w-4 h-4 fill-current ml-0.5" />
          <span>Watch now</span>
        </button>
      </div>

      {/* Dot Indicators on Bottom Right */}
      <div className="absolute bottom-8 right-8 flex items-center gap-2 z-10">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={i}
            className={`transition-all duration-300 rounded-full ${
              i === carouselIndex
                ? 'w-6 h-1.5 bg-white'
                : 'w-1.5 h-1.5 bg-zinc-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export const JetStreamHeroCarousel = VelviaHeroCarousel;
