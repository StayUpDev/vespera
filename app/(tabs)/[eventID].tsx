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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useAppwrite from "../../lib/useAppwrite";
import { CustomButton } from "../../components";
import { getCurrentUser } from "../../lib/clients/user";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getUserEventLikeItem } from "../../utils/event";

export default function ModalView() {
  const { eventID }: { eventID: string } = useLocalSearchParams();
  const {
    data: event,
    refetch,
    loading,
  } = useAppwrite(() => getEventByID(eventID));

  const { user } = useGlobalContext();

  const {
    data: eventLikes,
    refetch: refetchEventLikes,
    loading: loadingEventLikes,
  } = useAppwrite(() => getEventLikesByEventID(eventID));

  const handleUserLike = async () => {
    if (user && eventLikes) {
      const userEventLikeItem = getUserEventLikeItem(eventLikes, user.$id);

      console.log("user event like item: ", userEventLikeItem);

      if (userEventLikeItem) {
        const result = await deleteEventUserLike(userEventLikeItem.$id);

        if (!!result) await refetchEventLikes();
      } else {
        const data = await createEventUserLike(eventID, user.$id);
        if (!!data) await refetchEventLikes();
      }
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (loadingEventLikes) return <Text>loading event likes...</Text>;

  console.log(event);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView>
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
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  rightAction: {
    width: 100,
    height: 50,
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
  },
  swipeable: {
    height: 50,
    backgroundColor: "papayawhip",
    alignItems: "center",
    justifyContent: "center",
  },
  swipeableText: {
    padding: 20,
    fontSize: 16,
  },
});
