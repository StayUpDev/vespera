import React, { useState } from "react";
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
import { getAllEvents } from "../../lib/clients/evento";
import useAppwrite from "../../lib/useAppwrite";

const Home = () => {
  const { data: events, refetch } = useAppwrite(getAllEvents);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // one flatlist
  // with list header
  // and horizontal flatlist

  return (
    <SafeAreaView className="bg-[#121212] px-2 ">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={events}
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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
