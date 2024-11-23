import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import useButtonAnimation from "../hooks/useTouchableDynamicShadowing";
import { clsx } from "clsx";

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}
const CustomButton = ({
  title,
  handlePress,
  containerStyles = "",
  textStyles = "",
  isLoading = false,
}: CustomButtonProps) => {
  const { scaleValue, shadowStyle, animateIn, animateOut } =
    useButtonAnimation();
  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={animateIn}
      onPressOut={animateOut}
      activeOpacity={1}
      className={clsx(
        "bg-primary-100 border-[1px] border-secondary-100 rounded-full h-14 w-max flex justify-center items-center",
        containerStyles,
        isLoading && "opacity-50"
      )}
      style={[{ transform: [{ scale: scaleValue }] }, shadowStyle]}
      disabled={isLoading}
    >
      <Text
        className={clsx(
          "text-secondary-100 font-plight text-xl",
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
