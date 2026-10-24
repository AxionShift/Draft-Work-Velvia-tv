package com.velvia.tv.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.tv.material3.*
import coil.compose.AsyncImage
import com.velvia.tv.data.models.MediaItem
import com.velvia.tv.data.models.StreamingSource
import com.velvia.tv.data.repositories.SampleMediaRepository

@OptIn(ExperimentalTvMaterial3Api::class)
@Composable
fun DetailsScreen(
    mediaId: String,
    repository: SampleMediaRepository,
    onPlayStream: (String, String) -> Unit,
    onBackPress: () -> Unit
) {
    var mediaItem by remember { mutableStateOf<MediaItem?>(null) }
    var showSourceSelector by remember { mutableStateOf(false) }

    LaunchedEffect(mediaId) {
        mediaItem = repository.getMediaById(mediaId)
    }

    val item = mediaItem ?: return

    Box(modifier = Modifier.fillMaxSize()) {
        // High-res 16:9 Backdrop
        AsyncImage(
            model = item.backdropUrl,
            contentDescription = item.title,
            contentScale = ContentScale.Crop,
            modifier = Modifier.fillMaxSize()
        )

        // Gradient Scrim for readable 10-foot TV distance
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    Brush.horizontalGradient(
                        colors = listOf(
                            Color(0xFA080A0F),
                            Color(0xEE080A0F),
                            Color(0x99080A0F),
                            Color(0x33080A0F)
                        )
                    )
                )
        )

        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(start = 48.dp, end = 48.dp, top = 40.dp, bottom = 30.dp),
            verticalArrangement = Arrangement.spacedBy(18.dp)
        ) {
            item {
                Row(
                    horizontalArrangement = Arrangement.spacedBy(10.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = item.type.name,
                        color = Color(0xFF60A5FA),
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier
                            .background(Color(0x223B82F6), RoundedCornerShape(4.dp))
                            .padding(horizontal = 8.dp, vertical = 4.dp)
                    )
                    Text(text = "${item.year}", color = Color(0xFF94A3B8), fontSize = 14.sp)
                    Text(text = "•", color = Color(0xFF94A3B8))
                    Text(
                        text = item.rating,
                        color = Color(0xFFCBD5E1),
                        fontSize = 12.sp,
                        modifier = Modifier
                            .background(Color(0x22FFFFFF), RoundedCornerShape(4.dp))
                            .padding(horizontal = 6.dp, vertical = 2.dp)
                    )
                    item.duration?.let {
                        Text(text = "•", color = Color(0xFF94A3B8))
                        Text(text = it, color = Color(0xFF94A3B8), fontSize = 14.sp)
                    }
                    Text(text = "•", color = Color(0xFF94A3B8))
                    Text(
                        text = "★ ${item.score}",
                        color = Color(0xFFF59E0B),
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }

            item {
                Text(
                    text = item.title,
                    color = Color.White,
                    fontSize = 38.sp,
                    fontWeight = FontWeight.Bold
                )
            }

            item {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    item.genres.forEach { genre ->
                        Text(
                            text = genre,
                            color = Color(0xFF94A3B8),
                            fontSize = 13.sp,
                            modifier = Modifier
                                .background(Color(0x1AFFFFFF), RoundedCornerShape(12.dp))
                                .padding(horizontal = 10.dp, vertical = 4.dp)
                        )
                    }
                }
            }

            item {
                Text(
                    text = item.synopsis,
                    color = Color(0xFFCBD5E1),
                    fontSize = 15.sp,
                    lineHeight = 22.sp,
                    modifier = Modifier.fillMaxWidth(0.6f)
                )
            }

            // CTAs: Play & Source Selection
            item {
                Row(
                    horizontalArrangement = Arrangement.spacedBy(16.dp),
                    modifier = Modifier.padding(vertical = 12.dp)
                ) {
                    Button(
                        onClick = {
                            val defaultSource = item.sources.firstOrNull()
                            if (defaultSource != null) {
                                onPlayStream(defaultSource.url, item.title)
                            }
                        }
                    ) {
                        Text("▶ Play Now")
                    }

                    OutlinedButton(
                        onClick = { showSourceSelector = !showSourceSelector }
                    ) {
                        Text("Choose Source (${item.sources.size})")
                    }

                    OutlinedButton(onClick = onBackPress) {
                        Text("Back")
                    }
                }
            }

            // Source Selector Pane if expanded
            if (showSourceSelector) {
                item {
                    Text(
                        text = "Available Streaming Sources",
                        color = Color.White,
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier.padding(top = 10.dp)
                    )
                }
                items(item.sources) { source ->
                    SourceRowItem(
                        source = source,
                        onSelect = { onPlayStream(source.url, item.title) }
                    )
                }
            }

            // Cast & Crew Row
            item {
                Text(
                    text = "Cast & Crew",
                    color = Color.White,
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(top = 16.dp, bottom = 8.dp)
                )
                LazyRow(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                    items(item.cast) { castMember ->
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(10.dp),
                            modifier = Modifier
                                .background(Color(0x22131722), RoundedCornerShape(8.dp))
                                .padding(8.dp)
                        ) {
                            AsyncImage(
                                model = castMember.avatarUrl,
                                contentDescription = castMember.name,
                                contentScale = ContentScale.Crop,
                                modifier = Modifier
                                    .size(44.dp)
                                    .clip(CircleShape)
                            )
                            Column {
                                Text(
                                    text = castMember.name,
                                    color = Color.White,
                                    fontSize = 13.sp,
                                    fontWeight = FontWeight.SemiBold
                                )
                                Text(
                                    text = castMember.role,
                                    color = Color(0xFF94A3B8),
                                    fontSize = 11.sp
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}

@OptIn(ExperimentalTvMaterial3Api::class)
@Composable
fun SourceRowItem(
    source: StreamingSource,
    onSelect: () -> Unit
) {
    Surface(
        onClick = onSelect,
        shape = ClickableSurfaceDefaults.shape(shape = RoundedCornerShape(8.dp)),
        colors = ClickableSurfaceDefaults.colors(
            containerColor = Color(0xFF131722),
            focusedContainerColor = Color(0xFF1E293B)
        ),
        modifier = Modifier
            .fillMaxWidth(0.6f)
            .padding(vertical = 4.dp)
    ) {
        Row(
            modifier = Modifier.padding(12.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = source.name,
                    color = Color.White,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.SemiBold
                )
                Text(
                    text = "${source.protocol} • ${source.quality} • ${source.audioChannels}",
                    color = Color(0xFF94A3B8),
                    fontSize = 12.sp
                )
            }
            Text(
                text = "${source.pingMs}ms",
                color = Color(0xFF10B981),
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold
            )
        }
    }
}
