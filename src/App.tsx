import React, { useState, useEffect, useCallback } from 'react';
import { VELVIA_MEDIA } from './data/sampleMedia';
import { MediaItem, StreamingSource, ScreenId } from './types/media';
import { VelviaTopNav } from './components/VelviaTopNav';
import { SonyBraviaRemote } from './components/SonyBraviaRemote';
import { VelviaHomeScreen } from './screens/VelviaHomeScreen';
import { VelviaCategoriesScreen } from './screens/VelviaCategoriesScreen';
import { VelviaMediaBrowserScreen } from './screens/VelviaMediaBrowserScreen';
import { VelviaFavoritesScreen } from './screens/VelviaFavoritesScreen';
import { VelviaSearchScreen } from './screens/VelviaSearchScreen';
import { VelviaDetailsScreen } from './screens/VelviaDetailsScreen';
import { VelviaPlayerScreen } from './screens/VelviaPlayerScreen';
import { VelviaSettingsScreen } from './screens/VelviaSettingsScreen';
import { SourceSelectorModal } from './screens/SourceSelectorModal';
import { AndroidExportModal } from './screens/AndroidExportModal';

export default function App() {
  // Navigation & Screen State
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [activeStreamSource, setActiveStreamSource] = useState<StreamingSource | null>(null);
  const [playerTitle, setPlayerTitle] = useState<string>('');
  const [showSourceSelector, setShowSourceSelector] = useState(false);
  const [showAndroidExport, setShowAndroidExport] = useState(false);

  // Dynamic preview item for Immersive Backdrop (Monochrome Grayscale)
  const [previewItem, setPreviewItem] = useState<MediaItem>(VELVIA_MEDIA[0]);

  // Focus Navigation Zone: 'topNav' vs 'content'
  const [focusZone, setFocusZone] = useState<'topNav' | 'content'>('content');
  const [focusedNavIndex, setFocusedNavIndex] = useState(1); // 1 = Home

  // Home Screen Focus State
  const [homeZone, setHomeZone] = useState<'hero' | 'trending' | 'top10' | 'recent'>('hero');
  const [homeCardIndex, setHomeCardIndex] = useState(0);

  // Search Screen Focus State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchZone, setSearchZone] = useState<'input' | 'keyboard' | 'results'>('keyboard');
  const [keyboardRow, setKeyboardRow] = useState(0);
  const [keyboardCol, setKeyboardCol] = useState(0);
  const [searchResultIndex, setSearchResultIndex] = useState(0);

  // Categories Focus State
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [categoryGridIndex, setCategoryGridIndex] = useState(0);

  // Movies / Shows Focus State
  const [mediaBrowserZone, setMediaBrowserZone] = useState<'featured' | 'grid'>('featured');
  const [mediaBrowserFeaturedIndex, setMediaBrowserFeaturedIndex] = useState(0);
  const [mediaBrowserGridIndex, setMediaBrowserGridIndex] = useState(0);

  // Favorites Focus State
  const [favoritesZone, setFavoritesZone] = useState<'chips' | 'grid'>('grid');
  const [favoritesChipIndex, setFavoritesChipIndex] = useState(0);
  const [favoritesGridIndex, setFavoritesGridIndex] = useState(0);

  // Details Screen Focus State
  const [detailsButtonIndex, setDetailsButtonIndex] = useState(0);

  // Source Selector Modal Focus State
  const [sourceModalIndex, setSourceModalIndex] = useState(0);

  // Navigate to Media Details
  const handleOpenDetails = useCallback((media: MediaItem) => {
    setSelectedMedia(media);
    setPreviewItem(media);
    setCurrentScreen('details');
    setDetailsButtonIndex(0);
    setFocusZone('content');
  }, []);

  // Launch Playback
  const handlePlayStream = useCallback((source: StreamingSource, title: string) => {
    setActiveStreamSource(source);
    setPlayerTitle(title);
    setShowSourceSelector(false);
    setCurrentScreen('player');
  }, []);

  // --- D-PAD REMOTE LOGIC (UP, DOWN, LEFT, RIGHT, OK, BACK) ---
  const handleDpadUp = useCallback(() => {
    if (showSourceSelector) {
      setSourceModalIndex((prev) => Math.max(0, prev - 1));
      return;
    }

    if (focusZone === 'topNav') {
      return;
    }

    if (currentScreen === 'home') {
      if (homeZone === 'recent') {
        setHomeZone('top10');
      } else if (homeZone === 'top10') {
        setHomeZone('trending');
      } else if (homeZone === 'trending') {
        setHomeZone('hero');
      } else if (homeZone === 'hero') {
        setFocusZone('topNav');
        setFocusedNavIndex(1); // Home
      }
    } else if (['movies', 'shows'].includes(currentScreen)) {
      if (mediaBrowserZone === 'grid') {
        setMediaBrowserZone('featured');
      } else {
        setFocusZone('topNav');
      }
    } else if (currentScreen === 'favorites') {
      if (favoritesZone === 'grid') {
        setFavoritesZone('chips');
      } else {
        setFocusZone('topNav');
      }
    } else if (currentScreen === 'categories') {
      setFocusZone('topNav');
    } else if (currentScreen === 'search') {
      if (searchZone === 'keyboard') {
        if (keyboardRow > 0) {
          setKeyboardRow((prev) => prev - 1);
        } else {
          setFocusZone('topNav');
        }
      } else if (searchZone === 'results') {
        setSearchResultIndex((prev) => Math.max(0, prev - 4));
      }
    }
  }, [showSourceSelector, focusZone, currentScreen, homeZone, mediaBrowserZone, favoritesZone, searchZone, keyboardRow]);

  const handleDpadDown = useCallback(() => {
    if (showSourceSelector && selectedMedia) {
      setSourceModalIndex((prev) => Math.min(selectedMedia.sources.length - 1, prev + 1));
      return;
    }

    if (focusZone === 'topNav') {
      setFocusZone('content');
      if (currentScreen === 'home') setHomeZone('hero');
      if (['movies', 'shows'].includes(currentScreen)) setMediaBrowserZone('featured');
      if (currentScreen === 'favorites') setFavoritesZone('chips');
      return;
    }

    if (currentScreen === 'home') {
      if (homeZone === 'hero') {
        setHomeZone('trending');
        setHomeCardIndex(0);
      } else if (homeZone === 'trending') {
        setHomeZone('top10');
        setHomeCardIndex(0);
      } else if (homeZone === 'top10') {
        setHomeZone('recent');
        setHomeCardIndex(0);
      }
    } else if (['movies', 'shows'].includes(currentScreen)) {
      if (mediaBrowserZone === 'featured') {
        setMediaBrowserZone('grid');
        setMediaBrowserGridIndex(0);
      } else {
        setMediaBrowserGridIndex((prev) => prev + 5);
      }
    } else if (currentScreen === 'favorites') {
      if (favoritesZone === 'chips') {
        setFavoritesZone('grid');
        setFavoritesGridIndex(0);
      } else {
        setFavoritesGridIndex((prev) => prev + 5);
      }
    } else if (currentScreen === 'search') {
      if (searchZone === 'keyboard') {
        setKeyboardRow((prev) => Math.min(3, prev + 1));
      } else if (searchZone === 'results') {
        setSearchResultIndex((prev) => prev + 4);
      }
    }
  }, [showSourceSelector, selectedMedia, focusZone, currentScreen, homeZone, mediaBrowserZone, favoritesZone, searchZone]);

  const handleDpadLeft = useCallback(() => {
    if (showSourceSelector) return;

    if (focusZone === 'topNav') {
      setFocusedNavIndex((prev) => Math.max(0, prev - 1));
      return;
    }

    if (currentScreen === 'home') {
      if (homeZone === 'trending' || homeZone === 'top10' || homeZone === 'recent') {
        setHomeCardIndex((prev) => Math.max(0, prev - 1));
      }
    } else if (['movies', 'shows'].includes(currentScreen)) {
      if (mediaBrowserZone === 'featured') {
        setMediaBrowserFeaturedIndex(0);
      } else {
        setMediaBrowserGridIndex((prev) => Math.max(0, prev - 1));
      }
    } else if (currentScreen === 'favorites') {
      if (favoritesZone === 'chips') {
        setFavoritesChipIndex((prev) => Math.max(0, prev - 1));
      } else {
        setFavoritesGridIndex((prev) => Math.max(0, prev - 1));
      }
    } else if (currentScreen === 'categories') {
      setCategoryIndex((prev) => Math.max(0, prev - 1));
    } else if (currentScreen === 'search') {
      if (searchZone === 'keyboard') {
        setKeyboardCol((prev) => Math.max(0, prev - 1));
      } else if (searchZone === 'results') {
        setSearchZone('keyboard');
      }
    } else if (currentScreen === 'details') {
      setDetailsButtonIndex((prev) => Math.max(0, prev - 1));
    }
  }, [showSourceSelector, focusZone, currentScreen, homeZone, mediaBrowserZone, favoritesZone, searchZone, keyboardCol]);

  const handleDpadRight = useCallback(() => {
    if (showSourceSelector) return;

    if (focusZone === 'topNav') {
      setFocusedNavIndex((prev) => Math.min(8, prev + 1));
      return;
    }

    if (currentScreen === 'home') {
      if (homeZone === 'trending' || homeZone === 'top10' || homeZone === 'recent') {
        setHomeCardIndex((prev) => prev + 1);
      }
    } else if (['movies', 'shows'].includes(currentScreen)) {
      if (mediaBrowserZone === 'featured') {
        setMediaBrowserFeaturedIndex(1);
      } else {
        setMediaBrowserGridIndex((prev) => prev + 1);
      }
    } else if (currentScreen === 'favorites') {
      if (favoritesZone === 'chips') {
        setFavoritesChipIndex((prev) => prev + 1);
      } else {
        setFavoritesGridIndex((prev) => prev + 1);
      }
    } else if (currentScreen === 'categories') {
      setCategoryIndex((prev) => prev + 1);
    } else if (currentScreen === 'search') {
      if (searchZone === 'keyboard') {
        if (keyboardCol < 9) {
          setKeyboardCol((prev) => prev + 1);
        } else {
          setSearchZone('results');
          setSearchResultIndex(0);
        }
      }
    } else if (currentScreen === 'details') {
      setDetailsButtonIndex((prev) => Math.min(2, prev + 1));
    }
  }, [showSourceSelector, focusZone, currentScreen, homeZone, mediaBrowserZone, favoritesZone, searchZone, keyboardCol]);

  const handleSelect = useCallback(() => {
    if (showSourceSelector && selectedMedia) {
      const src = selectedMedia.sources[sourceModalIndex];
      if (src) handlePlayStream(src, selectedMedia.title);
      return;
    }

    if (focusZone === 'topNav') {
      if (focusedNavIndex === 0 || focusedNavIndex === 7) {
        setCurrentScreen('settings');
      } else if (focusedNavIndex === 1) {
        setCurrentScreen('home');
      } else if (focusedNavIndex === 2) {
        setCurrentScreen('categories');
      } else if (focusedNavIndex === 3) {
        setCurrentScreen('movies');
      } else if (focusedNavIndex === 4) {
        setCurrentScreen('shows');
      } else if (focusedNavIndex === 5) {
        setCurrentScreen('favorites');
      } else if (focusedNavIndex === 6) {
        setCurrentScreen('search');
      } else if (focusedNavIndex === 8) {
        setShowAndroidExport(true);
      }
      setFocusZone('content');
      return;
    }

    if (currentScreen === 'home') {
      if (homeZone === 'hero') {
        const primary = previewItem.sources[0];
        if (primary) handlePlayStream(primary, previewItem.title);
      } else if (homeZone === 'trending') {
        const item = VELVIA_MEDIA.slice(0, 5)[homeCardIndex];
        if (item) handleOpenDetails(item);
      } else if (homeZone === 'top10') {
        const item = VELVIA_MEDIA.slice(0, 7)[homeCardIndex];
        if (item) handleOpenDetails(item);
      } else if (homeZone === 'recent') {
        const item = [...VELVIA_MEDIA].reverse()[homeCardIndex];
        if (item) handleOpenDetails(item);
      }
    } else if (['movies', 'shows'].includes(currentScreen)) {
      const type = currentScreen === 'movies' ? 'movie' : 'series';
      const items = VELVIA_MEDIA.filter((m) => m.type === type);
      if (mediaBrowserZone === 'featured') {
        handleOpenDetails(items[mediaBrowserFeaturedIndex] || items[0]);
      } else {
        handleOpenDetails(items[mediaBrowserGridIndex] || items[0]);
      }
    } else if (currentScreen === 'details') {
      if (detailsButtonIndex === 0 && selectedMedia) {
        const primary = selectedMedia.sources[0];
        if (primary) handlePlayStream(primary, selectedMedia.title);
      } else if (detailsButtonIndex === 1) {
        setShowSourceSelector(true);
      } else if (detailsButtonIndex === 2) {
        setCurrentScreen('home');
      }
    }
  }, [showSourceSelector, selectedMedia, sourceModalIndex, focusZone, focusedNavIndex, currentScreen, homeZone, previewItem, homeCardIndex, mediaBrowserZone, mediaBrowserFeaturedIndex, mediaBrowserGridIndex, detailsButtonIndex, handlePlayStream, handleOpenDetails]);

  const handleBack = useCallback(() => {
    if (showAndroidExport) {
      setShowAndroidExport(false);
      return;
    }
    if (showSourceSelector) {
      setShowSourceSelector(false);
      return;
    }
    if (currentScreen === 'player') {
      setCurrentScreen('details');
      return;
    }
    if (currentScreen === 'details') {
      setCurrentScreen('home');
      return;
    }
    if (currentScreen !== 'home') {
      setCurrentScreen('home');
      return;
    }
    setFocusZone('topNav');
  }, [showAndroidExport, showSourceSelector, currentScreen]);

  const handleHome = useCallback(() => {
    setShowSourceSelector(false);
    setShowAndroidExport(false);
    setCurrentScreen('home');
    setFocusZone('content');
    setHomeZone('hero');
  }, []);

  // Global Keyboard listener for D-pad Remote Emulation
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement && e.key !== 'Escape' && e.key !== 'Enter') {
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          handleDpadUp();
          break;
        case 'ArrowDown':
          e.preventDefault();
          handleDpadDown();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleDpadLeft();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleDpadRight();
          break;
        case 'Enter':
          e.preventDefault();
          handleSelect();
          break;
        case 'Escape':
        case 'Backspace':
          e.preventDefault();
          handleBack();
          break;
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [handleDpadUp, handleDpadDown, handleDpadLeft, handleDpadRight, handleSelect, handleBack]);

  return (
    <div className="relative w-screen h-screen bg-[#09090b] text-[#f4f4f5] overflow-hidden flex flex-col font-sans select-none">
      {/* Velvia TV Dynamic Backdrop (Monochrome Grayscale Contrast) */}
      {currentScreen !== 'player' && (
        <div
          className="fixed inset-0 bg-cover bg-center opacity-20 filter grayscale contrast-125 transition-all duration-700 ease-out -z-10 scale-105"
          style={{ backgroundImage: `url(${previewItem.backdropUrl})` }}
        />
      )}
      <div className="fixed inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/90 to-[#09090b]/80 -z-10" />

      {/* Velvia TV Top Navigation Bar */}
      {currentScreen !== 'player' && (
        <VelviaTopNav
          currentScreen={currentScreen}
          onNavigate={(screen) => {
            setCurrentScreen(screen);
            setFocusZone('content');
          }}
          focusedNavIndex={focusedNavIndex}
          isNavFocused={focusZone === 'topNav'}
          onOpenAndroidExport={() => setShowAndroidExport(true)}
        />
      )}

      {/* Main TV 10-Foot Content Viewport (5% Safe Overscan Margins) */}
      <main
        className={`flex-1 h-full overflow-y-auto no-scrollbar transition-all duration-300 ${
          currentScreen === 'player' ? 'p-0' : 'px-12 pt-4 pb-8'
        }`}
      >
        {currentScreen === 'home' && (
          <VelviaHomeScreen
            mediaList={VELVIA_MEDIA}
            activeZone={homeZone}
            focusedCardIndex={homeCardIndex}
            previewItem={previewItem}
            onSelectMedia={handleOpenDetails}
            onFocusMedia={(m) => setPreviewItem(m)}
            onWatchNow={(m) => {
              const src = m.sources[0];
              if (src) handlePlayStream(src, m.title);
            }}
          />
        )}

        {currentScreen === 'categories' && (
          <VelviaCategoriesScreen
            mediaList={VELVIA_MEDIA}
            focusedCategoryIndex={categoryIndex}
            focusedGridIndex={categoryGridIndex}
            activeSection="categories"
            onSelectMedia={handleOpenDetails}
          />
        )}

        {currentScreen === 'movies' && (
          <VelviaMediaBrowserScreen
            title="Movies"
            mediaType="movie"
            mediaList={VELVIA_MEDIA}
            featuredTitles={['Super Puppy', 'Power Sisters']}
            bottomRowTitle="Popular films this week"
            activeZone={mediaBrowserZone}
            focusedFeaturedIndex={mediaBrowserFeaturedIndex}
            focusedGridIndex={mediaBrowserGridIndex}
            onSelectMedia={handleOpenDetails}
          />
        )}

        {currentScreen === 'shows' && (
          <VelviaMediaBrowserScreen
            title="Shows"
            mediaType="series"
            mediaList={VELVIA_MEDIA}
            featuredTitles={["Don't Let Go", 'Earth']}
            bottomRowTitle="Science documentaries"
            activeZone={mediaBrowserZone}
            focusedFeaturedIndex={mediaBrowserFeaturedIndex}
            focusedGridIndex={mediaBrowserGridIndex}
            onSelectMedia={handleOpenDetails}
          />
        )}

        {currentScreen === 'favorites' && (
          <VelviaFavoritesScreen
            mediaList={VELVIA_MEDIA}
            activeZone={favoritesZone}
            focusedChipIndex={favoritesChipIndex}
            focusedGridIndex={favoritesGridIndex}
            onSelectMedia={handleOpenDetails}
          />
        )}

        {currentScreen === 'search' && (
          <VelviaSearchScreen
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            mediaList={VELVIA_MEDIA}
            activeZone={searchZone}
            keyboardRow={keyboardRow}
            keyboardCol={keyboardCol}
            focusedResultIndex={searchResultIndex}
            onSelectMedia={handleOpenDetails}
          />
        )}

        {currentScreen === 'details' && selectedMedia && (
          <VelviaDetailsScreen
            media={selectedMedia}
            similarMedia={VELVIA_MEDIA.filter((m) => m.id !== selectedMedia.id).slice(0, 5)}
            activeButtonIndex={detailsButtonIndex}
            onPlayStream={handlePlayStream}
            onOpenSourceSelector={() => setShowSourceSelector(true)}
            onSelectMedia={handleOpenDetails}
            onBack={() => setCurrentScreen('home')}
          />
        )}

        {currentScreen === 'player' && activeStreamSource && (
          <VelviaPlayerScreen
            streamSource={activeStreamSource}
            title={playerTitle || 'Velvia TV Playback'}
            onExit={() => setCurrentScreen(selectedMedia ? 'details' : 'home')}
          />
        )}

        {currentScreen === 'settings' && (
          <VelviaSettingsScreen
            onOpenAndroidExport={() => setShowAndroidExport(true)}
            onBack={() => setCurrentScreen('home')}
          />
        )}
      </main>

      {/* Source Selector Modal */}
      {showSourceSelector && selectedMedia && (
        <SourceSelectorModal
          title={selectedMedia.title}
          sources={selectedMedia.sources}
          focusedIndex={sourceModalIndex}
          onSelectSource={(source) => handlePlayStream(source, selectedMedia.title)}
          onClose={() => setShowSourceSelector(false)}
        />
      )}

      {/* Android Studio Native Project Export Modal */}
      {showAndroidExport && (
        <AndroidExportModal onClose={() => setShowAndroidExport(false)} />
      )}

      {/* Floating Sony Bravia TV Remote Controller */}
      {currentScreen !== 'player' && (
        <SonyBraviaRemote
          onDpadUp={handleDpadUp}
          onDpadDown={handleDpadDown}
          onDpadLeft={handleDpadLeft}
          onDpadRight={handleDpadRight}
          onSelect={handleSelect}
          onBack={handleBack}
          onHome={handleHome}
          onPlayPause={() => {
            if (currentScreen === 'details' && selectedMedia) {
              const src = selectedMedia.sources[0];
              if (src) handlePlayStream(src, selectedMedia.title);
            }
          }}
          onSeekForward={() => {}}
          onSeekBackward={() => {}}
          onToggleSubtitles={() => {}}
          onOpenSettings={() => setCurrentScreen('settings')}
        />
      )}
    </div>
  );
}
