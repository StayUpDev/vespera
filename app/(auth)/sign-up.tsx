import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { createUser } from "../../lib/clients/user";
import React from "react";

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

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
              isLoading={isSubmitting}
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
