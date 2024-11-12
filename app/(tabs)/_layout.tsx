import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Text, View } from "react-native";

import { Loader } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import Feather from "@expo/vector-icons/Feather";
import React from "react";

interface TabIconProps {
  Icon: React.ReactNode;
  color: string;
  name: string;
  focused: boolean;
}
const TabIcon = ({ Icon, color, name, focused }: TabIconProps) => {
  return (
    <View className="flex items-center justify-center gap-2">
      {Icon}

      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#7F6AF3",
          tabBarInactiveTintColor: "#292929",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#fdfdfd",
            borderTopWidth: 1,
            borderTopColor: "#fdfdfd",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                Icon={
                  <Feather
                    name="home"
                    size={24}
                    // no... passa il nome della icona e basta.
                    color={`${focused ? "#7F6AF3" : "#292929"}`}
                  />
                }
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                Icon={<Feather name="search" size={24} color="#292929" />}
                color={color}
                name="Bookmark"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                Icon={<Feather name="plus" size={24} color="#292929" />}
                color={color}
                name="Create"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                Icon={<Feather name="user" size={24} color="#292929" />}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>

      <Loader isLoading={loading} />
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabLayout;
