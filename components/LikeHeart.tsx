import React, { Fragment } from "react";
import { Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useGlobalContext } from "../context/GlobalProvider";
import AntDesign from "@expo/vector-icons/AntDesign";
import { View } from "react-native-animatable";

interface LikeHeartProps {
  eventID: number;
}

export default function LikeHeart({ eventID }: LikeHeartProps) {
  const { user } = useGlobalContext();
  



  if (Date.now() % 2 === 0) {
    return (
      <Fragment>
        <View className="flex flex-row items-center gap-1">
          <AntDesign
            name="heart"
            disabled={false}
            size={22}
            color="red"
            onPress={() => console.log("liked")}
          />
          <Text className="text-white text-xs font-pregular min-w-[8px]">
            {0}
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
          disabled={false}
          onPress={() => console.log("liked")}
        />
        <Text className="text-white text-xs font-pregular min-w-[8px]">
          {0}
        </Text>
      </View>
    </Fragment>
  );
}
