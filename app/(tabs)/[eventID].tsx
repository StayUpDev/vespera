import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { getEventByID, searchEvents } from "../../lib/clients/evento";
import {
  Gesture,
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import RightAction from "../../gestures/rightAction";
import useAppwrite from "../../lib/useAppwrite";

export default function ModalView() {
  const { eventID }: { eventID: string } = useLocalSearchParams();
  const {
    data: event,
    refetch,
    loading,
  } = useAppwrite(() => getEventByID(eventID));

  if (loading) {
    return <Text>Loading...</Text>;
  }

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
          <Text></Text>
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
