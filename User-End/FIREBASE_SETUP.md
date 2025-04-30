# Firebase and Google Authentication Setup Guide

This guide explains how to properly set up Firebase with Google authentication for the Kifayati Bazar app using Expo's AuthSession.

## Firebase Project Setup

1. **Create a Firebase Project**:

   - Go to the [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use an existing one
   - Set up your project with a suitable name and settings

2. **Add Web Application**:

   - In your Firebase project, add a web application
   - Register your app with a name (e.g., "Kifayati Bazar Web")
   - Copy the Firebase configuration (apiKey, authDomain, etc.)
   - This is already configured in `app/firebase/config.js`

3. **Enable Authentication Methods**:
   - Go to Authentication → Sign-in methods
   - Enable Email/Password authentication
   - Enable Google authentication

## Google Authentication Setup

### Important Dependencies

The Google authentication flow uses:

- `expo-auth-session`: For handling OAuth flows across platforms
- `expo-web-browser`: For launching web browser for authentication
- Firebase's authentication methods to verify tokens

### Configuration

1. **Google Cloud Console Setup**:

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Select your project (it should be the same one linked to Firebase)
   - Go to APIs & Services → Credentials
   - Configure the OAuth consent screen with necessary information
   - Create OAuth 2.0 Client IDs for:
     - Web application
     - Android
     - iOS

2. **Authorized Redirect URIs**:
   - For web: Add `https://auth.expo.io/@kifayatibazar/kifayati-bazar`
   - For Android: Add `com.kifayatibazar.app:/oauth2redirect`
   - For iOS: Add `com.kifayatibazar.app:/oauth2redirect`

### Android Setup

1. **Create Android App in Firebase**:

   - Go to Project Settings → Add App → Android
   - Enter package name: `com.kifayatibazar.app` (as specified in app.config.js)
   - Download the `google-services.json` file

2. **SHA Certificate Fingerprints**:

   - Add SHA-1 fingerprint from your development machine
   - Add SHA-1 fingerprint from your production signing certificate

3. **Add google-services.json to your project**:
   - Place the downloaded `google-services.json` file in the project root

### iOS Setup

1. **Create iOS App in Firebase**:

   - Go to Project Settings → Add App → iOS
   - Enter bundle ID: `com.kifayatibazar.app` (as specified in app.config.js)
   - Download the `GoogleService-Info.plist` file

2. **Add GoogleService-Info.plist to your project**:

   - Place the downloaded `GoogleService-Info.plist` file in the project root

3. **URL Scheme Setup**:
   - Ensure the URL scheme in `app.config.js` includes both:
     - The Google Client ID URL scheme
     - The app scheme (`com.kifayatibazar.app`)

## How It Works

The authentication flow works as follows:

1. **User initiates Google sign-in**:

   - On web: Uses Firebase's `signInWithPopup` method
   - On mobile: Uses Expo's AuthSession to start Google OAuth flow

2. **Authentication process**:

   - Mobile: Opens a web browser for authentication
   - Web: Opens a popup window for authentication

3. **After successful authentication**:
   - Google provides an ID token
   - The token is used to create a Firebase credential
   - User is signed in to Firebase with this credential

## Testing The Setup

1. **Build a Development Client**:

   ```
   npx expo prebuild --clean
   npx expo run:android  # For Android
   npx expo run:ios      # For iOS
   ```

2. **Verify Google Sign-In Flow**:
   - Try signing in with Google from the login or signup screen
   - Check for any errors in the console
   - Verify that you're redirected to the main app after successful authentication

## Troubleshooting

### Common Issues:

1. **Redirect URI Mismatch**:

   - Error message about invalid redirect URI
   - Solution: Ensure all redirect URIs are correctly registered in Google Cloud Console

2. **Configuration Files**:

   - Ensure `google-services.json` and `GoogleService-Info.plist` are placed in the right location
   - Make sure the files aren't corrupted or empty

3. **URL Scheme Issues**:

   - Make sure `app.config.js` has the correct URL scheme configuration
   - For iOS, verify that CFBundleURLSchemes contains both the Google client ID and app scheme

4. **Client ID Mismatch**:
   - Ensure the client IDs used in the code match those in your Google Cloud Console
   - Different platforms (iOS, Android, web) need their respective client IDs

For additional help, refer to the official documentation:

- [Expo AuthSession with Google](https://docs.expo.dev/guides/authentication/#google)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Google Sign-In for OAuth](https://developers.google.com/identity/sign-in/web/sign-in)
