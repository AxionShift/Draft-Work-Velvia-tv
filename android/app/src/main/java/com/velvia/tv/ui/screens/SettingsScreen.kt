package com.velvia.tv.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.tv.material3.*

@OptIn(ExperimentalTvMaterial3Api::class)
@Composable
fun SettingsScreen(
    onBackPress: () -> Unit
) {
    var defaultQuality by remember { mutableStateOf("1080p FHD (Recommended)") }
    var audioPassthrough by remember { mutableStateOf("Dolby Digital Plus / Atmos") }
    var subtitlesEnabled by remember { mutableStateOf(true) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(start = 48.dp, end = 48.dp, top = 36.dp, bottom = 27.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Settings & Preferences",
                color = Color.White,
                fontSize = 26.sp,
                fontWeight = FontWeight.Bold
            )
            Button(onClick = onBackPress) {
                Text("Back to Home")
            }
        }

        Spacer(modifier = Modifier.height(28.dp))

        Row(
            modifier = Modifier.fillMaxSize(),
            horizontalArrangement = Arrangement.spacedBy(40.dp)
        ) {
            // Preferences list
            LazyColumn(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxHeight(),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                item {
                    SettingsCard(
                        title = "Playback Quality",
                        subtitle = "Preferred stream resolution when available",
                        value = defaultQuality,
                        onClick = {
                            defaultQuality = if (defaultQuality.startsWith("1080p")) "4K UHD" else "1080p FHD (Recommended)"
                        }
                    )
                }

                item {
                    SettingsCard(
                        title = "Audio Output",
                        subtitle = "HDMI eARC format for Sony Bravia soundbar/receiver",
                        value = audioPassthrough,
                        onClick = {
                            audioPassthrough = if (audioPassthrough.startsWith("Dolby")) "PCM Stereo" else "Dolby Digital Plus / Atmos"
                        }
                    )
                }

                item {
                    SettingsCard(
                        title = "Closed Captions / Subtitles",
                        subtitle = "Display English subtitles automatically on start",
                        value = if (subtitlesEnabled) "Enabled" else "Disabled",
                        onClick = {
                            subtitlesEnabled = !subtitlesEnabled
                        }
                    )
                }
            }

            // About Panel
            Box(
                modifier = Modifier
                    .weight(0.8f)
                    .fillMaxHeight()
                    .background(Color(0xFF131722), RoundedCornerShape(12.dp))
                    .padding(24.dp)
            ) {
                Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Text(
                        text = "About Velvia TV",
                        color = Color.White,
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "Version 1.0.0 (Phase 1 Native Release)",
                        color = Color(0xFF60A5FA),
                        fontSize = 13.sp
                    )
                    Text(
                        text = "Velvia TV is tailored for Sony Bravia and Google TV devices running Android TV 11+. Designed according to Google TV Immersive List, 12-column 52dp layout specifications, and AndroidX Media3 ExoPlayer playback engine.",
                        color = Color(0xFF94A3B8),
                        fontSize = 13.sp,
                        lineHeight = 20.sp
                    )
                    Spacer(modifier = Modifier.height(10.dp))
                    Text(
                        text = "Hardware Target: Sony Bravia Google TV (D-pad remote control)",
                        color = Color(0xFFCBD5E1),
                        fontSize = 12.sp
                    )
                }
            }
        }
    }
}

@OptIn(ExperimentalTvMaterial3Api::class)
@Composable
fun SettingsCard(
    title: String,
    subtitle: String,
    value: String,
    onClick: () -> Unit
) {
    Surface(
        onClick = onClick,
        shape = ClickableSurfaceDefaults.shape(shape = RoundedCornerShape(8.dp)),
        colors = ClickableSurfaceDefaults.colors(
            containerColor = Color(0xFF131722),
            focusedContainerColor = Color(0xFF1E293B)
        ),
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = title,
                    color = Color.White,
                    fontSize = 15.sp,
                    fontWeight = FontWeight.SemiBold
                )
                Text(
                    text = subtitle,
                    color = Color(0xFF94A3B8),
                    fontSize = 12.sp
                )
            }
            Text(
                text = value,
                color = Color(0xFF60A5FA),
                fontSize = 13.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier
                    .background(Color(0x223B82F6), RoundedCornerShape(6.dp))
                    .padding(horizontal = 10.dp, vertical = 6.dp)
            )
        }
    }
}
