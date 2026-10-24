package com.velvia.tv.ui.components

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.tv.material3.*
import coil.compose.AsyncImage
import com.velvia.tv.data.models.MediaItem
import com.velvia.tv.ui.theme.BorderFocused

@OptIn(ExperimentalTvMaterial3Api::class)
@Composable
fun TvMediaCard(
    media: MediaItem,
    isLandscape: Boolean = false,
    onClick: () -> Unit,
    onFocused: () -> Unit = {}
) {
    var isFocused by remember { mutableStateOf(false) }
    val scale by animateFloatAsState(targetValue = if (isFocused) 1.08f else 1.0f, label = "cardScale")

    val width = if (isLandscape) 280.dp else 160.dp
    val height = if (isLandscape) 158.dp else 240.dp

    Card(
        onClick = onClick,
        modifier = Modifier
            .width(width)
            .height(height)
            .scale(scale)
            .onFocusChanged { focusState ->
                isFocused = focusState.isFocused
                if (focusState.isFocused) {
                    onFocused()
                }
            },
        shape = CardDefaults.shape(shape = RoundedCornerShape(8.dp)),
        border = CardDefaults.border(
            focusedBorder = Border(
                border = BorderStroke(3.dp, BorderFocused),
                shape = RoundedCornerShape(8.dp)
            )
        )
    ) {
        Box(modifier = Modifier.fillMaxSize()) {
            AsyncImage(
                model = if (isLandscape) media.backdropUrl else media.posterUrl,
                contentDescription = media.title,
                contentScale = ContentScale.Crop,
                modifier = Modifier.fillMaxSize()
            )

            // Scrim overlay at the bottom
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(64.dp)
                    .align(Alignment.BottomCenter)
                    .background(
                        Brush.verticalGradient(
                            colors = listOf(Color.Transparent, Color(0xDD080A0F))
                        )
                    )
            )

            // Progress bar if Continue Watching
            media.continueWatchingProgress?.let { progress ->
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(4.dp)
                        .align(Alignment.BottomCenter)
                        .background(Color(0x66FFFFFF))
                ) {
                    Box(
                        modifier = Modifier
                            .fillMaxHeight()
                            .fillMaxWidth(progress / 100f)
                            .background(Color(0xFF3B82F6))
                    )
                }
            }

            Text(
                text = media.title,
                color = Color.White,
                fontSize = 13.sp,
                fontWeight = FontWeight.SemiBold,
                maxLines = 1,
                modifier = Modifier
                    .align(Alignment.BottomStart)
                    .padding(8.dp)
            )
        }
    }
}
