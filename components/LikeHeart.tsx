import React, { Fragment } from "react";
import { Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useOptimisticEventLikes } from "../hooks/useEventLikes";
import { useGlobalContext } from "../context/GlobalProvider";
import { getUserEventItem } from "../utils/event";
import { View } from "react-native-animatable";

interface LikeHeartProps {
  eventID: string;
}

export default function LikeHeart({ eventID }: LikeHeartProps) {
  const { user } = useGlobalContext();
  const { handleUserLike, eventLikes, isUpdating } = useOptimisticEventLikes(
    eventID,
    user
  );

  const isEventLiked = getUserEventItem(eventLikes, user?.$id) ? true : false;

  const totalLikes = eventLikes ? eventLikes.length : 0;

  if (isEventLiked) {
    return (
      <Fragment>
        <View className="flex flex-row items-center gap-1">
          <AntDesign
            name="heart"
            disabled={isUpdating}
            size={22}
            color="red"
            onPress={handleUserLike}
          />
          <Text className="text-white text-xs font-pregular min-w-[8px]">
            {totalLikes}
          </Text>
        </View>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <View className="flex flex-row items-center gap-1">
        <AntDesign
          name="hearto"
          size={22}
          color="#fff"
          disabled={isUpdating}
          onPress={handleUserLike}
        />
        <Text className="text-white text-xs font-pregular min-w-[8px]">
          {totalLikes}
        </Text>
      </View>
    </Fragment>
  );
}
