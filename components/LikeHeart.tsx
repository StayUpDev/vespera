import React, { Fragment } from "react";
import { Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";
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
          <Feather
            name="heart"
            disabled={isUpdating}
            size={22}
            color="red"
            onPress={handleUserLike}
          />
            <Text className="text-gray-500 text-xs font-pregular ">
              {totalLikes}
            </Text>
        </View>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <View className="flex flex-row items-center gap-1">
      <Feather
        name="heart"
        size={22}
        color="#595959"
        disabled={isUpdating}
        onPress={handleUserLike}
      />
        <Text className="text-gray-500 text-xs font-pregular">
          {totalLikes}
        </Text>
      </View> 
    </Fragment>
  );
}
