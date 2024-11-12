import { Client } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID,
  eventoCollectionId: process.env.EXPO_PUBLIC_APPWRITE_EVENTO_COLLECTION_ID,
  eventoImmagineCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_EVENTO_IMMAGINE_COLLECTION_ID,
  userEventCommentCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_USER_EVENTO_COMMENTO_COLLECTION_ID,
  userEventLikeCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_USER_EVENTO_LIKE_COLLECTION_ID,
  userEventSubscribeCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_USER_EVENTO_SUBSCRIBER_COLLECTION_ID,
};

// Client should be globally defined here and then exported
let clientInstance: Client | null = null;

export const getAppwriteClient = (): Client => {
  if (!clientInstance) {
    clientInstance = new Client();
    clientInstance
      .setEndpoint(appwriteConfig.endpoint)
      .setProject(appwriteConfig.projectId)
      .setPlatform(appwriteConfig.platform);
  }
  return clientInstance;
};
