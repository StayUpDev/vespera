import React, { useRef, useState} from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [shadowStyle, setShadowStyle] = useState({
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  });

  const animateIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.99,
      useNativeDriver: true,
    }).start();

    setShadowStyle({
      shadowColor: "#333",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    });
  };

  const animateOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();

    setShadowStyle({
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    });
  };

  return (
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={animateIn}
        onPressOut={animateOut}
        activeOpacity={0.7}
        className={`bg-[#7F6AF3] rounded-full h-min w-max flex pt-2 pb-2 pt-3.5 pb-3.5  justify-center items-center ${containerStyles} ${
          isLoading ? "opacity-50" : ""
        }`}
        style={[{ transform: [{ scale: scaleValue }] }, shadowStyle]}
        disabled={isLoading}
      >
        <Text
          className={`text-[#D8DFE9] text-lg font-pextralight text-2xl ${textStyles} ${
            isLoading ? "hidden" : ""
          }`}
        >
          {title}
        </Text>

        {isLoading && (
          <ActivityIndicator
            animating={isLoading}
            color="#D8DFE9"
            size="small"
          />
        )}
      </TouchableOpacity>
  );
};

export default CustomButton;
