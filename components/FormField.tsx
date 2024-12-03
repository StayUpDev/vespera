import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";
import React from "react";

interface FormFieldProps {
  title: string;
  type?: string;
  value?: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  [key: string]: unknown;
}
const FormField = ({
  type,
  value,
  placeholder,
  handleChangeText,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // TODO: Sto componente e' una merda. va modificato ASAP

  return (
    <View className={`w-full`}>
      <View className="relative h-14 border-b-[1px] border-primary-200 w-full mb-4 flex justify-end">
        {!isFocused && !value && (
          <Text className="text-gray-700 font-plight text-base absolute pl-2 pb-3">
            {placeholder}
          </Text>
        )}

        <TextInput
          className="text-gray-300 font-plight text-base pl-2 pb-3"
          value={value}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={type === "password" && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {type === "password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6 absolute right-3 -top-9"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
