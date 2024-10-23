import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";
import { Evento } from "../constants/types";
import CustomButton from "./CustomButton";

const EventCard = ({
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
    <View className="flex gap-4 h-full ">
      <Image
        source={{ uri: thumbnail }}
        className="w-full h-[10rem] rounded-sm"
        resizeMode="cover"
      />
      <CustomButton
        title={"participate"}
        containerStyles={null}
        handlePress={() => {}}
        isLoading={false}
        textStyles={null}
      />
    </View>
  );
};

const _EventCard = ({
  category,
  label,
  thumbnail,
  userid,
}: {
  category: string;
  label: string;
  thumbnail: string;
  userid: string;
}) => {
  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
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
