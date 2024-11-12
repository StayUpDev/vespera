import { Databases, Query, ID } from "react-native-appwrite";
import { uploadFile } from "./file";
import { appwriteConfig, getAppwriteClient } from "../appwrite";
import { CreateEvento } from "../../constants/types";

const databases = new Databases(getAppwriteClient());

export async function createEvent(evento: CreateEvento) {
  try {
    const [thumbnailUrl] = await Promise.all([uploadFile(evento.thumbnail)]);

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
        description: evento.description,
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
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.eventoCollectionId,
      [Query.orderDesc("$createdAt")]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get video posts created by user
export async function getUserEvents(userId: string) {
  try {
    const events = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.eventoCollectionId,
      [Query.equal("userID", userId)]
    );

    return events.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getEventByID(eventID: string) {
  try {
    const events = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.eventoCollectionId,
      [Query.search("$id", eventID)]
    );

    if (!events) throw new Error("Something went wrong");

    if (events.documents.length === 0) throw new Error("Event not found");

    return events.documents[0];
  } catch (error) {
    throw new Error(error);
  }
}

export async function searchEvents(query: string) {
  try {
    const events = await databases.listDocuments(
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

export async function getLatestEvents() {
  try {
    const events = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.eventoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return events.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getEventLikesByEventID(eventID: string) {
  try {
    const events = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userEventLikeCollectionId,
      [Query.search("eventoID", eventID)]
    );

    if (!events) throw new Error("Something went wrong");

    return events.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getEventSubscribersByEventID(eventID: string) {
  try {
    const events = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userEventSubscribeCollectionId,
      [Query.search("eventoID", eventID)]
    );

    if (!events) throw new Error("Something went wrong");

    return events.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createEventUserLike(eventID: string, userID: string) {
  try {
    const newEvento = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userEventLikeCollectionId,
      ID.unique(),

      {
        eventoID: eventID,
        userID,
      }
    );

    return newEvento;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteEventUserLike(eventUserLikeID: string) {
  try {
    const evento = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userEventLikeCollectionId,
      eventUserLikeID
    );

    return evento;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createEventUserSubscriber(
  eventID: string,
  userID: string
) {
  try {
    const newEvento = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userEventSubscribeCollectionId,
      ID.unique(),

      {
        eventoID: eventID,
        userID,
      }
    );

    return newEvento;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteEventUserSubscriber(eventUserLikeID: string) {
  try {
    const evento = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userEventSubscribeCollectionId,
      eventUserLikeID
    );

    return evento;
  } catch (error) {
    throw new Error(error);
  }
}
