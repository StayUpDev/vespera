import React, { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Animated,
  Modal,
} from "react-native";

import { icons } from "../constants";
import CustomButton from "./CustomButton";
import Feather from "@expo/vector-icons/Feather";
import { Redirect, useNavigation } from "expo-router";

const EventCard = ({
  eventID,
  category,
  label,
  thumbnail,
  userID,
}: {
  eventID;
  category: string;
  label: string;
  thumbnail: string;
  userID: string;
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const openDrawerWithDetails = () => {
    console.log("openDrawerWithDetails");
    return <Redirect href={"(tabs)/(card)/details"} />;
  };
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View className="flex-1 items-center justify-center bg-white">
          <View className="w-3/4 p-6 bg-white rounded-lg">
            <Text className="text-lg font-semibold text-center mb-4">
              This is a modal!
            </Text>
            <TouchableOpacity
              onPress={toggleModal}
              className="mt-4 px-4 py-2 bg-[#FFA001] rounded"
            >
              <Text className="text-white text-center">Close Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View className="flex flex-col items-center mb-14">
        <Text className="text-gray-100 text-lg text-gray-100 w-full">
          {label}
        </Text>
        <View className="w-full relative">
          <Image
            source={{ uri: thumbnail }}
            className="w-full  h-[250px] rounded-sm flex justify-center items-center"
            resizeMode="cover"
          />
          <View
            className="absolute bottom-0  right-4 "
            style={{ transform: [{ translateY: 25 }] }}
          >
            <CustomButton
              title={"participate"}
              containerStyles={"mt-2  px-6 py-3"}
              handlePress={() => toggleModal()}
              isLoading={false}
              textStyles={null}
            />
          </View>
        </View>
        <View className="w-full flex flex-row   my-8">
          <TouchableOpacity
            onPress={() => {}}
            className="bg-[#39383B]  w-8 h-8 items-center justify-center rounded-full p-1"
          >
            <Feather name="user" size={20} color="#7F6AF3" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{ marginLeft: -12 }}
            className="bg-[#39383B] w-8 h-8 items-center justify-center rounded-full p-1"
          >
            <Feather name="user" size={20} color="#7F6AF3" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: -12 }}
            onPress={() => {}}
            className="bg-[#39383B]  w-8 h-8 items-center justify-center rounded-full p-1"
          >
            <Feather name="user" size={20} color="#7F6AF3" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: -12 }}
            className="bg-[#39383B]  w-8 h-8 items-center justify-center rounded-full p-1"
          >
            <Feather name="user" size={20} color="#7F6AF3" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const _EventCard = ({
  category,
  label,
  thumbnail,
  userID,
}: {
  category: string;
  label: string;
  thumbnail: string;
  userID: string;
}) => {
  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center">
          <View className="w-[46px] h-full rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: thumbnail }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {label}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {userID}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
    </View>
  );
};

export default EventCard;
