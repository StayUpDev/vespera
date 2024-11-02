import { Databases, Query, ID } from "react-native-appwrite";
import { CreateEvento } from "../../app/(tabs)/create";
import { uploadFile } from "./file";
import { appwriteConfig, getAppwriteClient } from "../appwrite";
import { AppwriteResponse, Evento } from "../../constants/types";

const databases = new Databases(getAppwriteClient());

// Create Event
export async function createEvent(evento: CreateEvento) {
  try {
    const [thumbnailUrl] = await Promise.all([
      uploadFile(evento.thumbnail, "image"),
    ]);

    const newEvento = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.eventoCollectionId,
      ID.unique(),

      {
        category: evento.category,
        costo: evento.costo,
        dateFrom: evento.dateFrom,
        dateTo: evento.dateTo,
        label: evento.label,
        parcheggio: evento.parcheggio,
        tags: evento.tags,
        thumbnail: thumbnailUrl,
        userID: evento.userID,
      }
    );

    return newEvento;
  } catch (error) {
    throw new Error(error);
  }
}

// Get all video Posts
export async function getAllEvents() {
  try {
    const posts: AppwriteResponse<Evento> = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.eventoCollectionId
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get video posts created by user
export async function getUserEvents(userId: string) {
  try {
    const events: AppwriteResponse<Evento> = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.eventoCollectionId,
      [Query.equal("userID", userId)]
    );

    return events.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get video posts that matches search query
export async function searchEvents(query: string) {
  try {
    const events: AppwriteResponse<Evento> = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.eventoCollectionId,
      [Query.search("label", query)]
    );

    if (!events) throw new Error("Something went wrong");

    return events.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get latest created video posts
export async function getLatestEvents() {
  try {
    const events: AppwriteResponse<Evento> = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.eventoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return events.documents;
  } catch (error) {
    throw new Error(error);
  }
}