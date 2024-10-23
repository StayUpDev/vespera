import { useState } from "react";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { icons } from "../../constants";
import { createEvent } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Evento } from "../../constants/types";
import { DocumentPickerAsset } from "expo-document-picker";

export type CreateEvento = {
  category: string;
  costo: number;
  dateFrom: Date;
  dateTo: Date;
  label: string;
  parcheggio: boolean;
  tags: string[];
  thumbnail: DocumentPickerAsset;
  userID: string;
};
const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [event, setEvent] = useState<CreateEvento>({
    category: "",
    costo: null,
    dateFrom: new Date(),
    dateTo: new Date(),
    label: "",
    parcheggio: false,
    tags: [],
    thumbnail: null,
    userID: user.$id,
  });

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpg"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setEvent({
          ...event,
          thumbnail: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    if (event.label === "" || !event.thumbnail) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      await createEvent({
        ...event,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setEvent({
        category: "",
        costo: null,
        dateFrom: new Date(),
        dateTo: new Date(),
        label: "",
        parcheggio: false,
        tags: [],
        thumbnail: null,
        userID: user.$id,
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">
          Carica un evento
        </Text>

        <FormField
          title="Titolo Evento"
          value={event.label}
          placeholder="Dai un titolo al tuo evento..."
          handleChangeText={(e) => setEvent({ ...event, label: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <TouchableOpacity onPress={() => openPicker("image")}>
            <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
              <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  className="w-1/2 h-1/2"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {event.thumbnail ? (
              <Image
                source={{ uri: event.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Scegli un file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <CustomButton
          textStyles={null}
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
