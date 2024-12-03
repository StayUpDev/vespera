import { View, Image } from "react-native";
import React from "react";
import clsx from "clsx";

interface UserBadgeProps {
  avatarURL: string;
  size: "sm" | "md" | "lg";
  containerStyles?: string;
}

export default function UserBadge({
  avatarURL,
  size,
  containerStyles,
}: UserBadgeProps) {
  return (
    <View
      style={{
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      }}
      className={clsx(
        "border border-secondary w-min rounded-full ",
        containerStyles
      )}
    >
      <Image
        source={{ uri: avatarURL }}
        className={clsx(
          "rounded-full",
          size === "lg"
            ? "w-[34px] h-[34px]"
            : size === "md"
              ? "w-[24px] h-[24px]"
              : "w-[20px] h-[20px]"
        )}
        resizeMode="cover"
      />
    </View>
  );
}
