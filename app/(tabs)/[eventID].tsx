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
      return await getEventoByUserID(user.id);
    },
  });
  

  if (loadingEvent) {
    // TODO: Loading event data component
    return <Text>Loading event data...</Text>;
  }

  if (loadingEventLikes) {
    // TODO: Loading likes data component
    return <Text>loading event likes...</Text>;
  }

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
