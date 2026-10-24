export type MediaType = 'movie' | 'series' | 'anime';

export interface SubtitleTrack {
  id: string;
  label: string;
  lang: string;
  url?: string;
}

export interface StreamingSource {
  id: string;
  name: string;
  protocol: 'HLS' | 'DASH' | 'MP4';
  quality: '4K UHD' | '1080p FHD' | '720p HD';
  url: string;
  bitrate?: string;
  audioChannels: 'Dolby Atmos' | '5.1 Surround' | 'Stereo';
  status: 'active' | 'degraded' | 'offline';
  pingMs: number;
  subtitles: SubtitleTrack[];
}

export interface Episode {
  id: string;
  title: string;
  episodeNumber: number;
  seasonNumber: number;
  duration: string;
  thumbnailUrl: string;
  synopsis: string;
  sources: StreamingSource[];
}

export interface Season {
  seasonNumber: number;
  title: string;
  episodes: Episode[];
}

export interface CastMember {
  name: string;
  role: string;
  avatarUrl: string;
}

export interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
  year: number;
  rating: string; // e.g. "PG-13", "TV-MA", "TV-14"
  score: number; // e.g. 8.7
  duration?: string; // e.g. "2h 14m" for movie
  seasonsCount?: number; // for series
  episodesCount?: number; // for anime / series
  genres: string[];
  synopsis: string;
  director: string;
  cast: CastMember[];
  posterUrl: string; // 2:3 aspect ratio
  backdropUrl: string; // 16:9 cinematic aspect ratio
  featured?: boolean;
  continueWatchingProgress?: number; // 0 to 100 percentage
  sources: StreamingSource[];
  seasons?: Season[];
}

export type ScreenId =
  | 'home'
  | 'categories'
  | 'movies'
  | 'shows'
  | 'series'
  | 'anime'
  | 'favorites'
  | 'search'
  | 'details'
  | 'player'
  | 'settings'
  | 'export';
