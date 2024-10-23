import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";
import { AppwriteResponse, Evento, User } from "../constants/types";
import { CreateEvento } from "../app/(tabs)/create";

export const appwriteConfig = {
  endpoint: "http://172.20.10.3/v1",
  platform: "com.rickturner2001.vespera",
  projectId: "6716aa5a000aeb3cc595",
  storageId: "6716b1730013ea729044",
  databaseId: "6716aadc0021933167de",
  userCollectionId: "6716aae60031a288dd2b",
  eventoCollectionId: "6716b72f0023f7a016aa",
  eventoImmagineCollectionId: "6716be440021a7da5bc8",
  userEventCommentCollectionId: "6716ba75000543c02b42",
  userEventLikeCollectionId: "6716ba2b0014ba44c4ff",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(
  email: string,
  password: string,
  username: string
) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser: User = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
        password: password,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export async function signIn(email: string, password: string) {
  try {
    const session = await account.createEmailSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser: AppwriteResponse<User> = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Upload File
export async function uploadFile(file, type) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

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
