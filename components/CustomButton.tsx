import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import useButtonAnimation from "../hooks/useTouchableDynamicShadowing";
import { clsx } from "clsx";

interface CustomButtonInterface {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}
const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading = false,
}: CustomButtonInterface) => {
  const { scaleValue, shadowStyle, animateIn, animateOut } =
    useButtonAnimation();
  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={animateIn}
      onPressOut={animateOut}
      activeOpacity={0.7}
      className={clsx(
        "bg-secondary rounded-full h-min w-max flex pt-2 pb-2 pt-3.5 pb-3.5  justify-center items-center",
        containerStyles,
        isLoading && "opacity-50"
      )}
      style={[{ transform: [{ scale: scaleValue }] }, shadowStyle]}
      disabled={isLoading}
    >
      <Text
        className={clsx(
          "text-gray-100 text-lg font-pextralight text-2xl",
          textStyles,
          isLoading && "hidden"
        )}
      >
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator animating={isLoading} color="#D8DFE9" size="small" />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
