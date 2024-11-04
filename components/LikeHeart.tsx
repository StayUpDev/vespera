import { View, Text } from "react-native";
import React, { Fragment } from "react";
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useOptimisticEventLikes } from "../hooks/useEventLikes";
import { getUserEventLikeItem } from "../utils/event";
import { useGlobalContext } from "../context/GlobalProvider";

interface LikeHeartProps {
  eventID: string;
}

export default function LikeHeart({ eventID }: LikeHeartProps) {
  const { user } = useGlobalContext();
  const { handleUserLike, eventLikes, isUpdating } = useOptimisticEventLikes(
    eventID,
    user
  );

  const isEventLiked = getUserEventLikeItem(eventLikes, user.$id)
    ? true
    : false;

  const totalLikes = eventLikes ? eventLikes.length : 0;

  if (isEventLiked) {
    return (
      <Fragment>
        <Feather
          name="heart"
          disabled={isUpdating}
          size={28}
          color="red"
          onPress={handleUserLike}
        />
        <Text className="text-gray-500 text-xs font-pregular">
          {totalLikes}
        </Text>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Feather
        name="heart"
        size={28}
        color="#595959"
        disabled={isUpdating}
        onPress={handleUserLike}
      />
      <Text className="text-gray-500 text-xs font-pregular">{totalLikes}</Text>
    </Fragment>
  );
}
