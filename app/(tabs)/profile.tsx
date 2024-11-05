import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity } from "react-native";

import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, InfoBox } from "../../components";
import EventCard from "../../components/EventCard";
import { signOut } from "../../lib/clients/user";
import { getUserEvents } from "../../lib/clients/evento";
import useAppwrite from "../../lib/useAppwrite";
import React from "react";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: events } = useAppwrite(() => getUserEvents(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={events}
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
                source={{ uri: user?.avatar }}
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
              <InfoBox
                title={events.length || 0}
                subtitle="Events"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
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
