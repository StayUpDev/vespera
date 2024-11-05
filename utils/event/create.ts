import * as ImagePicker from "expo-image-picker";
import { CreateEvento, ImageAsset } from "../../constants/types";
import { Alert } from "react-native/Libraries/Alert/Alert";
import { Dispatch, SetStateAction } from "react";

export const openPicker = async (
  event: CreateEvento,
  setEvent: Dispatch<SetStateAction<CreateEvento>>
) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled && result.assets) {
    const { uri, mimeType, fileName, fileSize } = result.assets[0];

    const asset: ImageAsset = {
      name: fileName ?? "default_name.jpg",
      type: mimeType ?? "image/jpeg",
      size: fileSize ?? 0,
      uri: uri,
      mimeType: mimeType ?? "image/jpeg",
    };

    setEvent({
      ...event,
      thumbnail: asset,
    });
  } else {
    Alert.alert("Document picker canceled");
  }
};
