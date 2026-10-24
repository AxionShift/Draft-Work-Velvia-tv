import React from 'react';
import { Home, Film, Tv, Sparkles, Search, Settings, FileCode, Radio } from 'lucide-react';
import { ScreenId } from '../types/media';

interface TvNavDrawerProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  focusedNavIndex: number;
  setFocusedNavIndex: (index: number) => void;
}

export const NAV_ITEMS: { id: ScreenId; label: string; icon: React.ElementType }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'movies', label: 'Movies', icon: Film },
  { id: 'series', label: 'TV Shows', icon: Tv },
  { id: 'anime', label: 'Anime', icon: Sparkles },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'export', label: 'Android Code Export', icon: FileCode },
];

export const TvNavDrawer: React.FC<TvNavDrawerProps> = ({
  currentScreen,
  onNavigate,
  isExpanded,
  setIsExpanded,
  focusedNavIndex,
  setFocusedNavIndex
}) => {
  return (
    <aside
      aria-label="Google TV Navigation Drawer"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`fixed left-0 top-0 bottom-0 z-40 flex flex-col justify-between py-6 px-3 bg-gradient-to-r from-[#07090e]/95 to-[#0b0e14]/90 backdrop-blur-2xl border-r border-white/5 transition-all duration-300 ease-out select-none ${
        isExpanded ? 'w-64 shadow-[20px_0_40px_rgba(0,0,0,0.8)]' : 'w-20'
      }`}
    >
      {/* Top TV App Branding */}
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
          <Radio className="w-5 h-5 text-white animate-pulse" />
        </div>
        {isExpanded && (
          <div className="overflow-hidden whitespace-nowrap transition-opacity duration-200">
            <h1 className="text-base font-extrabold tracking-wider bg-gradient-to-r from-blue-400 to-indigo-200 bg-clip-text text-transparent">
              VELVIA TV
            </h1>
            <p className="text-[10px] text-slate-400 font-mono tracking-tight">SONY BRAVIA • GOOGLE TV</p>
          </div>
        )}
      </div>

      {/* Main Navigation Items */}
      <nav className="flex-1 flex flex-col gap-2.5">
        {NAV_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          const isFocused = focusedNavIndex === idx;

          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setFocusedNavIndex(idx);
              }}
              onFocus={() => {
                setIsExpanded(true);
                setFocusedNavIndex(idx);
              }}
              className={`flex items-center gap-3.5 px-3 py-3 rounded-xl transition-all duration-200 text-left cursor-pointer group ${
                isFocused
                  ? 'bg-blue-600 text-white font-semibold tv-focused-subtle'
                  : isActive
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Icon
                className={`w-5 h-5 shrink-0 transition-transform ${
                  isFocused ? 'scale-110 text-white' : isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'
                }`}
              />
              {isExpanded && (
                <span className="text-sm tracking-wide whitespace-nowrap transition-opacity">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Live TV Remote / Device Status Indicator */}
      <div className="pt-4 border-t border-white/5 px-2">
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
          {isExpanded && (
            <span className="truncate">Remote Connected</span>
          )}
        </div>
      </div>
    </aside>
  );
};
