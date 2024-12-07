import { StatusBar } from "expo-status-bar";
import { View, Text, Alert, Image } from "react-native";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomButton, FormField, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";
import { useEffect, useState } from "react";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateUserToken } from "../clients/user/user";

const Welcome = () => {
  const router = useRouter();

  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { user } = useGlobalContext();

  const { mutate, isError, isPending } = useMutation({
    mutationFn: async () => {
      console.log("mutating your mother");
      const response = await generateUserToken(form);
      console.log("response withing mutation: ", response);
      const token = response.token;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user_id", JSON.stringify(response.data.ID));

      console.log("set token to: ", token);
      console.log("set userID to: ", response.data.ID);
      console.log("setting user to:", response.data);

      setIsLogged(true);
      setUser(response.data);
    },

    onError: (error) => {
      console.log(error);
      setIsLogged(false);
      setUser(null);
    },
  });

  useEffect(() => {
    if (user) {
      return router.replace("/(tabs)/home");
    }
  }, [user]);

  useEffect(() => {
    const check = async () => {
      const isFirstTime = await AsyncStorage.getItem("first_time");
      if (isFirstTime && isFirstTime === "false") {
        const token = await AsyncStorage.getItem("token");
        const userID = await AsyncStorage.getItem("user_id");

        if (token && userID) {
          router.replace("/(tabs)/home");
        }
      } else {
        await AsyncStorage.setItem("first_time", "true");
      }
    };
    check();
  }, []);

  if (isError) {
    <Text>There was an error logging you in boss</Text>;
  }

  return (
    <SafeAreaView className="bg-primary-100 h-full">
      <View className="pt-28 pb-6 px-6 flex justify-between align-center h-full w-full">
        <View className="flex flex-col gap-3">
          <Text className="text-center text-7xl text-gray-400 font-plight">
            ves<Text className="text-secondary-100">&#8217;</Text>pera
          </Text>

          <Text className="text-center text-xl text-gray-400 font-plight">
            don&#8217;t waste another night.
          </Text>
        </View>

        <View className="flex flex-col bg-red-700 flex-grow my-4">
          <View className="flex flex-row items-center bg-amber-400 flex-grow relative">
            <View className="bg-zinc-50 h-[125px] w-[200px] absolute -left-20 "></View>
            <View className="bg-zinc-50 h-[125px] w-[200px] absolute -right-2 "></View>
          </View>
          <View className="flex flex-row items-center bg-green-800 flex-grow relative">
            <View className="bg-zinc-50 h-[125px] w-[200px] absolute -left-2"></View>
            <View className="bg-zinc-50 h-[125px] w-[200px] absolute -right-20"></View>
          </View>
        </View>
        {/* <View className="flex flex-row">
          <View className="w-full relative bg-white">
            <Image
              source={{
                uri: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?cs=srgb&dl=pexels-wolfgang-1002140-2747449.jpg&fm=jpg",
              }}
              className="absolute rounded-md"
              resizeMode="cover"
              width={200}
              height={125}
            />
          </View>

          <View className="w-full relative bg-white">
            <Image
              source={{
                uri: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?cs=srgb&dl=pexels-wolfgang-1002140-2747449.jpg&fm=jpg",
              }}
              className="absolute rounded-md"
              resizeMode="cover"
              width={200}
              height={125}
            />
          </View>
        </View> */}
        <Text className="text-center mt-2 text-xs text-gray-400 font-plight">
          Sign up now to discover what's happening nearby and never waste
          another night of fun!
        </Text>
        <View className="flex flex-col mx-auto items-center w-full justify-center ">
          <CustomButton
            containerStyles="mt-4 w-full"
            isLoading={isPending}
            title="sign up"
            handlePress={async () => {
              await AsyncStorage.setItem("first_time", "false");
              router.push("/(auth)/sign-in");
            }}
          ></CustomButton>
        </View>
        <Text className="text-gray-500 text-[14px] mt-6">
          is this your first time?{" "}
          <Link className="text-secondary-100" href={"/sign-up"}>
            Come here and join us
          </Link>
        </Text>
      </View>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
