package com.velvia.tv

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
import com.velvia.tv.ui.screens.DetailsScreen
import com.velvia.tv.ui.screens.HomeScreen
import com.velvia.tv.ui.screens.PlayerScreen
import com.velvia.tv.ui.screens.SearchScreen
import com.velvia.tv.ui.screens.SettingsScreen
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
                            val title = backStackEntry.arguments?.getString("title") ?: "Video Playback"
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
