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
  Modal,
} from "react-native";

import { icons } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Evento } from "../../constants/types";
import { DocumentPickerAsset } from "expo-document-picker";
import { createEvent } from "../../lib/clients/evento";
import { Picker } from "@react-native-picker/picker";
import CustomModal from "../../components/Modal";
import * as ImagePicker from "expo-image-picker";

// TODO: per ora le categorie sono hardcoded
const categories = [
  "Music",
  "Art",
  "Food",
  "Sports",
  "Tech",
  "Fashion",
  "Health",
  "Education",
  "Travel",
  "Science",
];

export type CreateEvento = {
  description: string;
  category: string;
  costo: number;
  dateFrom: Date;
  dateTo: Date;
  label: string;
  parcheggio: boolean;
  tags: string[];
  thumbnail: ImagePicker.ImagePickerAsset;
  userID: string;
};
const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);

  const [isChoosingCategory, setIsChoosingCategory] = useState(false);

  const [event, setEvent] = useState<CreateEvento>({
    description: "",
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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
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
        description: "",
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
        {/* TODO: areaview */}
        <FormField
          title="Descrizione evento"
          value={event.description}
          placeholder="Dai una descrizione al tuo evento..."
          handleChangeText={(e) => setEvent({ ...event, description: e })}
          otherStyles="mt-10"
        />

        {isChoosingCategory ? (
          <CustomModal
            onClose={() => setIsChoosingCategory(false)}
            title="Scegli la categoria del tuo evento"
            visible={isChoosingCategory}
          >
            <View className="w-full h-full">
              <Picker
                selectedValue={event.category}
                onValueChange={(itemValue, itemIndex) =>
                  setEvent({ ...event, category: itemValue })
                }
              >
                {categories.map((category) => (
                  <Picker.Item
                    label={category}
                    value={category}
                    key={category}
                  />
                ))}
              </Picker>
            </View>
          </CustomModal>
        ) : (
          <CustomButton
            handlePress={() => setIsChoosingCategory(true)}
            title={event.category || "Scegli una categoria"}
          />
        )}

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
