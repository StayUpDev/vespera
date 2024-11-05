import { ID, Storage } from "react-native-appwrite";
import { appwriteConfig, getAppwriteClient } from "../appwrite";
import { ImagePickerAsset } from "expo-image-picker";
import { ImageAsset } from "../../constants/types";

const storage = new Storage(getAppwriteClient());

export async function uploadFile(file: ImageAsset) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  console.log("Uploading file", asset);
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );

    console.log("Uploaded file", uploadedFile);

    const fileUrl = await getFilePreview(uploadedFile.$id, "image");
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
