import { StatusBar } from "expo-status-bar";
import { Link, Redirect, router } from "expo-router";
import { View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomButton, FormField, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";
import { useState } from "react";
import { getCurrentUser, signIn } from "../lib/clients/user";
import React from "react";

const Welcome = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const { loading, isLogged } = useGlobalContext();
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

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };
  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary-100 h-full">
      <Loader isLoading={loading} />

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
            isLoading={isSubmitting}
            textStyles={undefined}
          />
        </View>

        <Text className="text-gray-500 text-[14px] mt-6">
          is this your first time?{" "}
          <Link className="text-secondary-100" href={"/(auth)/sign-up"}>
            Come here and join us
          </Link>
        </Text>
      </View>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
