import React, { useState } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";

import { icons } from "../constants";
import CustomButton from "./CustomButton";
import { Redirect } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";
import LikeHeart from "./LikeHeart";
import Feather from "@expo/vector-icons/Feather";

const EventCard = ({
  eventID,
  category,
  label,
  thumbnail,
  userID,
}: {
  eventID: string;
  category: string;
  label: string;
  thumbnail: string;
  userID: string;
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <View
        style={{
          shadowColor: "#171717",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
        }}
        className="flex flex-col p-2 w-min justify-between bg-light h-min rounded-3xl mb-6 mx-2"
      >
        <View className="px-2 pt-1 title h-fit">
          <Text className="text-primary text-3xl font-pmedium ">{label}</Text>
        </View>
        <View className="image mt-2 h-max relative rounded-3xl bg-red-400">
          <Image
            source={{ uri: thumbnail }}
            className="w-full  h-[200px] rounded-3xl"
            resizeMode="cover"
          />
          <View className="button absolute -bottom-4 right-4 w-2/5">
            <CustomButton
              title={"participate"}
              containerStyles={"py-2"}
              handlePress={() => toggleModal()}
              isLoading={false}
              textStyles={"text-lg"}
            />
          </View>
        </View>
        <View className="interactions flex flex-row h-min mt-3">
          <View className="ml-2 flex flex-col items-center">
            <LikeHeart eventID={eventID} />
          </View>
          <View className="ml-3">
            <Feather name="message-circle" size={28} color="#595959" />
          </View>
          <View className="ml-3">
            <Feather name="send" size={28} color="#595959" />
          </View>
        </View>
        <View className="description pl-3 mt-3 h-min">
          <Text className="text-gray-500 text-sm font-pregular">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            bibendum, turpis nec ultricies tristique,{" "}
            <Text className="text-secondary-100 font-pmedium">
              view more...
            </Text>
          </Text>
        </View>
        <View className="extrainfo flex flex-row px-2 mt-3 justify-between mb-2">
          <View className="flex flex-row gap-1 items-center max-w-[75%]">
            <View className=" bg-secondary-200 rounded-full w-min h-6 flex justify-center">
              <Text className="text-white text-xs font-pmedium text-center px-3">
                Aperitivo{/*TODO: max length for label 10 characters*/}
              </Text>
            </View>
            <View className=" bg-secondary-200 rounded-full w-min h-6 flex justify-center">
              <Text className="text-white text-xs font-pmedium text-center px-3">
                Aperitivo
              </Text>
            </View>
          </View>
          <View className="flex flex-row">
            <View>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  shadowColor: "#171717",
                  shadowOffset: { width: -2, height: 0 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                }}
                className="border border-secondary bg-white rounded-full w-min p-1 -ml-2"
              >
                <Feather name="user" size={20} color="#7F6AF3" />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  shadowColor: "#171717",
                  shadowOffset: { width: -2, height: 0 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                }}
                onPress={() => {}}
                className="border border-secondary bg-white rounded-full w-min p-1 -ml-2"
              >
                <Feather name="user" size={20} color="#7F6AF3" />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  shadowColor: "#171717",
                  shadowOffset: { width: -2, height: 0 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                }}
                onPress={() => {}}
                className="border border-secondary bg-white rounded-full w-min p-1 -ml-2"
              >
                <Feather name="user" size={20} color="#7F6AF3" />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  shadowColor: "#171717",
                  shadowOffset: { width: -2, height: 0 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                }}
                onPress={() => {}}
                className="border border-secondary bg-white rounded-full w-min p-1 -ml-2"
              >
                <Feather name="user" size={20} color="#7F6AF3" />
              </TouchableOpacity>
            </View>
          </View>
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
