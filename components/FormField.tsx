import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

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

  // TODO: Sto componente e' una merda. va modificato ASAP

  return (
    <View className={`flex w-full items-center justify-center bg-teal-600 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="w-full rounded-full flex flex-row shadow-lg bg-white">
        <View className="  shadow-lg bg-blue-700">
          <TextInput
            className="text-2xl font-bold text-center text-white mb-6"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7B7B8B"
            onChangeText={handleChangeText} 
            secureTextEntry={type === "password" && !showPassword}
            {...props}
          />

          {type === "password" && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={!showPassword ? icons.eye : icons.eyeHide}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default FormField;
