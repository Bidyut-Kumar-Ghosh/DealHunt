# Firebase Authentication for Deal Hunt

This project implements Firebase Authentication for user signup, login, and profile management. The authentication system provides both email/password and Google authentication methods.

## Authentication Features

- **Email/Password Authentication**: Users can sign up and log in with their email and password
- **Google Authentication**: Users can authenticate using their Google accounts
- **Password Reset**: Forgot password functionality for users to reset their passwords
- **Authentication State Management**: Global auth state management using React Context
- **Route Protection**: Protected routes with automatic redirection for unauthenticated users

## Implementation Details

### Firebase Configuration

Firebase is configured in `app/firebase/config.js` with the necessary authentication services initialized.

### Authentication Flow

1. **Initial Load**: The app checks the authentication state on load and redirects to the appropriate screen:

   - If authenticated: Redirects to the main app tabs
   - If not authenticated: Redirects to the login screen

2. **Login Screen**:

   - Handles email/password login via Firebase
   - Provides Google authentication option
   - Links to signup and forgot password screens

3. **Signup Screen**:

   - Validates user inputs
   - Creates new user accounts with Firebase
   - Updates user profile with display name
   - Supports Google signup

4. **Forgot Password**:

   - Sends password reset emails via Firebase
   - Confirms when reset link is sent

5. **Profile Management**:
   - Displays user information
   - Provides logout functionality
   - Shows authentication state

### Protected Routes

The `AuthGuard` component ensures that only authenticated users can access protected routes. It automatically redirects unauthenticated users to the login screen.

### Authentication State

The `AuthContext` provides global access to the authentication state throughout the app, including:

- Current user information
- Loading state during authentication checks

## How to Use

1. **Setup**:

   - Ensure Firebase configuration in `app/firebase/config.js` has the correct credentials
   - Install all dependencies with `npm install`

2. **Run the App**:

   - `npm start`: Starts the development server
   - Use Expo Go app or web browser to access the application

3. **Authentication Tests**:
   - Test registration with new email addresses
   - Test login with existing accounts
   - Test Google authentication
   - Test password reset functionality

## Mobile-specific Considerations

For Google authentication on mobile devices, additional setup is required:

- For Android: Configure Google Services and update the GoogleService-Info.plist
- For iOS: Set up Google Sign-In SDK and update Info.plist

The current implementation provides placeholders for these platform-specific setups.

## Future Enhancements

- Add phone number authentication
- Implement email verification
- Add social login options (Facebook, Apple, etc.)
- Enhance profile management with avatar uploads

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
