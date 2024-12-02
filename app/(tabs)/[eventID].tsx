import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import {
  GestureHandlerRootView,
  RefreshControl,
  ScrollView,
} from "react-native-gesture-handler";
import { CustomButton } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useQuery } from "@tanstack/react-query";
import { getEventByID, getEventoByUserID } from "../../clients/user/event";

export default function ModalView() {
  const { eventID }: { eventID: string } = useLocalSearchParams();

  const { user } = useGlobalContext();

  const {
    data: events,
    isError,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["user_events"],
    queryFn: async () => {
      return await getEventByID(eventID);
    },
  });
  

  if (isLoading) {
    // TODO: Loading event data component
    return <Text>Loading event data...</Text>;
  }

  
  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
            />
          }
        >
          <View className="p-2">
            <Text>{events.data.label}</Text>
            <View>
              <Image
                source={{ uri: events.data.thumbnail}}
                style={{ width: 200, height: 200 }}
              />
            </View>
            <Text>{events.data.description}</Text>
            <CustomButton
              handlePress={() => {}}
              title={`likes: ${0}`}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
