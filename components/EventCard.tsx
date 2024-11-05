import React, { useState } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";

import CustomButton from "./CustomButton";
import LikeHeart from "./LikeHeart";
import Feather from "@expo/vector-icons/Feather";
import { Evento } from "../constants/types";
import CustomLabel from "./CustomLabel";
import { getUserByID } from "../lib/clients/user";
import useAppwrite from "../lib/useAppwrite";

interface EventCardProps {
  event: Evento;
}
const EventCard = ({
  event: { category, label, thumbnail, userID, description, $id: eventID },
}: EventCardProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { data } = useAppwrite(() => getUserByID(userID));

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
        <View className="px-2 pt-1 title h-fit flex flex-col">
          <Text className="text-primary text-3xl font-pmedium ">{label}</Text>
          {/* user display component... */}
          <View className="flex flex-row gap-2 items-center">
            <Image
              source={{ uri: data?.avatar }}
              className="w-[40px] h-[40px] rounded-full"
              resizeMode="cover"
            />

            <Text className="text-primary  font-pmedium ">
              {data?.username}
            </Text>
          </View>
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
          {description ? (
            <Text className="text-gray-500 text-sm font-pregular">
              {description}
            </Text>
          ) : (
            <Text className="text-gray-500 text-sm font-pregular">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              bibendum, turpis nec ultricies tristique,{" "}
              <Text className="text-secondary-100 font-pmedium">
                view more...
              </Text>
            </Text>
          )}
        </View>
        <View className="extrainfo flex flex-row px-2 mt-3 justify-between mb-2">
          <View className="flex flex-row gap-1 items-center max-w-[75%]">
            {category && <CustomLabel label={category} />}
            {/* fake data */}
            <CustomLabel label="aperitivo" />
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

export default EventCard;
