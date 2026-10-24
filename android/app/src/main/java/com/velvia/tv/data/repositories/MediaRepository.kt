package com.velvia.tv.data.repositories

import com.velvia.tv.data.models.*

interface MediaCatalogueProvider {
    suspend fun getFeaturedMedia(): List<MediaItem>
    suspend fun getContinueWatching(): List<MediaItem>
    suspend fun getTrendingMovies(): List<MediaItem>
    suspend fun getPopularSeries(): List<MediaItem>
    suspend fun getTopAnime(): List<MediaItem>
    suspend fun getRecentlyAdded(): List<MediaItem>
    suspend fun getMediaById(id: String): MediaItem?
    suspend fun searchCatalogue(query: String, filter: MediaType? = null): List<MediaItem>
}

interface StreamingSourceProvider {
    suspend fun getSourcesForMedia(mediaId: String): List<StreamingSource>
    suspend fun getSourcesForEpisode(mediaId: String, episodeId: String): List<StreamingSource>
}

class SampleMediaRepository : MediaCatalogueProvider, StreamingSourceProvider {

    private val sampleSources = listOf(
        StreamingSource(
            id = "tos-hls-4k",
            name = "CloudCDN Alpha (Primary HLS)",
            protocol = StreamProtocol.HLS,
            quality = StreamQuality.UHD_4K,
            url = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
            audioChannels = "5.1 Surround",
            bitrate = "14.2 Mbps",
            status = "Active",
            pingMs = 24
        ),
        StreamingSource(
            id = "tos-mp4-1080",
            name = "Edge Cache Direct (1080p MP4)",
            protocol = StreamProtocol.MP4,
            quality = StreamQuality.FHD_1080P,
            url = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            audioChannels = "Stereo",
            bitrate = "8.4 Mbps",
            status = "Active",
            pingMs = 38
        )
    )

    private val sampleItems = listOf(
        MediaItem(
            id = "movie-chrono-shift",
            title = "Chrono Shift: Continuum",
            type = MediaType.MOVIE,
            year = 2024,
            rating = "PG-13",
            score = 8.9,
            duration = "2h 18m",
            genres = listOf("Sci-Fi", "Action", "Thriller"),
            synopsis = "When a temporal anomaly fractures Earth's quantum grid, an elite squadron of chrono-navigators must venture into volatile paradox zones.",
            director = "Marcus Sterling",
            cast = listOf(
                CastMember("Elena Vance", "Commander Maya Ruiz", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"),
                CastMember("David Kurosawa", "Dr. Jason Lee", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80")
            ),
            posterUrl = "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
            backdropUrl = "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80",
            featured = true,
            continueWatchingProgress = 65,
            sources = sampleSources
        ),
        MediaItem(
            id = "series-silicon-shadows",
            title = "Silicon Shadows",
            type = MediaType.SERIES,
            year = 2024,
            rating = "TV-MA",
            score = 9.3,
            seasonsCount = 2,
            episodesCount = 16,
            genres = listOf("Drama", "Thriller", "Technology"),
            synopsis = "Behind the gleaming campus of a neural interface monopoly, rogue software architects orchestrate a decentralized rebellion.",
            director = "Julian Vance",
            cast = listOf(
                CastMember("Gabriel Cross", "Devin Thorne", "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80")
            ),
            posterUrl = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
            backdropUrl = "https://images.unsplash.com/photo-1510519138197-06b8628cbf4a?auto=format&fit=crop&w=1920&q=80",
            featured = true,
            continueWatchingProgress = 40,
            sources = sampleSources
        ),
        MediaItem(
            id = "anime-vanguard-zero",
            title = "Vanguard: Zero Paradox",
            type = MediaType.ANIME,
            year = 2024,
            rating = "TV-14",
            score = 9.4,
            episodesCount = 24,
            genres = listOf("Mecha", "Sci-Fi", "Action"),
            synopsis = "In the year 2188, humanity defends orbit against crystalline bio-constructs called The Resonants.",
            director = "Kenji Kamiyama",
            cast = listOf(
                CastMember("Hiroshi Sato", "Ren Tachibana", "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80")
            ),
            posterUrl = "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
            backdropUrl = "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1920&q=80",
            featured = true,
            continueWatchingProgress = 88,
            sources = sampleSources
        )
    )

    override suspend fun getFeaturedMedia(): List<MediaItem> = sampleItems.filter { it.featured }
    override suspend fun getContinueWatching(): List<MediaItem> = sampleItems.filter { it.continueWatchingProgress != null }
    override suspend fun getTrendingMovies(): List<MediaItem> = sampleItems.filter { it.type == MediaType.MOVIE }
    override suspend fun getPopularSeries(): List<MediaItem> = sampleItems.filter { it.type == MediaType.SERIES }
    override suspend fun getTopAnime(): List<MediaItem> = sampleItems.filter { it.type == MediaType.ANIME }
    override suspend fun getRecentlyAdded(): List<MediaItem> = sampleItems
    override suspend fun getMediaById(id: String): MediaItem? = sampleItems.find { it.id == id }

    override suspend fun searchCatalogue(query: String, filter: MediaType?): List<MediaItem> {
        return sampleItems.filter { item ->
            val matchesFilter = filter == null || item.type == filter
            val matchesQuery = query.isBlank() || item.title.contains(query, ignoreCase = true) || item.genres.any { it.contains(query, ignoreCase = true) }
            matchesFilter && matchesQuery
        }
    }

    override suspend fun getSourcesForMedia(mediaId: String): List<StreamingSource> {
        return sampleItems.find { it.id == mediaId }?.sources ?: emptyList()
    }

    override suspend fun getSourcesForEpisode(mediaId: String, episodeId: String): List<StreamingSource> {
        return sampleSources
    }
}
