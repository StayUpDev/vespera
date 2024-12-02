import { useState } from "react";
import { router } from "expo-router";
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
import { CustomButton, FormField } from "../../components";
import {  useGlobalContext } from "../../context/GlobalProvider";
import { Picker } from "@react-native-picker/picker";
import CustomModal from "../../components/Modal";
import { getEmptyEventState } from "../../utils/event";
import { openPicker } from "../../utils/event/create";
import React from "react";
import { EventoCreate } from "../../types/event";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../_layout";

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

const Create = () => {
  const { user } = useGlobalContext();
  const [isChoosingCategory, setIsChoosingCategory] = useState(false);
  const [event, setEvent] = useState<EventoCreate>(getEmptyEventState(user.ID));


  const {mutate: createEvent, isPending} = useMutation({
    mutationFn: async () => {
         
      
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["event_user", "event"] });
    }
  })


  const submit = async () => {
    if (event.label === "" || !event.thumbnail) {
      return Alert.alert("Please provide all fields");
    }
    
    createEvent()
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
                onValueChange={(itemValue) =>
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

          <TouchableOpacity onPress={() => openPicker(event, setEvent)}>
            {event.thumbnail ? (
              <Image
                source={{ uri: event.thumbnail }}
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
          isLoading={isPending}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
