import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Text, View} from "react-native";

import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { createUser, generateUserToken } from "../../clients/user/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { queryClient } from "../_layout";

const SignUp = () => {
  const router = useRouter();

  const { setUser, setIsLogged } = useGlobalContext();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async () => {
      const response = await createUser(form);

      const user = response.data;

      const tokenResponse = await generateUserToken({
        email: form.email,
        password: form.password,
      });

      await AsyncStorage.setItem("token", tokenResponse.token);

      setIsLogged(true);
      setUser(user);

      router.replace("(tabs)/home");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },

    onError: () => {
      setIsLogged(false);
      setUser(null);
    },
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    mutate();
  };

  if (isError) {
    <Text>There was an error signing you up boss</Text>;
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
              title="username"
              placeholder="username"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              otherStyles="mt-7"
            />
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
            />
            <CustomButton
              title="sign up"
              handlePress={submit}
              containerStyles="mt-12 w-full"
              isLoading={isPending}
            />
        </View>
        <Text className="text-gray-500 text-[14px] mt-6">
            Have an account already?{" "}
          <Link className="text-secondary-100" href={"/sign-in"}>
            Login
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
