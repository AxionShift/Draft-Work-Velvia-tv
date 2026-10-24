import { MediaItem, StreamingSource } from '../types/media';

// Verified, reliable public test streams for playback
export const TEST_STREAMS: Record<string, StreamingSource[]> = {
  vikramRana: [
    {
      id: 'vr-hls-4k',
      name: 'CloudCDN Stream (Primary HLS)',
      protocol: 'HLS',
      quality: '4K UHD',
      url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      bitrate: '14.2 Mbps',
      audioChannels: '5.1 Surround',
      status: 'active',
      pingMs: 24,
      subtitles: [
        { id: 'off', label: 'Off', lang: 'off' },
        { id: 'en', label: 'English', lang: 'en' },
        { id: 'fr', label: 'French', lang: 'fr' },
        { id: 'de', label: 'German', lang: 'de' },
        { id: 'zh', label: 'Chinese (Simplified)', lang: 'zh' },
        { id: 'es', label: 'Spanish', lang: 'es' }
      ]
    },
    {
      id: 'vr-mp4-1080',
      name: 'Direct MP4 Mirror (1080p)',
      protocol: 'MP4',
      quality: '1080p FHD',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      bitrate: '8.4 Mbps',
      audioChannels: 'Stereo',
      status: 'active',
      pingMs: 34,
      subtitles: [
        { id: 'en', label: 'English', lang: 'en' }
      ]
    }
  ],
  shadowHunter: [
    {
      id: 'sh-1080',
      name: 'High Definition Feed (1080p)',
      protocol: 'MP4',
      quality: '1080p FHD',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      bitrate: '7.8 Mbps',
      audioChannels: 'Dolby Atmos',
      status: 'active',
      pingMs: 28,
      subtitles: [
        { id: 'off', label: 'Off', lang: 'off' },
        { id: 'en', label: 'English', lang: 'en' },
        { id: 'fr', label: 'French', lang: 'fr' }
      ]
    }
  ],
  superPuppy: [
    {
      id: 'sp-1080',
      name: 'Master Video Feed',
      protocol: 'MP4',
      quality: '1080p FHD',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      bitrate: '6.2 Mbps',
      audioChannels: 'Stereo',
      status: 'active',
      pingMs: 22,
      subtitles: [{ id: 'en', label: 'English', lang: 'en' }]
    }
  ],
  earthDoc: [
    {
      id: 'ed-1080',
      name: 'Nature 4K Feed',
      protocol: 'MP4',
      quality: '4K UHD',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      bitrate: '11.5 Mbps',
      audioChannels: '5.1 Surround',
      status: 'active',
      pingMs: 26,
      subtitles: [{ id: 'en', label: 'English', lang: 'en' }]
    }
  ]
};

export const VELVIA_MEDIA: MediaItem[] = [
  // --- VELVIA TV HERO & TRENDING ---
  {
    id: 'vikram-rana',
    title: 'Vikram Rana',
    type: 'movie',
    year: 2022,
    rating: 'PG-13',
    score: 9.2,
    duration: '1h 54m',
    genres: ['Action', 'Superhero', 'Thriller'],
    synopsis: 'A fearless warrior embarks on a thrilling journey to protect his kingdom, discovering his true destiny along the way.',
    director: 'Alexandre Dimitrov',
    cast: [
      { name: 'Rajiv Patel', role: 'Vikram Rana', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
      { name: 'Tris Ledsworth', role: 'Kill Shot', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
      { name: 'Sadie Lawman', role: 'Jane Foster', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
      { name: 'John Littleton', role: 'Dan Tomas', avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80' },
      { name: 'Johnny Hawkins', role: 'Tommy Hank', avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80' },
      { name: 'Mellan Akerskog', role: 'Edward Pope', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1920&q=80',
    featured: true,
    continueWatchingProgress: 72,
    sources: TEST_STREAMS.vikramRana
  },
  {
    id: 'shadow-hunter',
    title: 'Shadow Hunter',
    type: 'movie',
    year: 2023,
    rating: 'PG-13',
    score: 8.9,
    duration: '2h 08m',
    genres: ['Action', 'Mystery', 'Crime'],
    synopsis: 'A relentless detective unravels a web of secrets, navigating betrayal and shadows in a high-stakes conspiracy.',
    director: 'Julian Vance',
    cast: [
      { name: 'Gabriel Cross', role: 'Det. Lucas Shadow', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
      { name: 'Lian Zhang', role: 'Elena Frost', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80',
    featured: true,
    continueWatchingProgress: 35,
    sources: TEST_STREAMS.shadowHunter
  },
  {
    id: 'power-sisters',
    title: 'Power Sisters',
    type: 'movie',
    year: 2022,
    rating: 'UA 13+',
    score: 8.7,
    duration: '2h 15m',
    genres: ['Superhero', 'Action', 'Sci-Fi'],
    synopsis: 'A dynamic duo of superhero siblings join forces to save their city from a sinister villain, redefining sisterhood in action.',
    director: 'Marcus Sterling',
    cast: [
      { name: 'Elena Vance', role: 'Nova', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
      { name: 'Sarah Sterling', role: 'Valkyrie', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1920&q=80',
    featured: true,
    sources: TEST_STREAMS.vikramRana
  },
  {
    id: 'super-puppy',
    title: 'Super Puppy',
    type: 'movie',
    year: 2021,
    rating: 'UA 13+',
    score: 8.5,
    duration: '1h 53m',
    genres: ['Action', 'Comedy', 'Family'],
    synopsis: 'An adorable, super-powered puppy leaps into action, saving the day with his heroic antics and melting hearts along the way.',
    director: 'Claire Fontaine',
    cast: [
      { name: 'Sparkie (Voice)', role: 'Max', avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1920&q=80',
    sources: TEST_STREAMS.superPuppy
  },
  {
    id: 'luke-strong',
    title: 'Luke Strong',
    type: 'movie',
    year: 2023,
    rating: 'R',
    score: 8.8,
    duration: '2h 02m',
    genres: ['Action', 'Thriller', 'Crime'],
    synopsis: 'A former military operative is forced back into the line of fire when his underground syndicate is betrayed from within.',
    director: 'Torstein Lind',
    cast: [
      { name: 'David Kurosawa', role: 'Luke Strong', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80',
    sources: TEST_STREAMS.vikramRana
  },
  {
    id: 'yellow',
    title: 'Yellow',
    type: 'movie',
    year: 2024,
    rating: 'PG-13',
    score: 8.6,
    duration: '1h 48m',
    genres: ['Mystery', 'Drama', 'Sci-Fi'],
    synopsis: 'A lone wanderer in a coat traverses a submerged dystopian metropolis searching for relic beacons of human transmission.',
    director: 'Samantha Ross',
    cast: [
      { name: 'Naomi Jones', role: 'The Wanderer', avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1510519138197-06b8628cbf4a?auto=format&fit=crop&w=1920&q=80',
    sources: TEST_STREAMS.shadowHunter
  },
  {
    id: '2502',
    title: '2502',
    type: 'movie',
    year: 2024,
    rating: 'PG-13',
    score: 9.0,
    duration: '2h 20m',
    genres: ['Sci-Fi', 'Thriller'],
    synopsis: 'Five centuries into the future, an artificial orbital city loses gravitation lock, threatening terrestrial civilizations below.',
    director: 'Ren Sato',
    cast: [
      { name: 'Kenji Takahashi', role: 'Architect Orion', avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1920&q=80',
    sources: TEST_STREAMS.vikramRana
  },
  {
    id: 'lion',
    title: 'Lion',
    type: 'movie',
    year: 2022,
    rating: 'PG',
    score: 8.3,
    duration: '1h 38m',
    genres: ['Documentaries', 'Nature'],
    synopsis: 'Witness the majesty of African savanna pride dynamics captured through ultra-high-definition nocturnal lenses.',
    director: 'Claire Fontaine',
    cast: [
      { name: 'Narrator', role: 'Voice of the Wild', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80',
    sources: TEST_STREAMS.earthDoc
  },
  {
    id: 'him',
    title: 'him',
    type: 'movie',
    year: 2023,
    rating: 'R',
    score: 8.2,
    duration: '1h 45m',
    genres: ['Drama', 'Horror', 'Mystery'],
    synopsis: 'A psychological labyrinth where past memories manifest into physical apparitions.',
    director: 'Brynjar Thorne',
    cast: [
      { name: 'Kaelen Val', role: 'Arthur', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1920&q=80',
    sources: TEST_STREAMS.shadowHunter
  },
  {
    id: 'amelia-jones',
    title: 'Amelia Jones',
    type: 'movie',
    year: 2023,
    rating: 'PG-13',
    score: 8.9,
    duration: '2h 12m',
    genres: ['Adventure', 'Action', 'Mystery'],
    synopsis: 'An intrepid archeologist unearths an ancient Mesoamerican astrolabe linked to forgotten planetary alignments.',
    director: 'Torstein Lind',
    cast: [
      { name: 'Sadie Lawman', role: 'Amelia Jones', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80',
    sources: TEST_STREAMS.vikramRana
  },
  {
    id: 'wanted',
    title: 'Wanted',
    type: 'movie',
    year: 2024,
    rating: 'TV-MA',
    score: 8.4,
    duration: '1h 55m',
    genres: ['Action', 'Crime'],
    synopsis: 'Across three continents, five elusive fugitives find themselves cornered by an algorithmic bounty hunter.',
    director: 'Alexandre Dimitrov',
    cast: [
      { name: 'John Littleton', role: 'Agent Cole', avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1920&q=80',
    sources: TEST_STREAMS.shadowHunter
  },

  // --- TV SHOWS ---
  {
    id: 'dont-let-go',
    title: "Don't Let Go",
    type: 'series',
    year: 2023,
    rating: 'TV-14',
    score: 8.9,
    seasonsCount: 2,
    episodesCount: 16,
    genres: ['Drama', 'Fantasy', 'Romance'],
    synopsis: 'A charming prince falls for an immortal vampire, setting off centuries of forbidden royal conflict.',
    director: 'Julian Vance',
    cast: [
      { name: 'Gabriel Cross', role: 'Prince Valerie', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80',
    featured: true,
    sources: TEST_STREAMS.vikramRana
  },
  {
    id: 'earth',
    title: 'Earth',
    type: 'series',
    year: 2024,
    rating: 'TV-PG',
    score: 9.5,
    seasonsCount: 3,
    episodesCount: 18,
    genres: ['Documentaries', 'Nature', 'Science'],
    synopsis: 'A scientific journey exploring our blue planet, its geological history and resilient atmospheric wonders.',
    director: 'Claire Fontaine',
    cast: [
      { name: 'Dr. Ilsa Meyer', role: 'Host', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1920&q=80',
    featured: true,
    sources: TEST_STREAMS.earthDoc
  },
  {
    id: 'ape-country',
    title: 'Ape Country',
    type: 'series',
    year: 2022,
    rating: 'TV-PG',
    score: 8.6,
    seasonsCount: 1,
    episodesCount: 6,
    genres: ['Documentaries', 'Nature'],
    synopsis: 'In the volcanic rainforests of Central Africa, primate clans navigate shifting territorial boundaries.',
    director: 'Samantha Ross',
    cast: [
      { name: 'Forest Ranger Leo', role: 'Tracker', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=1920&q=80',
    sources: TEST_STREAMS.earthDoc
  },
  {
    id: 'zaloria',
    title: 'Zaloria',
    type: 'series',
    year: 2024,
    rating: 'TV-MA',
    score: 9.1,
    seasonsCount: 2,
    episodesCount: 12,
    genres: ['Fantasy', 'Action', 'Drama'],
    synopsis: 'The floating archipelagos of Zaloria battle for dominance following the fracture of the celestial crystal.',
    director: 'Torstein Lind',
    cast: [
      { name: 'Kaelen Val', role: 'Commander Vane', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1920&q=80',
    sources: TEST_STREAMS.vikramRana
  },
  {
    id: 'immortal-rider',
    title: 'Immortal Rider',
    type: 'series',
    year: 2023,
    rating: 'TV-14',
    score: 8.7,
    seasonsCount: 2,
    episodesCount: 14,
    genres: ['Fantasy', 'Adventure'],
    synopsis: 'A spirit horse and a nomadic warrior traverse enchanted mountain trails to protect sacred spirit shrines.',
    director: 'Brynjar Thorne',
    cast: [
      { name: 'Hiroshi Sato', role: 'The Rider', avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80',
    sources: TEST_STREAMS.shadowHunter
  },
  {
    id: 'pink-city',
    title: 'Pink City',
    type: 'series',
    year: 2024,
    rating: 'TV-MA',
    score: 8.8,
    seasonsCount: 1,
    episodesCount: 8,
    genres: ['Cyberpunk', 'Crime', 'Sci-Fi'],
    synopsis: 'Underneath neon-drenched skies of a metropolis, rogue cyber-hackers challenge corporate dominance.',
    director: 'Ren Sato',
    cast: [
      { name: 'Mira Rostova', role: 'Kira', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' }
    ],
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80',
    sources: TEST_STREAMS.vikramRana
  }
];

// Clean Monochrome Categories (No colored gradients)
export const VELVIA_CATEGORIES = [
  { id: 'action', label: 'Action' },
  { id: 'documentaries', label: 'Documentaries' },
  { id: 'black-voices', label: 'Black Voices' },
  { id: 'comedy', label: 'Comedy' },
  { id: 'nature', label: 'Nature' },
  { id: 'fantasy', label: 'Fantasy' },
  { id: 'foreign', label: 'Foreign' },
  { id: 'horror', label: 'Horror' },
  { id: 'lgbtq', label: 'LGBTQ' },
  { id: 'war-military', label: 'War & Military' },
  { id: 'musicals', label: 'Musicals' },
  { id: 'scifi', label: 'Sci-Fi' }
];

export const SAMPLE_SEARCH_HISTORY = ['Earth', 'Zaloria', '2052', 'Infinite', 'Pink City'];
