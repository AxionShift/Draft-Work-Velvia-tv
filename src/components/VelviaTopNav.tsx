import React from 'react';
import { Search, Play, FileCode, Settings } from 'lucide-react';
import { ScreenId } from '../types/media';

interface VelviaTopNavProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  focusedNavIndex: number; // 0 = Avatar, 1 = Home, 2 = Categories, 3 = Movies, 4 = Shows, 5 = Favorites, 6 = Search, 7 = Settings, 8 = Export
  isNavFocused: boolean;
  onOpenAndroidExport: () => void;
}

export const VELVIA_NAV_TABS = [
  { id: 'home' as ScreenId, label: 'Home' },
  { id: 'categories' as ScreenId, label: 'Categories' },
  { id: 'movies' as ScreenId, label: 'Movies' },
  { id: 'shows' as ScreenId, label: 'Shows' },
  { id: 'favorites' as ScreenId, label: 'Favorites' },
];

export const VelviaTopNav: React.FC<VelviaTopNavProps> = ({
  currentScreen,
  onNavigate,
  focusedNavIndex,
  isNavFocused,
  onOpenAndroidExport,
}) => {
  return (
    <header
      role="banner"
      aria-label="Velvia TV Navigation"
      className="w-full h-16 flex items-center justify-between px-12 z-40 bg-gradient-to-b from-[#09090b]/95 via-[#09090b]/80 to-transparent select-none border-b border-white/5"
    >
      {/* Left: User Avatar & Tabs */}
      <div className="flex items-center gap-6">
        {/* User Profile Avatar (Monochrome) */}
        <button
          onClick={() => onNavigate('settings')}
          className={`w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-white shadow-md cursor-pointer transition-all ${
            isNavFocused && focusedNavIndex === 0
              ? 'tv-focused-button bg-white text-black ring-2 ring-white'
              : 'hover:bg-zinc-700'
          }`}
          title="Account & Settings"
        >
          <span>VT</span>
        </button>

        {/* Tab Pills with 4dp radius */}
        <nav className="flex items-center gap-1.5">
          {VELVIA_NAV_TABS.map((tab, idx) => {
            const tabNavIndex = idx + 1;
            const isActive = currentScreen === tab.id;
            const isFocused = isNavFocused && focusedNavIndex === tabNavIndex;

            return (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.id)}
                className={`px-4 py-1.5 js-radius text-sm font-medium tracking-wide transition-all duration-150 cursor-pointer ${
                  isFocused
                    ? 'tv-focused-button font-bold text-black bg-white'
                    : isActive
                    ? 'bg-zinc-800 text-white font-semibold border border-white/10'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}

          {/* Search Icon Tab */}
          <button
            onClick={() => onNavigate('search')}
            className={`p-2 js-radius transition-all duration-150 cursor-pointer flex items-center justify-center ${
              isNavFocused && focusedNavIndex === 6
                ? 'tv-focused-button text-black bg-white'
                : currentScreen === 'search'
                ? 'bg-zinc-800 text-white border border-white/10'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>
        </nav>
      </div>

      {/* Right: Velvia TV Brand Badge (Monochrome) */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenAndroidExport}
          className={`flex items-center gap-1.5 px-3 py-1.5 js-radius text-xs font-semibold cursor-pointer transition-all ${
            isNavFocused && focusedNavIndex === 8
              ? 'tv-focused-button text-black bg-white'
              : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-white/10'
          }`}
          title="Export Android Studio Project"
        >
          <FileCode className="w-3.5 h-3.5 text-zinc-400" />
          <span>Export Kotlin Project</span>
        </button>

        <button
          onClick={() => onNavigate('settings')}
          className={`p-2 js-radius cursor-pointer transition-all ${
            isNavFocused && focusedNavIndex === 7
              ? 'tv-focused-button text-black bg-white'
              : 'text-zinc-400 hover:text-white'
          }`}
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-zinc-800">
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md">
            <Play className="w-3 h-3 fill-black text-black ml-0.5" />
          </div>
          <div className="text-right leading-none">
            <span className="text-sm font-black tracking-widest text-white uppercase block">
              VELVIA TV
            </span>
            <span className="text-[9px] font-mono text-zinc-500 font-semibold tracking-wider">
              SONY BRAVIA
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export const JetStreamTopNav = VelviaTopNav;
