import { ID, Account, Avatars, Databases, Query } from "react-native-appwrite";
import { appwriteConfig, getAppwriteClient } from "../appwrite";
import { User, AppwriteResponse } from "../../constants/types";

const databases = new Databases(getAppwriteClient());
const account = new Account(getAppwriteClient());
const avatars = new Avatars(getAppwriteClient());

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
        accountID: newAccount.$id,
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
  console.log("getting current user");
  try {
    const currentAccount = await getAccount();

    console.log("current account: ", currentAccount);
    if (!currentAccount) throw Error;

    const currentUser: AppwriteResponse<User> = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountID", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log("error1");
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

export async function getUserByID(userID: string) {
  try {
    const events: AppwriteResponse<User> = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.search("$id", userID)]
    );

    if (!events) throw new Error("Something went wrong");

    if (events.documents.length === 0) throw new Error("Something went wrong");
    return events.documents[0];
  } catch (error) {
    throw new Error(error);
  }
}
