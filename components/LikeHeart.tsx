import React, { Fragment } from "react";
import { Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useGlobalContext } from "../context/GlobalProvider";

interface LikeHeartProps {
  eventID: number;
}

export default function LikeHeart({ eventID }: LikeHeartProps) {
  const { user } = useGlobalContext();
  

  return (
    <Fragment>
      <Feather
        name="heart"
        size={28}
        color="#595959"
        disabled={false}
        onPress={() => {}}
      />
      <Text className="text-gray-500 text-xs font-pregular">{0}</Text>
    </Fragment>
  );
}
