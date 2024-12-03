import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { clsx } from "clsx";
import Animated, {
  ReduceMotion,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { AnimatedTouchable } from "./AnimatedTouchableOpacity";

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

const defaultAnimationConfig = {
  duration: 100,
  dampingRatio: 0.5,
  stiffness: 10000,
  overshootClamping: false,
  restDisplacementThreshold: 5.29,
  restSpeedThreshold: 10.48,
  reduceMotion: ReduceMotion.System,
};

const CustomButton = ({
  title,
  handlePress,
  containerStyles = "",
  textStyles = "",
  isLoading = false,
}: CustomButtonProps) => {
  const bg = useSharedValue("transparent");
  const scaleValue = useSharedValue(1);

  const handlePressIn = () => {
    bg.value = withSpring("#ffffff05", defaultAnimationConfig);
    scaleValue.value = withSpring(0.99, defaultAnimationConfig);
  };

  const handlePressOut = () => {
    bg.value = withSpring("transparent", defaultAnimationConfig);
    scaleValue.value = withSpring(1, defaultAnimationConfig);
  };

  return (
    <AnimatedTouchable
      style={{
        backgroundColor: bg,
        transform: [{ scale: scaleValue }],
      }}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      className={clsx(
        "border-[1px] border-secondary-100 rounded-full h-14 w-max flex justify-center items-center",
        containerStyles,
        isLoading && "opacity-50"
      )}
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
    </AnimatedTouchable>
  );
};

export default CustomButton;
