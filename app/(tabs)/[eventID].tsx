import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import {
  createEventUserLike,
  deleteEventUserLike,
  getEventByID,
  getEventLikesByEventID,
  searchEvents,
} from "../../lib/clients/evento";
import {
  GestureHandlerRootView,
  RefreshControl,
  ScrollView,
} from "react-native-gesture-handler";
import useAppwrite from "../../lib/useAppwrite";
import { CustomButton } from "../../components";
import { getCurrentUser } from "../../lib/clients/user";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getUserEventLikeItem } from "../../utils/event";
import useEventLikes from "../../hooks/useEventLikes";

export default function ModalView() {
  const { eventID }: { eventID: string } = useLocalSearchParams();
  const {
    data: event,
    refetch,
    loading: loadingEvent,
  } = useAppwrite(() => getEventByID(eventID));

  const { user } = useGlobalContext();
  const { eventLikes, loadingEventLikes, handleUserLike, refetchEventLikes } =
    useEventLikes(eventID, user);

  const handleRefresh = async () => {
    await refetch();
    await refetchEventLikes();
  };

  if (loadingEvent) {
    // TODO: Loading event data component
    return <Text>Loading event data...</Text>;
  }

  if (loadingEventLikes) {
    // TODO: Loading likes data component
    return <Text>loading event likes...</Text>;
  }
  console.log(event);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={loadingEvent}
              onRefresh={handleRefresh}
            />
          }
        >
          <View className="p-2">
            <Text>{event.label}</Text>
            <View>
              <Image
                source={{ uri: event.thumbnail }}
                style={{ width: 200, height: 200 }}
              />
            </View>
            <Text>{event.description}</Text>
            <CustomButton
              title={`likes: ${eventLikes.length}`}
              handlePress={handleUserLike}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
