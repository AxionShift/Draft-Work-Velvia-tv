package com.velvia.tv.ui.theme

import androidx.compose.runtime.Composable
import androidx.tv.material3.MaterialTheme
import androidx.tv.material3.darkColorScheme

private val DarkColorScheme = darkColorScheme(
    primary = AccentBlue,
    background = DarkBackground,
    surface = SurfaceDark,
    onPrimary = TextPrimary,
    onBackground = TextPrimary,
    onSurface = TextPrimary,
    border = BorderFocused
)

@Composable
fun VelviaTvTheme(
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = DarkColorScheme,
        content = content
    )
}
