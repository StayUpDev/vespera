import { StatusBar } from "expo-status-bar";
import { Link, Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, FormField, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";
import { useState } from "react";
import { signIn, getCurrentUser } from "../lib/appwrite";

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
    <SafeAreaView className="bg-primary h-full">
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="pt-12 pb-6 px-6 flex justify-between align-center h-full w-full">
          <Text className="text-center text-6xl text-gray-100 font-pextralight">
            ves&#8217;pera
          </Text>

          <View className="flex gap-6 flex-col  mx-auto items-center w-full justify-center">
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
            <Text className="text-start   w-full text-gray-100 ">
              Forgot your password?{" "}
              <Link className="text-[#7F6AF3]" href={"/"}>
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

          <Text className="text-gray-100">
            is this your first time here?{" "}
            <Link className="text-[#7F6AF3]" href={"/"}>
              Come here
            </Link>
          </Text>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
