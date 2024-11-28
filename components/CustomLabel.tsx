import { View, Text } from "react-native";
import React from "react";
import clsx from "clsx";

interface CustomLabelProps {
  label: string;
  category?: string;
}
export default function CustomLabel({ label, category }: CustomLabelProps) {
  return (
    <View
      className={clsx(
        "opacity-60 rounded-full w-min h-6 flex justify-center mr-1 mt-1",
        category === "main"
          ? "bg-secondary-100"
          : category === "tag" && "bg-gray-600"
      )}
    >
      <Text className="text-white text-xs font-pmedium text-center px-3">
        {/*TODO: max length for label 10 characters*/}
        {label}
      </Text>
    </View>
  );
}
