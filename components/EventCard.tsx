import React from "react";
import { View, Image, Text, Pressable } from "react-native";

import LikeHeart from "./LikeHeart";
import ShareEvent from "./ShareEvent";
import Feather from "@expo/vector-icons/Feather";
import { Evento } from "../constants/types";
import CustomLabel from "./CustomLabel";
import { getUserByID } from "../lib/clients/user";
import useAppwrite from "../lib/useAppwrite";
import { useRouter } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";
import SubscriberButton from "./SubscribeButton";
import UserBadge from "./UserBadge";
interface EventCardProps {
  event: Evento;
}
const EventCard = ({
  event: { category, label, thumbnail, userID, description, $id: eventID },
}: EventCardProps) => {
  const router = useRouter();
  const { data } = useAppwrite(() => getUserByID(userID));
  const { user } = useGlobalContext();

  return (
    <Pressable
      // onPress={() => {
      //   if (user && user.role == "promoter") {
      //     router.push(`promoter/${eventID}`);
      //   } else {
      //     router.push(`participant/${eventID}`);
      //   }
      // }}
      style={{
        shadowColor: "#171717",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      }}
      className="flex flex-1 flex-col py-2 justify-between bg-[#121212] h-min mb-6 "
    >
      <View className="title flex flex-col">
        <View className="flex flex-row justify-between items-end px-1">
          <View className="flex flex-row items-end">
            <UserBadge
              avatarURL="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
              size="lg"
            />
            <View className="flex flex-col justify-between px-1">
              <Text className="text-[#fff] text-base font-pmedium">
                {label}
              </Text>
              <Text className="text-gray-400 text-[10px]">
                Price: € 15 - € 20
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-end mr-1">
            <UserBadge
              size={"md"}
              containerStyles="-ml-2"
              avatarURL={
                "https://cdn.pixabay.com/photo/2022/01/11/21/48/link-6931554_640.png"
              }
            />
            <UserBadge
              size={"md"}
              containerStyles="-ml-2"
              avatarURL={
                "https://cdn.pixabay.com/photo/2022/01/11/21/48/link-6931554_640.png"
              }
            />
            <UserBadge
              size={"md"}
              containerStyles="-ml-2"
              avatarURL={
                "https://cdn.pixabay.com/photo/2022/01/11/21/48/link-6931554_640.png"
              }
            />
            <UserBadge
              size={"md"}
              containerStyles="-ml-2"
              avatarURL={
                "https://cdn.pixabay.com/photo/2022/01/11/21/48/link-6931554_640.png"
              }
            />
          </View>
        </View>

        {/*<View className="flex flex-row gap-2 items-center">
          

          <Text className="text-[#fff]  font-pmedium ">
            {/* data?.username * /}Username
          </Text>
        </View>*/}
      </View>
      <View className="image mt-2 h-max relative bg-red-400">
        <Image
          source={{ uri: thumbnail }}
          className="w-full  h-[200px] "
          resizeMode="cover"
        />
      </View>
      <View className="interactions flex flex-row justify-between items-center h-min mt-3">
        <View className="flex flex-row">
          <View className="ml-2 flex flex-col items-center">
            <LikeHeart eventID={eventID} />
          </View>
          <View className="ml-3">
            <Feather name="message-circle" size={22} color="#fff" />
          </View>
          <View className="ml-3">
            <ShareEvent />
          </View>
        </View>
        <View className="flex flex-row items-center gap-1">
          <View className="button mr-2">
            {user && user.role == "participant" && (
              <SubscriberButton eventID={eventID} />
            )}
          </View>
        </View>
      </View>
      <View className="description pl-3 mt-3 h-min">
        {description ? (
          <Text className="text-[#fff] text-xs font-pregular">
            {description}
          </Text>
        ) : (
          <Text className="text-[#fff] text-sm font-pregular">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            bibendum, turpis nec ultricies tristique,{" "}
            <Text className="text-secondary-100 font-pmedium">
              view more...
            </Text>
          </Text>
        )}
      </View>
      <View className="extrainfo flex flex-row px-2 mt-3 justify-between">
        <View className="flex flex-row flex-wrap items-center ">
          {category && <CustomLabel category="main" label={category} />}
          <CustomLabel category="tag" label="aperitivo" />
          <CustomLabel category="tag" label="musica" />
          <CustomLabel category="tag" label="ciola" />
          <CustomLabel category="tag" label="molla" />
          <CustomLabel category="tag" label="frolla" />
        </View>
      </View>
    </Pressable>
  );
};

export default EventCard;
