import React, { useState } from 'react';
import {
  User,
  Info,
  Subtitles,
  Languages,
  History,
  HelpCircle,
  ChevronRight,
  Download
} from 'lucide-react';
import { SAMPLE_SEARCH_HISTORY } from '../data/sampleMedia';

export interface VelviaSettingsScreenProps {
  onOpenAndroidExport: () => void;
  onBack: () => void;
}

type SettingsSection = 'accounts' | 'about' | 'subtitles' | 'language' | 'history' | 'help';

export const VelviaSettingsScreen: React.FC<VelviaSettingsScreenProps> = ({
  onOpenAndroidExport,
}) => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('accounts');
  const [subtitlesOn, setSubtitlesOn] = useState(true);
  const [searchHistory, setSearchHistory] = useState(SAMPLE_SEARCH_HISTORY);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const SETTINGS_MENU: { id: SettingsSection; label: string; icon: React.ElementType }[] = [
    { id: 'accounts', label: 'Accounts', icon: User },
    { id: 'about', label: 'About', icon: Info },
    { id: 'subtitles', label: 'Subtitles', icon: Subtitles },
    { id: 'language', label: 'Preferred Language', icon: Languages },
    { id: 'history', label: 'Search history', icon: History },
    { id: 'help', label: 'Help and Support', icon: HelpCircle },
  ];

  return (
    <div className="pb-16 select-none animate-fadeIn">
      {/* Velvia TV Two-Column Settings Layout (Monochrome) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 px-1">
        {/* Left Column: Vertical Menu List */}
        <div className="md:col-span-4 bg-zinc-900 p-4 js-radius border border-zinc-800 space-y-1">
          <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider px-3 py-2 mb-2">
            Settings Menu
          </div>
          {SETTINGS_MENU.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 js-radius text-xs font-semibold cursor-pointer transition-all ${
                  isActive
                    ? 'tv-focused-button bg-white text-black font-bold'
                    : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Column: Dynamic Content Panel */}
        <div className="md:col-span-8 bg-zinc-900 p-8 js-radius border border-zinc-800 min-h-[460px]">
          {/* SECTION: ACCOUNTS */}
          {activeSection === 'accounts' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white tracking-tight">Account</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 js-radius bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 cursor-pointer">
                  <span className="text-sm font-medium text-zinc-200">Switch accounts</span>
                  <span className="text-xs font-mono text-zinc-400">222larabrown@gmail.com</span>
                </div>

                <div className="flex items-center justify-between p-4 js-radius bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 cursor-pointer">
                  <span className="text-sm font-medium text-zinc-200">View subscriptions</span>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </div>

                <div className="flex items-center justify-between p-4 js-radius bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 cursor-pointer">
                  <span className="text-sm font-medium text-zinc-200">Change password</span>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </div>

                <div className="flex items-center justify-between p-4 js-radius bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 cursor-pointer">
                  <span className="text-sm font-medium text-zinc-200">Log out</span>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setShowDeleteDialog(true)}
                    className="text-xs text-zinc-400 hover:text-white font-medium cursor-pointer underline"
                  >
                    Delete account options...
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: ABOUT */}
          {activeSection === 'about' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white tracking-tight">About Velvia TV</h3>
              <div className="space-y-3 text-xs text-zinc-300 leading-relaxed bg-zinc-950 p-5 js-radius border border-zinc-800">
                <p>
                  Welcome to Velvia TV! We are a dedicated streaming discovery platform engineered specifically for Sony Bravia and Google TV devices. Our team is dedicated to providing an intuitive and seamless streaming experience for all users.
                </p>
                <p>
                  With a simple and intuitive interface, you can easily find and watch your favorite content in just a few clicks. We offer personalized recommendations based on your viewing history, so you can easily find new and exciting content to enjoy.
                </p>
                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-zinc-500">Application Version</span>
                  <span className="font-mono text-white font-bold">Velvia TV 1.0.1</span>
                </div>
              </div>

              {/* Android Export CTA inside About (Monochrome) */}
              <button
                onClick={onOpenAndroidExport}
                className="flex items-center gap-2 px-5 py-3 js-radius bg-white hover:bg-zinc-200 text-black text-xs font-bold shadow-lg cursor-pointer transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Native Android Studio Project ZIP</span>
              </button>
            </div>
          )}

          {/* SECTION: SUBTITLES */}
          {activeSection === 'subtitles' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white tracking-tight">Settings</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 js-radius bg-zinc-950 border border-zinc-800">
                  <span className="text-sm font-medium text-zinc-200">Subtitles</span>
                  <button
                    onClick={() => setSubtitlesOn(!subtitlesOn)}
                    className={`w-12 h-6 flex items-center js-radius p-1 cursor-pointer transition-colors ${
                      subtitlesOn ? 'bg-white justify-end' : 'bg-zinc-800 justify-start'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full ${subtitlesOn ? 'bg-black' : 'bg-zinc-500'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 js-radius bg-zinc-950 border border-zinc-800 cursor-pointer">
                  <span className="text-sm font-medium text-zinc-200">Subtitles Language</span>
                  <span className="text-xs text-white font-semibold">English</span>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: PREFERRED LANGUAGE */}
          {activeSection === 'language' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white tracking-tight">Preferred Language</h3>
              <div className="space-y-2">
                {['English (US)', 'Español', 'Français', 'Deutsch', '日本語'].map((lang, idx) => (
                  <div
                    key={lang}
                    className={`flex items-center justify-between p-3.5 js-radius cursor-pointer ${
                      idx === 0 ? 'bg-white text-black font-bold' : 'bg-zinc-950 text-zinc-300'
                    }`}
                  >
                    <span className="text-xs">{lang}</span>
                    {idx === 0 && <span className="text-xs text-black font-bold">Selected</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: SEARCH HISTORY */}
          {activeSection === 'history' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white tracking-tight">Search history</h3>
                {searchHistory.length > 0 && (
                  <button
                    onClick={() => setSearchHistory([])}
                    className="px-3 py-1.5 js-radius text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer border border-zinc-700"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {searchHistory.length > 0 ? (
                <div>
                  <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-3">
                    TODAY
                  </span>
                  <div className="space-y-2">
                    {searchHistory.map((query) => (
                      <div
                        key={query}
                        className="p-3 js-radius bg-zinc-950 text-xs font-medium text-zinc-300 flex items-center justify-between border border-zinc-800/60"
                      >
                        <span>{query}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-zinc-500">
                  Search history is empty.
                </div>
              )}
            </div>
          )}

          {/* SECTION: HELP AND SUPPORT */}
          {activeSection === 'help' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white tracking-tight">Help and Support</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 js-radius bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 cursor-pointer">
                  <span className="text-sm font-medium text-zinc-200">FAQ's</span>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </div>
                <div className="flex items-center justify-between p-4 js-radius bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 cursor-pointer">
                  <span className="text-sm font-medium text-zinc-200">Privacy Policy</span>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </div>
                <div className="flex items-center justify-between p-4 js-radius bg-zinc-950 border border-zinc-800">
                  <span className="text-sm font-medium text-zinc-200">Contact us on</span>
                  <span className="text-xs font-mono text-white">support@velvia.tv</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Account Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-md w-full bg-zinc-900 text-white js-radius p-6 border border-zinc-700 shadow-2xl">
            <h4 className="text-lg font-bold mb-2">Delete account?</h4>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              By deactivating your account, you will no longer be able to sign in, your activity will be removed from Velvia TV and your profile preferences will go away. Do you wish to continue?
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="px-4 py-2 js-radius bg-white text-black text-xs font-bold cursor-pointer hover:bg-zinc-200"
              >
                Yes, delete my account
              </button>
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="px-4 py-2 js-radius bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold cursor-pointer border border-zinc-700"
              >
                No, keep it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const JetStreamSettingsScreen = VelviaSettingsScreen;
