package com.velvia.tv.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.tv.material3.*
import coil.compose.AsyncImage
import com.velvia.tv.data.models.MediaItem
import com.velvia.tv.data.repositories.MediaCatalogueProvider
import com.velvia.tv.ui.components.TvMediaCard
import kotlinx.coroutines.launch

@OptIn(ExperimentalTvMaterial3Api::class)
@Composable
fun HomeScreen(
    repository: MediaCatalogueProvider,
    onMediaClick: (String) -> Unit,
    onSearchClick: () -> Unit,
    onSettingsClick: () -> Unit
) {
    var featuredItems by remember { mutableStateOf<List<MediaItem>>(emptyList()) }
    var continueWatching by remember { mutableStateOf<List<MediaItem>>(emptyList()) }
    var trendingMovies by remember { mutableStateOf<List<MediaItem>>(emptyList()) }
    var popularSeries by remember { mutableStateOf<List<MediaItem>>(emptyList()) }
    var topAnime by remember { mutableStateOf<List<MediaItem>>(emptyList()) }

    var currentPreviewItem by remember { mutableStateOf<MediaItem?>(null) }
    val coroutineScope = rememberCoroutineScope()

    LaunchedEffect(Unit) {
        coroutineScope.launch {
            val featured = repository.getFeaturedMedia()
            featuredItems = featured
            currentPreviewItem = featured.firstOrNull()
            continueWatching = repository.getContinueWatching()
            trendingMovies = repository.getTrendingMovies()
            popularSeries = repository.getPopularSeries()
            topAnime = repository.getTopAnime()
        }
    }

    Box(modifier = Modifier.fillMaxSize()) {
        // Immersive Dynamic Backdrop Preview (16:9 Google TV Guideline)
        currentPreviewItem?.let { item ->
            AsyncImage(
                model = item.backdropUrl,
                contentDescription = item.title,
                contentScale = ContentScale.Crop,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(480.dp)
            )

            // Scrim Gradients
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(480.dp)
                    .background(
                        Brush.verticalGradient(
                            colors = listOf(
                                Color(0x66080A0F),
                                Color(0xCC080A0F),
                                Color(0xFF080A0F)
                            )
                        )
                    )
            )
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(480.dp)
                    .background(
                        Brush.horizontalGradient(
                            colors = listOf(
                                Color(0xEE080A0F),
                                Color(0x88080A0F),
                                Color.Transparent
                            )
                        )
                    )
            )
        }

        // TV Main Content with Safe Overscan Margins (48dp left/right, 27dp top/bottom)
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(start = 48.dp, end = 48.dp, top = 27.dp, bottom = 27.dp),
            verticalArrangement = Arrangement.spacedBy(24.dp)
        ) {
            // Top TV Header / Nav Row
            item {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(bottom = 16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "VELVIA TV",
                        color = Color(0xFF60A5FA),
                        fontSize = 24.sp,
                        fontWeight = FontWeight.ExtraBold,
                        letterSpacing = 2.sp
                    )

                    Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                        Button(onClick = onSearchClick) {
                            Text("Search")
                        }
                        Button(onClick = onSettingsClick) {
                            Text("Settings")
                        }
                    }
                }
            }

            // Hero Details Block (Immersive List behavior)
            item {
                currentPreviewItem?.let { item ->
                    Column(
                        modifier = Modifier
                            .fillMaxWidth(0.55f)
                            .padding(bottom = 20.dp)
                    ) {
                        Row(
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = "${item.year}",
                                color = Color(0xFF94A3B8),
                                fontSize = 14.sp
                            )
                            Text(
                                text = "•",
                                color = Color(0xFF94A3B8)
                            )
                            Text(
                                text = item.rating,
                                color = Color(0xFFE2E8F0),
                                fontSize = 13.sp,
                                modifier = Modifier
                                    .background(Color(0x33FFFFFF), RoundedCornerShape(4.dp))
                                    .padding(horizontal = 6.dp, vertical = 2.dp)
                            )
                            Text(
                                text = "★ ${item.score}",
                                color = Color(0xFFF59E0B),
                                fontSize = 14.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }

                        Spacer(modifier = Modifier.height(8.dp))

                        Text(
                            text = item.title,
                            color = Color.White,
                            fontSize = 32.sp,
                            fontWeight = FontWeight.Bold
                        )

                        Spacer(modifier = Modifier.height(8.dp))

                        Text(
                            text = item.synopsis,
                            color = Color(0xFFCBD5E1),
                            fontSize = 14.sp,
                            maxLines = 3,
                            lineHeight = 20.sp
                        )

                        Spacer(modifier = Modifier.height(16.dp))

                        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                            Button(onClick = { onMediaClick(item.id) }) {
                                Text("Watch Now")
                            }
                            OutlinedButton(onClick = { onMediaClick(item.id) }) {
                                Text("Details & Sources")
                            }
                        }
                    }
                }
            }

            // Continue Watching Row (Landscape 16:9 cards)
            if (continueWatching.isNotEmpty()) {
                item {
                    Text(
                        text = "Continue Watching",
                        color = Color.White,
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier.padding(bottom = 10.dp)
                    )
                    LazyRow(
                        horizontalArrangement = Arrangement.spacedBy(16.dp),
                        contentPadding = PaddingValues(end = 48.dp)
                    ) {
                        items(continueWatching) { media ->
                            TvMediaCard(
                                media = media,
                                isLandscape = true,
                                onClick = { onMediaClick(media.id) },
                                onFocused = { currentPreviewItem = media }
                            )
                        }
                    }
                }
            }

            // Trending Movies Row (Poster 2:3 cards)
            item {
                Text(
                    text = "Trending Movies",
                    color = Color.White,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(bottom = 10.dp)
                )
                LazyRow(
                    horizontalArrangement = Arrangement.spacedBy(16.dp),
                    contentPadding = PaddingValues(end = 48.dp)
                ) {
                    items(trendingMovies) { media ->
                        TvMediaCard(
                            media = media,
                            isLandscape = false,
                            onClick = { onMediaClick(media.id) },
                            onFocused = { currentPreviewItem = media }
                        )
                    }
                }
            }

            // Popular Series Row
            item {
                Text(
                    text = "Popular Series",
                    color = Color.White,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(bottom = 10.dp)
                )
                LazyRow(
                    horizontalArrangement = Arrangement.spacedBy(16.dp),
                    contentPadding = PaddingValues(end = 48.dp)
                ) {
                    items(popularSeries) { media ->
                        TvMediaCard(
                            media = media,
                            isLandscape = false,
                            onClick = { onMediaClick(media.id) },
                            onFocused = { currentPreviewItem = media }
                        )
                    }
                }
            }

            // Top Anime Row
            item {
                Text(
                    text = "Anime Discovery",
                    color = Color.White,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(bottom = 10.dp)
                )
                LazyRow(
                    horizontalArrangement = Arrangement.spacedBy(16.dp),
                    contentPadding = PaddingValues(end = 48.dp)
                ) {
                    items(topAnime) { media ->
                        TvMediaCard(
                            media = media,
                            isLandscape = false,
                            onClick = { onMediaClick(media.id) },
                            onFocused = { currentPreviewItem = media }
                        )
                    }
                }
            }
        }
    }
}
