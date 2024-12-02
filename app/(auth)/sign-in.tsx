import { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateUserToken } from "../../clients/user/user";
import { useMutation } from "@tanstack/react-query";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { user } = useGlobalContext()



  const { mutate, isError, isPending } = useMutation({
    mutationFn: async () => {
      console.log("mutating your mother")
      const response = await generateUserToken(form);
      console.log("response withing mutation: ", response)
      const token = response.token;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user_id", JSON.stringify(response.data.ID));

      console.log("set token to: ", token)
      console.log("setting user to:", response.data)
      console.log("set userID to: ", response.data.ID)


      setIsLogged(true);
      setUser(response.data);
    },

    onError: (error) => {
      console.log(error)
      setIsLogged(false);
      setUser(null);
    },
  });

  useEffect(() => {

    if (user) {
      return router.replace("/(tabs)/home")
    }
  }, [user]);

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
    console.log("submitting")
    mutate();
  };

  

  if (isError) {
    <Text>There was an error logging you in boss</Text>;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to Vespera
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isPending}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Dont have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
