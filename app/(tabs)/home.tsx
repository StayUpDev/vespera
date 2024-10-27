import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useGlobalContext } from "../../context/GlobalProvider";
import { icons, images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { EmptyState, SearchInput, VideoCard } from "../../components";
import EventCard from "../../components/EventCard";
import { Evento } from "../../constants/types";

import Feather from "@expo/vector-icons/Feather";
import { getAllEvents, getLatestEvents } from "../../lib/clients/evento";

const Home = () => {
  const { data: events, refetch } = useAppwrite(getAllEvents);
  const { data: latestEvents } = useAppwrite(getLatestEvents);
  const { user } = useGlobalContext();

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
    <SafeAreaView className="bg-primary px-6 ">
      <FlatList
        data={events}
        keyExtractor={(item: Evento) => item.$id}
        renderItem={({ item }: { item: Evento }) => (
          <EventCard
            category={item.category}
            label={item.label}
            thumbnail={item.thumbnail}
            userID={item.userID}
          />
        )}
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
