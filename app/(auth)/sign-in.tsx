import { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Alert} from "react-native";

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
        <View className="flex flex-col mx-auto items-center w-full justify-center">
          <FormField
            title="Email"
            placeholder="email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            placeholder="password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            type="password"
          />
          <Text className="text-start w-full text-[14px] text-gray-500 mt-2 ml-4">
            Forgot your password?{" "}
            <Link className="text-secondary-100" href={"/"}>
              Just reset it here
            </Link>
          </Text>

          <CustomButton
              title="login"
              handlePress={submit}
              containerStyles="mt-12 w-full"
              isLoading={isPending}
          />
        </View>
        <Text className="text-gray-500 text-[14px] mt-6">
        is this your first time?{" "}
          <Link className="text-secondary-100" href={"/sign-up"}>
            Come here and join us
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
