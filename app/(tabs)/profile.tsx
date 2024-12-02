import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity } from "react-native";

import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, InfoBox } from "../../components";
import EventCard from "../../components/EventCard";

import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { getEventoByUserID } from "../../clients/user/event";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();


  const {data} = useQuery({
    queryKey: ["user_events"],
    queryFn: async () => {
      return getEventoByUserID(user.id)
    }
   })
 
  const logout = async () => {
    const token = await AsyncStorage.getItem("token")
    if (token) {
      await AsyncStorage.removeItem("token")
      await AsyncStorage.removeItem("user_id")
      setUser(null);
      setIsLogged(false);


    }
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={data.data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }: { item }) => <EventCard event={item} />}
        ListEmptyComponent={() => (
          <EmptyState title="Nessun evento" subtitle="Nessun evento trovato" />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: user?.avatarURL}}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              subtitle={null}
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              {data.data && (
                <InfoBox
                  title={data.data.length || 0}
                  subtitle="Events"
                  titleStyles="text-xl"
                  containerStyles="mr-10"
                />
              )}
              <InfoBox
                containerStyles={null}
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
