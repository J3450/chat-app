# chat-app
A modern real-time chat app built with React Native, Expo, Clerk authentication, and App Write for Real-time Messaging 

## Tech Stack
- **React Native** — cross-platform mobile (iOS & Android)
- **Expo** — development and build tooling
- **Expo Router** — file-based navigation
- **Clerk** — authentication (Google SSO + Email/Password)
- **Appwrite** — real-time database and backend services
- **TypeScript** — type-safe codebase

## Features
- 🔐 Google Sign In via OAuth SSO
- 📧 Email & Password authentication
- 💬 Real-time chat powered by Appwrite
- 👤 User profile with Google avatar
- 🔒 Protected routes (auth guards)
- 📱 Works on Android & iOS

## Getting Started
1. Clone the repo
2. Run `npm install`
3. Create a `.env.local` file and add your keys:

EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
EXPO_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id


4. Run `npx expo run:android` or `npx expo run:ios`

## Environment Variables
| Variable | Description |
|----------|-------------|
| `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk dashboard publishable key |
| `EXPO_PUBLIC_APPWRITE_ENDPOINT` | Appwrite API endpoint |
| `EXPO_PUBLIC_APPWRITE_PROJECT_ID` | Appwrite project ID |
