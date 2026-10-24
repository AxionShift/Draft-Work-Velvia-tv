# Velvia TV — Native Android TV (JetStream Design System)

Velvia TV implements the complete **Google TV JetStream** reference design system for Android TV (Kotlin + Jetpack Compose for TV `androidx.tv.material3` & AndroidX Media3 ExoPlayer).

---

## 🎨 JetStream Design Compliance

This implementation accurately replicates the specifications from Google's **JetStream TV** guidelines:
1. **Top Navigation Bar**: Avatar pill, `Home`, `Categories`, `Movies`, `Shows`, `Favorites`, `Search`, and branding.
2. **Typography & Shape**: Inter type scale with 4dp corner radius across cards, buttons, and dialogs.
3. **Focus Outline System**: 3dp outer border outline with 1.05x subtle scale and elevation shadow.
4. **Immersive List & Carousel**: Dynamic preview backdrop revealing title, metadata, and description as cards are focused, with prominent `#1`, `#2`, `#3` numbering on the "Top 10" row.
5. **Entity Details (Vikram Rana Layout)**: Plot summary, director/producers, `▶ Watch now` CTA, 2:3 Cast & Crew cards, and Ratings card (Mashed Potatoes 89%, Star DB 9.2).
6. **Video Player**: OSD time scrub bar, controls, and subtitle close-caption popover (`Off`, `English`, `French`, `German`, `Chinese`, `Spanish`).
7. **Two-Column Settings**: Accounts, About, Subtitles, Language, Search History, Help & Support, and Delete Account dialog.

---

## 🛠️ How to Build & Install in Android Studio

### 1. Requirements
- **Android Studio** Hedgehog (2023.1.1) / Iguana / Koala / Ladybug or newer
- **JDK 17 or JDK 21**
- **Android SDK Platform 34** or 36

### 2. Opening the Project
1. Open Android Studio.
2. Select **File -> Open...** and select the `/android` directory.
3. Allow Gradle to synchronize dependencies.

### 3. Deploying to Sony Bravia Google TV via Wireless ADB
1. On your Sony Bravia TV:
   - Go to **Settings -> System -> About**.
   - Scroll down to **Android TV OS build** and click the `OK` button 7 times until you see *"You are now a developer!"*.
   - Return to **Settings -> System -> Developer options**.
   - Enable **USB debugging** and **Wireless debugging**. Note the IP address and port (e.g., `192.168.1.50:5555`).
2. On your development machine terminal:
   ```bash
   adb connect 192.168.1.50:5555
   ```
   (Accept the authorization prompt on your Sony Bravia TV screen).
3. In Android Studio, select your Sony Bravia device from the run target dropdown and click **Run (Shift + F10)**.

The app will compile into `app/build/outputs/apk/debug/app-debug.apk` and launch directly onto your Sony Bravia Google TV!
