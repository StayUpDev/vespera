import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { EmptyState } from "../../components";
import EventCard from "../../components/EventCard";

import Feather from "@expo/vector-icons/Feather";
import { useQuery } from "@tanstack/react-query";
import { getEventoByUserID, getEvents } from "../../clients/user/event";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const { user } = useGlobalContext();

  console.log("home: ", user)

  const {
    data: events,
    isError,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      return await getEvents();
    },
  });
  // one flatlist
  // with list header
  // and horizontal flatlist
  if (isError) {

    return <Text>There was an error fetching events</Text>;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView className="bg-[#121212] px-2 ">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={events.data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }: { item }) => <EventCard event={item} />}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6 w-full">
            <View className="flex justify-between items-start flex-row mb-6 w-full">
              <View>
                <Text className="font-plight  text-gray-100">home</Text>
              </View>

              <View className="flex gap-6 flex-row">
                <TouchableOpacity onPress={() => {}}>
                  <Feather name="settings" size={20} color="#7F6AF3" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <Feather name="bell" size={20} color="#7F6AF3" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <Feather name="user" size={20} color="#7F6AF3" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Nessun evento trovato"
            subtitle="Nessun evento caricato :("
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
