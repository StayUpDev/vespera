import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getCurrentUser, signIn } from "../../lib/clients/user";
import React from "react";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
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

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-12 w-full"
            isLoading={isSubmitting}
          />
        </View>
        <Text className="text-gray-500 text-[14px] mt-6">
            Dont have an account?{" "}
          <Link className="text-secondary-100" href={"/sign-up"}>
            Signup
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
