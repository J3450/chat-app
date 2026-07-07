import {Client, Databases} from 'react-native-appwrite';

if (!process.env.EXPO_PUBLIC_APPWRITE_APP_ID || !process.env.EXPO_PUBLIC_APPWRITE_APP_ID) {
    throw new Error("EXPO_PUBLIC_APPWRITE_APP_ID is not set or EXPO_PUBLIC_APPWRITE_APP_ID is not set");
}

const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_APP_ID,
    platfrom: "com.joshua.mordenchatapp",
    db: process.env.EXPO_PUBLIC_APPWRITE_APP_ID,
    col: {
        chatrooms: "",
        messages: "",
    },
};

const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platfrom);

const databases = new Databases(client);

export { databases, client, appwriteConfig};