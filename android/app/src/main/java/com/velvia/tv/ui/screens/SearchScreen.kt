package com.velvia.tv.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.tv.material3.*
import com.velvia.tv.data.models.MediaItem
import com.velvia.tv.data.repositories.SampleMediaRepository
import com.velvia.tv.ui.components.TvMediaCard
import kotlinx.coroutines.launch

@OptIn(ExperimentalTvMaterial3Api::class)
@Composable
fun SearchScreen(
    repository: SampleMediaRepository,
    onMediaClick: (String) -> Unit,
    onBackPress: () -> Unit
) {
    var searchQuery by remember { mutableStateOf("") }
    var searchResults by remember { mutableStateOf<List<MediaItem>>(emptyList()) }
    val scope = rememberCoroutineScope()

    LaunchedEffect(searchQuery) {
        scope.launch {
            searchResults = repository.searchCatalogue(searchQuery)
        }
    }

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
                text = "Search Velvia TV",
                color = Color.White,
                fontSize = 26.sp,
                fontWeight = FontWeight.Bold
            )
            Button(onClick = onBackPress) {
                Text("Back")
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Search Input field
        Box(
            modifier = Modifier
                .fillMaxWidth(0.6f)
                .background(Color(0xFF131722), RoundedCornerShape(8.dp))
                .padding(horizontal = 16.dp, vertical = 12.dp)
        ) {
            if (searchQuery.isEmpty()) {
                Text(
                    text = "Type movie, series or anime title...",
                    color = Color(0xFF64748B),
                    fontSize = 15.sp
                )
            }
            BasicTextField(
                value = searchQuery,
                onValueChange = { searchQuery = it },
                textStyle = TextStyle(color = Color.White, fontSize = 15.sp),
                cursorBrush = SolidColor(Color(0xFF60A5FA)),
                modifier = Modifier.fillMaxWidth()
            )
        }

        Spacer(modifier = Modifier.height(24.dp))

        if (searchResults.isEmpty()) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(top = 40.dp),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "No media titles match \"$searchQuery\"",
                    color = Color(0xFF64748B),
                    fontSize = 16.sp
                )
            }
        } else {
            LazyVerticalGrid(
                columns = GridCells.Adaptive(160.dp),
                horizontalArrangement = Arrangement.spacedBy(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp),
                modifier = Modifier.fillMaxSize()
            ) {
                items(searchResults) { item ->
                    TvMediaCard(
                        media = item,
                        isLandscape = false,
                        onClick = { onMediaClick(item.id) }
                    )
                }
            }
        }
    }
}
