import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";
import clsx from "clsx";

interface FormFieldProps {
  title: string;
  type?: string;
  value?: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  [key: string]: any;
}
const FormField = ({
  title,
  type,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // TODO: Sto componente e' una merda. va modificato ASAP

  return (
    <View className={`w-full`}>
      <View className="relative h-16 rounded-full w-full bg-[#313131] mb-4">

        {!isFocused && !value && (

          <Text className="absolute h-full p-5 rounded-full opacity-50 bg-transparent text-white font-plight text-base">
            {placeholder}
          </Text>
          
        )}

        <TextInput
          className="px-5 text-white rounded-full h-full font-plight text-base"
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
              className="w-6 h-6 absolute right-5 -top-11"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>

      
    </View>
  );
};

export default FormField;
