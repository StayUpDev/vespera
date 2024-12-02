import { useState, useRef, useCallback } from "react";
import { Animated } from "react-native";
import { ACTIVE_SHADOW_HEX, DEFAULT_SHADOW_HEX } from "../constants/styling";

const useButtonAnimation = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const [shadowStyle, setShadowStyle] = useState({
    shadowColor: DEFAULT_SHADOW_HEX,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.7,
    shadowRadius: 14,
  });

  const animateIn = useCallback(() => {
    Animated.spring(scaleValue, {
      toValue: 0.99,
      useNativeDriver: true,
    }).start();

    setShadowStyle({
      shadowColor: ACTIVE_SHADOW_HEX,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 10,
    });
  }, [scaleValue]);

  const animateOut = useCallback(() => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();

    setShadowStyle({
      shadowColor: DEFAULT_SHADOW_HEX,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    });
  }, []);

  return { scaleValue, shadowStyle, animateIn, animateOut };
};

export default useButtonAnimation;
