import React from 'react';
import { Play, Layers, Star, ArrowLeft } from 'lucide-react';
import { MediaItem, StreamingSource } from '../types/media';

export interface VelviaDetailsScreenProps {
  media: MediaItem;
  similarMedia: MediaItem[];
  activeButtonIndex: number; // 0 = Watch now, 1 = Choose Source, 2 = Back
  onPlayStream: (source: StreamingSource, title: string) => void;
  onOpenSourceSelector: () => void;
  onSelectMedia: (media: MediaItem) => void;
  onBack: () => void;
}

export const VelviaDetailsScreen: React.FC<VelviaDetailsScreenProps> = ({
  media,
  similarMedia,
  activeButtonIndex,
  onPlayStream,
  onOpenSourceSelector,
  onSelectMedia,
  onBack,
}) => {
  return (
    <div className="relative pb-24 select-none animate-fadeIn">
      {/* Cinematic Fullscreen Backdrop (Monochrome Grayscale Scrim) */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-10 opacity-25 filter grayscale contrast-125 scale-105"
        style={{ backgroundImage: `url(${media.backdropUrl})` }}
      />
      <div className="fixed inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/90 to-[#09090b]/80 -z-10" />

      {/* Back button */}
      <div className="mb-6 px-1">
        <button
          onClick={onBack}
          className={`flex items-center gap-2 px-4 py-2 js-radius text-xs font-semibold cursor-pointer transition-all ${
            activeButtonIndex === 2
              ? 'tv-focused-button bg-white text-black font-bold'
              : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Details Info Block */}
      <div className="max-w-3xl mb-12 px-1">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
          {media.title}
        </h1>

        <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-normal mb-4">
          {media.synopsis}
        </p>

        {/* Metadata Line (Monochrome) */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium mb-6 flex-wrap">
          <span className="font-bold text-white px-2 py-0.5 bg-zinc-800 js-radius border border-zinc-700">
            {media.rating}
          </span>
          <span>•</span>
          <span>{media.year} (US)</span>
          <span>•</span>
          <span>{media.genres.join(', ')}</span>
          {media.duration && (
            <>
              <span>•</span>
              <span>{media.duration}</span>
            </>
          )}
          <span>•</span>
          <span className="flex items-center gap-1 text-white font-semibold">
            <Star className="w-3.5 h-3.5 fill-white text-white" />
            {media.score}
          </span>
        </div>

        {/* Crew Metadata Grid (Monochrome) */}
        <div className="grid grid-cols-3 gap-6 text-xs mb-8 py-3 border-t border-b border-zinc-800 max-w-lg">
          <div>
            <span className="text-zinc-500 block text-[11px] mb-0.5 uppercase tracking-wider">Director</span>
            <span className="text-white font-semibold">{media.director}</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[11px] mb-0.5 uppercase tracking-wider">Executive Producer</span>
            <span className="text-white font-semibold">Georgi Horvath</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[11px] mb-0.5 uppercase tracking-wider">Screenwriter</span>
            <span className="text-white font-semibold">Ben Jackson</span>
          </div>
        </div>

        {/* Action Buttons (High Contrast White / Black) */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              const src = media.sources[0];
              if (src) onPlayStream(src, media.title);
            }}
            className={`flex items-center gap-2 px-7 py-3 js-radius text-sm font-bold cursor-pointer transition-all shadow-xl ${
              activeButtonIndex === 0
                ? 'tv-focused-button bg-white text-black ring-4 ring-white'
                : 'bg-white hover:bg-zinc-200 text-black'
            }`}
          >
            <Play className="w-4 h-4 fill-current ml-0.5" />
            <span>Watch now</span>
          </button>

          <button
            onClick={onOpenSourceSelector}
            className={`flex items-center gap-2 px-5 py-3 js-radius text-sm font-semibold cursor-pointer border transition-all ${
              activeButtonIndex === 1
                ? 'tv-focused-button bg-white text-black border-white'
                : 'bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-700'
            }`}
          >
            <Layers className="w-4 h-4 text-zinc-300" />
            <span>Choose Source ({media.sources.length})</span>
          </button>
        </div>
      </div>

      {/* Cast & Crew Section */}
      <div className="mb-12 px-1">
        <h3 className="text-lg font-bold text-white mb-4">Cast & Crew</h3>
        <div className="flex items-start gap-4 overflow-x-auto pb-4 no-scrollbar">
          {media.cast.map((member) => (
            <div key={member.name} className="w-36 shrink-0 flex flex-col select-none">
              <div className="w-36 h-48 js-radius overflow-hidden bg-zinc-900 border border-zinc-800 mb-2">
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-full h-full object-cover filter grayscale contrast-110"
                />
              </div>
              <h4 className="text-xs font-bold text-white truncate">{member.name}</h4>
              <p className="text-[11px] text-zinc-400 truncate">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews & Ratings Section (Monochrome) */}
      <div className="mb-12 px-1">
        <h3 className="text-lg font-bold text-white mb-4">Reviews</h3>
        <div className="p-6 js-radius bg-zinc-900 border border-zinc-800 max-w-2xl">
          <div className="grid grid-cols-2 gap-6 pb-6 border-b border-zinc-800">
            {/* Mashed Potatoes (Clean Monochrome) */}
            <div className="flex items-center justify-between pr-6 border-r border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white font-black text-xs font-mono">
                  MP
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">Mashed Potatoes</h5>
                  <p className="text-[11px] text-zinc-500">22 reviews</p>
                </div>
              </div>
              <span className="text-2xl font-black text-white">89%</span>
            </div>

            {/* Star DB (Clean Monochrome) */}
            <div className="flex items-center justify-between pl-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white">
                  <Star className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">Star DB</h5>
                  <p className="text-[11px] text-zinc-500">1.8M reviews</p>
                </div>
              </div>
              <span className="text-2xl font-black text-white">9.2</span>
            </div>
          </div>

          {/* Additional details */}
          <div className="grid grid-cols-4 gap-4 pt-4 text-[11px]">
            <div>
              <span className="text-zinc-500 block mb-0.5">Status</span>
              <span className="text-white font-medium">Released</span>
            </div>
            <div>
              <span className="text-zinc-500 block mb-0.5">Original Language</span>
              <span className="text-white font-medium">English</span>
            </div>
            <div>
              <span className="text-zinc-500 block mb-0.5">Budget</span>
              <span className="text-white font-medium">$15M</span>
            </div>
            <div>
              <span className="text-zinc-500 block mb-0.5">Revenue</span>
              <span className="text-white font-medium">$40M</span>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Titles Row */}
      <div className="px-1">
        <h3 className="text-lg font-bold text-white mb-4">Similar to {media.title}</h3>
        <div className="flex items-start gap-5 overflow-x-auto pb-4 no-scrollbar">
          {similarMedia.map((sim) => (
            <div
              key={sim.id}
              onClick={() => onSelectMedia(sim)}
              className="w-44 shrink-0 js-radius overflow-hidden border border-zinc-800 hover:border-zinc-600 cursor-pointer group"
            >
              <div className="h-60 overflow-hidden bg-zinc-900">
                <img
                  src={sim.posterUrl}
                  alt={sim.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-2 bg-zinc-950">
                <h5 className="text-xs font-semibold text-white truncate">{sim.title}</h5>
                <span className="text-[10px] text-zinc-500">{sim.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const JetStreamDetailsScreen = VelviaDetailsScreen;
