import { StatusBar } from "expo-status-bar";
import { View, Text, Alert } from "react-native";
import { Link, Redirect, useRouter} from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomButton, FormField, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";
import { useEffect, useState } from "react";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateUserToken } from "../clients/user/user";

const Welcome = () => {

  const router = useRouter()

  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const {user} = useGlobalContext()

  const { mutate, isError, isPending } = useMutation({
    mutationFn: async () => {
      console.log("mutating your mother")
      const response = await generateUserToken(form);
      console.log("response withing mutation: ", response)
      const token = response.token;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user_id", JSON.stringify(response.data.ID));

      console.log("set token to: ", token)
      console.log("set userID to: ", response.data.ID)
      console.log("setting user to:", response.data)


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
    
   if(user) {
      return router.replace("/(tabs)/home")
    }
  }, [user]);

  useEffect(() => {
      const check = async () => {

      const token = await AsyncStorage.getItem("token") 
      const userID = await AsyncStorage.getItem("user_id") 

      if(token && userID) {
        router.replace("/(tabs)/home")
      }


    }
    check()
  }, [])

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
      <Loader isLoading={isPending} />

      <View className="pt-28 pb-6 px-6 flex justify-between align-center h-full w-full">
        <View className="flex flex-col gap-3">
          <Text className="text-center text-7xl text-[#fdfdff] font-plight opacity-80">
            ves&#8217;pera
          </Text>

          <Text className="text-center text-xl text-[#fdfdff] font-pextralight opacity-60">
            don&#8217;t waste another night.
          </Text>
        </View>

        <View className="flex flex-col mx-auto items-center w-full justify-center">
          <FormField
            type={null}
            title={null}
            placeholder={"username"}
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            type={"password"}
            title={null}
            placeholder={"password"}
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={null}
            keyboardType="email-address"
          />
          <Text className="text-start w-full text-gray-100 ">
            Forgot your password?{" "}
            <Link className="text-[#7F6AF3]" href={"/"}>
              Just reset it here
            </Link>
          </Text>
          <CustomButton
            title="login"
            handlePress={submit}
            containerStyles="mt-12 w-full"
            isLoading={isPending}
            textStyles={undefined}
          />
        </View>

        <Text className="text-gray-100 mt-6">
          is this your first time?{" "}
          <Link className="text-[#7F6AF3]" href={"/(auth)/sign-up"}>
            Come here and join us
          </Link>
        </Text>
      </View>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
