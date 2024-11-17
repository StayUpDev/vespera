/* eslint-disable no-undef */
import { Client, Databases, Storage, Permission, Role } from "node-appwrite";
import { v6 as uuidv6 } from "uuid";
import "dotenv/config";
import { appendFileSync } from "fs";

const APPWIRTE_ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
const APPWRITE_API_KEY = process.env.EXPO_PUBLIC_APPWRITE_API_KEY;

const userCollection = {
  name: "user",
  variableName: "EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID",
  permissions: [
    Permission.read(Role.any()),
    Permission.write(Role.any()),
    Permission.update(Role.any()),
    Permission.delete(Role.any()),
  ],
  attributes: [
    {
      key: "email",
      type: "string",
      required: true,
      size: 255,
      default: undefined,
    },
    {
      key: "password",
      type: "string",
      required: true,
      size: 255,
      default: undefined,
    },
    {
      key: "username",
      type: "string",
      required: true,
      size: 255,
      default: undefined,
    },
    {
      key: "accountID",
      type: "string",
      required: true,
      size: 255,
      default: undefined,
    },
    {
      key: "role",
      type: "string",
      required: false,
      size: 255,
      default: "participant",
    },
    { key: "avatar", type: "url", required: false, size: 255, default: null },
  ],

  indices: [
    {
      key: "index_id",
      type: "fulltext",
      attributes: ["$id"],
    },
  ],
};
const eventoCollection = {
  name: "evento",
  variableName: "EXPO_PUBLIC_APPWRITE_EVENTO_COLLECTION_ID",
  permissions: [
    Permission.read(Role.any()),
    Permission.write(Role.any()),
    Permission.update(Role.any()),
    Permission.delete(Role.any()),
  ],
  attributes: [
    {
      key: "label",
      type: "string",
      required: true,
      size: 255,
      default: undefined,
    },
    {
      key: "dateFrom",
      type: "datetime",
      required: false,
      default: undefined,
    },
    {
      key: "dateTo",
      type: "datetime",
      required: false,
      default: undefined,
    },
    {
      key: "category",
      type: "string",
      size: 255,
      required: false,
      default: null,
    },
    {
      key: "costo",
      type: "float",
      required: false,
      default: null,
    },
    {
      key: "userID",
      type: "string",
      size: 255,
      required: true,
      default: undefined,
    },
    {
      key: "parcheggio",
      type: "boolean",
      required: false,
      default: false,
    },
    {
      key: "dressCode",
      type: "string",
      size: 255,
      required: false,
      default: undefined,
    },
    {
      key: "tags",
      type: "string",
      required: false,

      size: 1024,
      default: undefined,
      array: true,
    },
    {
      key: "description",
      type: "string",
      size: 2048,
      required: false,
      default: undefined,
    },
    {
      key: "thumbnail",
      type: "url",
      required: false,
      size: 255,
      default: null,
    },
  ],

  indices: [
    {
      key: "index_id",
      type: "fulltext",
      attributes: ["$id"],
    },
  ],
};

const eventoImmagineCollection = {
  name: "eventoImmagine",

  variableName: "EXPO_PUBLIC_APPWRITE_EVENTO_IMMAGINE_COLLECTION_ID",
  permissions: [
    Permission.read(Role.any()),
    Permission.write(Role.any()),
    Permission.update(Role.any()),
    Permission.delete(Role.any()),
  ],
  attributes: [
    {
      key: "eventoID",
      type: "string",
      required: true,
      size: 255,
      default: undefined,
    },
    {
      key: "url",
      type: "url",
      required: false,
      size: 255,
      default: null,
    },
  ],

  indices: [
    {
      key: "index_id",
      type: "fulltext",
      attributes: ["$id"],
    },
    {
      key: "index_eventoID",
      type: "fulltext",
      attributes: ["eventoID"],
    },
  ],
};

const userEventoSubscriberCollection = {
  name: "userEventoSubscriber",

  variableName: "EXPO_PUBLIC_APPWRITE_USER_EVENTO_SUBSCRIBER_COLLECTION_ID",
  permissions: [
    Permission.read(Role.any()),
    Permission.write(Role.any()),
    Permission.update(Role.any()),
    Permission.delete(Role.any()),
  ],
  attributes: [
    {
      key: "eventoID",
      type: "string",
      required: true,
      size: 255,
      default: undefined,
    },
    {
      key: "userID",
      type: "string",
      required: true,
      size: 255,
      default: undefined,
    },
  ],

  indices: [
    {
      key: "index_id",
      type: "fulltext",
      attributes: ["$id"],
    },
    {
      key: "index_eventoID",
      type: "fulltext",
      attributes: ["eventoID"],
    },
  ],
};

const userEventoLikeCollection = {
  name: "userEventoLike",

  variableName: "EXPO_PUBLIC_APPWRITE_USER_EVENTO_LIKE_COLLECTION_ID",
  permissions: [
    Permission.read(Role.any()),
    Permission.write(Role.any()),
    Permission.update(Role.any()),
    Permission.delete(Role.any()),
  ],
  attributes: [
    {
      key: "eventoID",
      type: "string",
      required: true,
      size: 255,
      default: undefined,
    },
    {
      key: "userID",
      type: "string",
      required: true,
      size: 255,
      default: undefined,
    },
  ],

  indices: [
    {
      key: "index_id",
      type: "fulltext",
      attributes: ["$id"],
    },
    {
      key: "index_eventoID",
      type: "fulltext",
      attributes: ["eventoID"],
    },
  ],
};

const eventoCommentoCollection = {
  name: "userEventoCommento",
  variableName: "EXPO_PUBLIC_APPWRITE_USER_EVENTO_COMMENTO_COLLECTION_ID",
  permissions: [
    Permission.read(Role.any()),
    Permission.write(Role.any()),
    Permission.update(Role.any()),
    Permission.delete(Role.any()),
  ],
  attributes: [
    {
      key: "eventoID",
      type: "string",
      required: true,
      size: 255,
      default: undefined,
    },
    {
      key: "userID",
      type: "string",
      required: true,
      size: 255,
      default: undefined,
    },
    {
      key: "content",
      type: "string",
      required: true,
      size: 1024,
      default: undefined,
    },
  ],

  indices: [
    {
      key: "index_id",
      type: "fulltext",
      attributes: ["$id"],
    },
  ],
};

// Initialize the Appwrite client
const client = new Client();

const databases = new Databases(client);
const storages = new Storage(client);

client
  .setEndpoint(APPWIRTE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID)
  .setKey(APPWRITE_API_KEY);

let databaseID = null;

const createDatabase = async () => {
  try {
    const response = await databases.create(uuidv6(), "vespera_TEST");
    databaseID = response["$id"];

    const envAppwriteFile = ".env";
    const envData = `EXPO_PUBLIC_APPWRITE_DATABASE_ID=${databaseID}\n`;

    appendFileSync(envAppwriteFile, envData);
    console.log(`Database ID saved to ${envAppwriteFile}`);
    return response;
  } catch (error) {
    console.error("Error creating database:", error);
  }
};

const createCollection = async (collectionData) => {
  try {
    const collectionId = uuidv6();
    const collectionName = collectionData.name;

    const permissions = [
      Permission.read(Role.any()),
      Permission.write(Role.any()),
      Permission.update(Role.any()),
      Permission.delete(Role.any()),
    ];

    await databases.createCollection(
      databaseID,
      collectionId,
      collectionName,
      permissions
    );

    const envAppwriteFile = ".env";
    const envData = `${collectionData.variableName}=${collectionId}\n`;
    appendFileSync(envAppwriteFile, envData);
    console.log(`Collection ID saved to ${envAppwriteFile}`);

    // Wait for the attributes to be created before adding indices
    await addCollectionAttributes(collectionId, collectionData.attributes);

    // After attributes are created, add the indices
    await addCollectionIndices(collectionId, collectionData.indices);
  } catch (error) {
    console.error("Error creating collection:", error);
  }
};

const addCollectionIndices = async (collectionId, indices) => {
  await databases.listAttributes(databaseID, collectionId);
  try {
    for (const index of indices) {
      await databases.createIndex(
        databaseID,
        collectionId,
        index.key,
        index.type,
        index.attributes
      );
    }

    console.log("All indices added successfully for: ", collectionId);
  } catch (error) {
    console.error("Error adding indices:", error, collectionId);
  }
};

const addCollectionAttributes = async (collectionId, attributes) => {
  try {
    for (const attribute of attributes) {
      if (attribute.type === "string") {
        await databases.createStringAttribute(
          databaseID,
          collectionId,
          attribute.key,
          attribute.size,
          attribute.required,
          attribute.default,
          attribute?.array
        );
      } else if (attribute.type === "integer") {
        await databases.createIntegerAttribute(
          databaseID,
          collectionId,
          attribute.key,
          attribute.required,
          undefined,
          undefined,
          attribute.default
        );
      } else if (attribute.type === "float") {
        await databases.createFloatAttribute(
          databaseID,
          collectionId,
          attribute.key,
          attribute.required,
          undefined,
          undefined,
          attribute.default
        );
      } else if (attribute.type === "boolean") {
        await databases.createBooleanAttribute(
          databaseID,
          collectionId,
          attribute.key,
          attribute.required,
          attribute.default
        );
      } else if (attribute.type === "url") {
        await databases.createUrlAttribute(
          databaseID,
          collectionId,
          attribute.key,
          attribute.required,
          attribute.default
        );
      } else if (attribute.type === "datetime") {
        await databases.createDatetimeAttribute(
          databaseID,
          collectionId,
          attribute.key,
          attribute.required,
          attribute.default
        );
      }
    }

    console.log("All attributes added successfully for: ", collectionId);
  } catch (error) {
    console.error("Error adding attributes:", error);
  }
};

const createBucket = async () => {
  try {
    const permissions = [
      Permission.read(Role.any()),
      Permission.write(Role.any()),
      Permission.update(Role.any()),
      Permission.delete(Role.any()),
    ];
    const response = await storages.createBucket(
      uuidv6(),
      "vespera_TEST",
      permissions
    );

    const envAppwriteFile = ".env";
    const envData = `EXPO_PUBLIC_APPWRITE_STORAGE_ID=${response["$id"]}\n`;

    appendFileSync(envAppwriteFile, envData);
    console.log(`Storage ID saved to ${envAppwriteFile}`);
    return response;
  } catch (error) {
    console.error("Error creating Storage:", error);
  }
};

const response = await createDatabase();

if (response) {
  await createCollection(userCollection);
  await createCollection(eventoCollection);
  await createCollection(userEventoLikeCollection);
  await createCollection(userEventoSubscriberCollection);
  await createCollection(eventoCommentoCollection);
  await createCollection(eventoImmagineCollection);
  await createBucket();
}
