import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native/Libraries/Alert/Alert";
import { Dispatch, SetStateAction } from "react";
import { EventoCreate } from "../../types/event";

export const openPicker = async (
  event: EventoCreate,
  setEvent: Dispatch<SetStateAction<EventoCreate>>
) => {

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled && result.assets) {
    const { uri, mimeType, fileName } = result.assets[0];

    try {
      // Fetch the file data from the URI
      const response = await fetch(uri);
      const blob = await response.blob();

      // Create a File object
      const file = new File([blob], fileName || "thumbnail.jpg", {
        type: mimeType || "image/jpeg",
      });

      // Set the File object to the event
      setEvent({
        ...event,
        thumbnail: file,
      });

      console.log("File created:", file);
    } catch (error) {
      console.error("Failed to create File object:", error);
    }
  } else {
    Alert.alert("Document picker canceled");
  };
}
  ;
