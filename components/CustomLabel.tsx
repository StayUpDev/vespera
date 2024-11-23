import { View, Text } from "react-native";
import React from "react";

interface CustomLabelProps {
  label: string;
}
export default function CustomLabel({ label }: CustomLabelProps) {
  return (
    <View className=" bg-gray-600 opacity-50 rounded-full w-min h-6 flex justify-center mr-1">
      <Text className="text-white text-xs font-pmedium text-center px-3">
        {/*TODO: max length for label 10 characters*/}
        {label}
      </Text>
    </View>
  );
}
