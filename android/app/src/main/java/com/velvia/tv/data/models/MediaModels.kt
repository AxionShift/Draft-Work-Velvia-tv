package com.velvia.tv.data.models

enum class MediaType {
    MOVIE,
    SERIES,
    ANIME
}

enum class StreamProtocol {
    HLS,
    DASH,
    MP4
}

enum class StreamQuality {
    UHD_4K,
    FHD_1080P,
    HD_720P
}

data class SubtitleTrack(
    val id: String,
    val label: String,
    val lang: String,
    val url: String? = null
)

data class StreamingSource(
    val id: String,
    val name: String,
    val protocol: StreamProtocol,
    val quality: StreamQuality,
    val url: String,
    val audioChannels: String = "5.1 Surround",
    val bitrate: String = "8.5 Mbps",
    val status: String = "Active",
    val pingMs: Int = 28,
    val subtitles: List<SubtitleTrack> = emptyList()
)

data class Episode(
    val id: String,
    val title: String,
    val episodeNumber: Int,
    val seasonNumber: Int,
    val duration: String,
    val thumbnailUrl: String,
    val synopsis: String,
    val sources: List<StreamingSource>
)

data class Season(
    val seasonNumber: Int,
    val title: String,
    val episodes: List<Episode>
)

data class CastMember(
    val name: String,
    val role: String,
    val avatarUrl: String
)

data class MediaItem(
    val id: String,
    val title: String,
    val type: MediaType,
    val year: Int,
    val rating: String,
    val score: Double,
    val duration: String? = null,
    val seasonsCount: Int? = null,
    val episodesCount: Int? = null,
    val genres: List<String>,
    val synopsis: String,
    val director: String,
    val cast: List<CastMember>,
    val posterUrl: String,
    val backdropUrl: String,
    val featured: Boolean = false,
    val continueWatchingProgress: Int? = null,
    val sources: List<StreamingSource> = emptyList(),
    val seasons: List<Season> = emptyList()
)
