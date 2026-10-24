export interface AndroidCodeFile {
  path: string;
  language: string;
  description: string;
  content: string;
}

export const ANDROID_PROJECT_FILES: AndroidCodeFile[] = [
  {
    path: 'settings.gradle.kts',
    language: 'kotlin',
    description: 'Gradle root project & repository configuration',
    content: `pluginManagement {
    repositories {
        google {
            content {
                includeGroupByRegex("com\\\\.android.*")
                includeGroupByRegex("com\\\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "VelviaTV"
include(":app")
`
  },
  {
    path: 'build.gradle.kts',
    language: 'kotlin',
    description: 'Root Gradle buildscript with Android & Compose plugins',
    content: `plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.compose.compiler) apply false
}
`
  },
  {
    path: 'gradle/libs.versions.toml',
    language: 'toml',
    description: 'Version Catalog with Android TV Compose & Media3 ExoPlayer',
    content: `[versions]
agp = "8.3.2"
kotlin = "2.0.0"
coreKtx = "1.13.1"
lifecycleRuntimeKtx = "2.8.3"
activityCompose = "1.9.0"
composeBom = "2024.06.00"
tvFoundation = "1.0.0-alpha11"
tvMaterial = "1.0.0"
media3 = "1.3.1"
coilCompose = "2.6.0"
navigationCompose = "2.7.7"

[libraries]
androidx-core-ktx = { group = "androidx.core", name = "core-ktx", version.ref = "coreKtx" }
androidx-lifecycle-runtime-ktx = { group = "androidx.lifecycle", name = "lifecycle-runtime-ktx", version.ref = "lifecycleRuntimeKtx" }
androidx-activity-compose = { group = "androidx.activity", name = "activity-compose", version.ref = "activityCompose" }
androidx-compose-bom = { group = "androidx.compose", name = "compose-bom", version.ref = "composeBom" }
androidx-ui = { group = "androidx.compose.ui", name = "ui" }
androidx-ui-graphics = { group = "androidx.compose.ui", name = "ui-graphics" }
androidx-ui-tooling = { group = "androidx.compose.ui", name = "ui-tooling" }
androidx-ui-tooling-preview = { group = "androidx.compose.ui", name = "ui-tooling-preview" }

# Android TV Jetpack Compose
androidx-tv-foundation = { group = "androidx.tv", name = "tv-foundation", version.ref = "tvFoundation" }
androidx-tv-material = { group = "androidx.tv", name = "tv-material", version.ref = "tvMaterial" }

# Media3 & ExoPlayer for Android TV Playback
androidx-media3-exoplayer = { group = "androidx.media3", name = "media3-exoplayer", version.ref = "media3" }
androidx-media3-exoplayer-hls = { group = "androidx.media3", name = "media3-exoplayer-hls", version.ref = "media3" }
androidx-media3-ui = { group = "androidx.media3", name = "media3-ui", version.ref = "media3" }
androidx-media3-session = { group = "androidx.media3", name = "media3-session", version.ref = "media3" }

# Image Loading
coil-compose = { group = "io.coil-kt", name = "coil-compose", version.ref = "coilCompose" }

# Navigation
androidx-navigation-compose = { group = "androidx.navigation", name = "navigation-compose", version.ref = "navigationCompose" }

[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
compose-compiler = { id = "org.jetbrains.kotlin.plugin.compose", version.ref = "kotlin" }
`
  },
  {
    path: 'app/build.gradle.kts',
    language: 'kotlin',
    description: 'Android TV App Module Build Configuration',
    content: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.compose.compiler)
}

android {
    namespace = "com.velvia.tv"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.velvia.tv"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"

        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.ui)
    implementation(libs.androidx.ui.graphics)
    implementation(libs.androidx.ui.tooling.preview)

    // Android TV Compose Foundation and Material3 (JetStream Standard)
    implementation(libs.androidx.tv.foundation)
    implementation(libs.androidx.tv.material)

    // Media3 / ExoPlayer for TV video streaming
    implementation(libs.androidx.media3.exoplayer)
    implementation(libs.androidx.media3.exoplayer.hls)
    implementation(libs.androidx.media3.ui)
    implementation(libs.androidx.media3.session)

    implementation(libs.coil.compose)
    implementation(libs.androidx.navigation.compose)
    debugImplementation(libs.androidx.ui.tooling)
}
`
  },
  {
    path: 'app/src/main/AndroidManifest.xml',
    language: 'xml',
    description: 'Android TV Leanback Launcher & Permissions Manifest',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <!-- Google TV / Android TV Leanback declaration -->
    <uses-feature
        android:name="android.software.leanback"
        android:required="true" />
    <uses-feature
        android:name="android.hardware.touchscreen"
        android:required="false" />

    <application
        android:allowBackup="true"
        android:icon="@android:drawable/sym_def_app_icon"
        android:banner="@android:drawable/sym_def_app_icon"
        android:label="Velvia TV"
        android:supportsRtl="true"
        android:theme="@android:style/Theme.NoTitleBar.Fullscreen">

        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="keyboard|keyboardHidden|navigation"
            android:screenOrientation="landscape">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LEANBACK_LAUNCHER" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
`
  },
  {
    path: 'app/src/main/java/com/velvia/tv/MainActivity.kt',
    language: 'kotlin',
    description: 'Main TV Activity with Compose NavHost',
    content: `package com.velvia.tv

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.velvia.tv.data.repositories.SampleMediaRepository
import com.velvia.tv.ui.screens.*
import com.velvia.tv.ui.theme.VelviaTvTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            VelviaTvTheme {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(Color(0xFF080A0F))
                ) {
                    val navController = rememberNavController()
                    val repository = remember { SampleMediaRepository() }

                    NavHost(
                        navController = navController,
                        startDestination = "home"
                    ) {
                        composable("home") {
                            HomeScreen(
                                repository = repository,
                                onMediaClick = { mediaId ->
                                    navController.navigate("details/$mediaId")
                                },
                                onSearchClick = {
                                    navController.navigate("search")
                                },
                                onSettingsClick = {
                                    navController.navigate("settings")
                                }
                            )
                        }
                        composable("details/{mediaId}") { backStackEntry ->
                            val mediaId = backStackEntry.arguments?.getString("mediaId") ?: ""
                            DetailsScreen(
                                mediaId = mediaId,
                                repository = repository,
                                onPlayStream = { streamUrl, title ->
                                    navController.navigate("player?url=$streamUrl&title=$title")
                                },
                                onBackPress = {
                                    navController.popBackStack()
                                }
                            )
                        }
                        composable("player?url={url}&title={title}") { backStackEntry ->
                            val streamUrl = backStackEntry.arguments?.getString("url") ?: ""
                            val title = backStackEntry.arguments?.getString("title") ?: "Playback"
                            PlayerScreen(
                                streamUrl = streamUrl,
                                title = title,
                                onBackPress = {
                                    navController.popBackStack()
                                }
                            )
                        }
                        composable("search") {
                            SearchScreen(
                                repository = repository,
                                onMediaClick = { mediaId ->
                                    navController.navigate("details/$mediaId")
                                },
                                onBackPress = {
                                    navController.popBackStack()
                                }
                            )
                        }
                        composable("settings") {
                            SettingsScreen(
                                onBackPress = {
                                    navController.popBackStack()
                                }
                            )
                        }
                    }
                }
            }
        }
    }
}
`
  },
  {
    path: 'app/src/main/java/com/velvia/tv/ui/screens/HomeScreen.kt',
    language: 'kotlin',
    description: 'TV Home Screen with Immersive List preview & LazyRows',
    content: `package com.velvia.tv.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
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
    var continueWatching by remember { mutableStateOf<List<MediaItem>>(emptyList()) }
    var trendingMovies by remember { mutableStateOf<List<MediaItem>>(emptyList()) }
    var popularSeries by remember { mutableStateOf<List<MediaItem>>(emptyList()) }
    var topAnime by remember { mutableStateOf<List<MediaItem>>(emptyList()) }
    var currentPreviewItem by remember { mutableStateOf<MediaItem?>(null) }
    val coroutineScope = rememberCoroutineScope()

    LaunchedEffect(Unit) {
        coroutineScope.launch {
            val featured = repository.getFeaturedMedia()
            currentPreviewItem = featured.firstOrNull()
            continueWatching = repository.getContinueWatching()
            trendingMovies = repository.getTrendingMovies()
            popularSeries = repository.getPopularSeries()
            topAnime = repository.getTopAnime()
        }
    }

    Box(modifier = Modifier.fillMaxSize()) {
        // Dynamic Preview Backdrop
        currentPreviewItem?.let { item ->
            AsyncImage(
                model = item.backdropUrl,
                contentDescription = item.title,
                contentScale = ContentScale.Crop,
                modifier = Modifier.fillMaxWidth().height(480.dp)
            )
            Box(
                modifier = Modifier.fillMaxWidth().height(480.dp).background(
                    Brush.verticalGradient(
                        colors = listOf(Color(0x66080A0F), Color(0xCC080A0F), Color(0xFF080A0F))
                    )
                )
            )
        }

        // TV Safe 5% Overscan
        LazyColumn(
            modifier = Modifier.fillMaxSize().padding(horizontal = 48.dp, vertical = 27.dp),
            verticalArrangement = Arrangement.spacedBy(24.dp)
        ) {
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text("VELVIA TV", color = Color(0xFF60A5FA), fontSize = 24.sp, fontWeight = FontWeight.ExtraBold)
                    Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                        Button(onClick = onSearchClick) { Text("Search") }
                        Button(onClick = onSettingsClick) { Text("Settings") }
                    }
                }
            }

            // Hero Details
            item {
                currentPreviewItem?.let { item ->
                    Column(modifier = Modifier.fillMaxWidth(0.55f)) {
                        Text(item.title, color = Color.White, fontSize = 32.sp, fontWeight = FontWeight.Bold)
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(item.synopsis, color = Color(0xFFCBD5E1), fontSize = 14.sp, maxLines = 3)
                        Spacer(modifier = Modifier.height(16.dp))
                        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                            Button(onClick = { onMediaClick(item.id) }) { Text("Watch Now") }
                            OutlinedButton(onClick = { onMediaClick(item.id) }) { Text("Details & Sources") }
                        }
                    }
                }
            }

            // Rows
            item {
                Text("Continue Watching", color = Color.White, fontSize = 18.sp, fontWeight = FontWeight.Bold)
                LazyRow(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                    items(continueWatching) { media ->
                        TvMediaCard(media = media, isLandscape = true, onClick = { onMediaClick(media.id) }, onFocused = { currentPreviewItem = media })
                    }
                }
            }

            item {
                Text("Trending Movies", color = Color.White, fontSize = 18.sp, fontWeight = FontWeight.Bold)
                LazyRow(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                    items(trendingMovies) { media ->
                        TvMediaCard(media = media, isLandscape = false, onClick = { onMediaClick(media.id) }, onFocused = { currentPreviewItem = media })
                    }
                }
            }
        }
    }
}
`
  },
  {
    path: 'app/src/main/java/com/velvia/tv/ui/screens/PlayerScreen.kt',
    language: 'kotlin',
    description: 'AndroidX Media3 ExoPlayer Screen with remote controls',
    content: `package com.velvia.tv.ui.screens

import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.activity.compose.BackHandler
import androidx.annotation.OptIn
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.viewinterop.AndroidView
import androidx.media3.common.MediaItem
import androidx.media3.common.util.UnstableApi
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.ui.PlayerView

@kotlin.OptIn(androidx.tv.material3.ExperimentalTvMaterial3Api::class)
@OptIn(UnstableApi::class)
@Composable
fun PlayerScreen(
    streamUrl: String,
    title: String,
    onBackPress: () -> Unit
) {
    val context = LocalContext.current
    val exoPlayer = remember {
        ExoPlayer.Builder(context).build().apply {
            setMediaItem(MediaItem.fromUri(streamUrl))
            prepare()
            playWhenReady = true
        }
    }

    DisposableEffect(Unit) {
        onDispose {
            exoPlayer.stop()
            exoPlayer.release()
        }
    }

    BackHandler {
        exoPlayer.stop()
        onBackPress()
    }

    Box(modifier = Modifier.fillMaxSize().background(Color.Black)) {
        AndroidView(
            factory = { ctx ->
                PlayerView(ctx).apply {
                    player = exoPlayer
                    useController = true
                    layoutParams = FrameLayout.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.MATCH_PARENT
                    )
                }
            },
            modifier = Modifier.fillMaxSize()
        )
    }
}
`
  },
  {
    path: 'README.md',
    language: 'markdown',
    description: 'Documentation for opening in Android Studio & ADB Deployment',
    content: `# Velvia TV — Native Android TV (Google TV)

Native Android TV streaming discovery and playback application built with Kotlin, Jetpack Compose for TV (\`androidx.tv.material3\`), and AndroidX Media3 (ExoPlayer).

## How to Deploy to Sony Bravia Google TV
1. Open the \`android\` directory in Android Studio (Hedgehog or newer).
2. Enable Wireless Debugging on your Sony Bravia TV (Settings -> System -> Developer options).
3. Connect via ADB: \`adb connect <TV-IP-ADDRESS>:5555\`
4. Click Run in Android Studio to install and run the APK!
`
  }
];
