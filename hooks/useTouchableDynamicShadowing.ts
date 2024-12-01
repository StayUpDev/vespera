import { useState, useCallback } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import { ACTIVE_SHADOW_HEX, DEFAULT_SHADOW_HEX } from "../constants/styling";

const useButtonAnimation = () => {
  const scaleValue = useSharedValue(1);
  const [shadowStyle, setShadowStyle] = useState({
    shadowColor: DEFAULT_SHADOW_HEX,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  });

  const [backgroundColor, setBackgroundColor] = useState({
    backgroundColor: "transparent",
  });

  const animateIn = useCallback(() => {
    scaleValue.value = withSpring(0.99);

    setBackgroundColor({
      backgroundColor: "#ffffff50",
    });

    setShadowStyle({
      shadowColor: ACTIVE_SHADOW_HEX,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 2,
    });
  }, [scaleValue]);

  const animateOut = useCallback(() => {
    scaleValue.value = withSpring(1);

    setBackgroundColor({
      backgroundColor: "transparent",
    });

    setShadowStyle({
      shadowColor: DEFAULT_SHADOW_HEX,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
    });
  }, []);

  const animatedScaleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value }],
    };
  });

  return {
    animatedScaleStyle,
    shadowStyle,
    animateIn,
    animateOut,
    backgroundColor,
  };
};

export default useButtonAnimation;
