import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "../../lib/useAppwrite";
import { searchEvents } from "../../lib/appwrite";
import { EmptyState, SearchInput, VideoCard } from "../../components";
import EventCard from "../../components/EventCard";
import { Evento } from "../../constants/types";

const Search = () => {
  const { query }: { query: string } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchEvents(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
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
          <>
            <View className="flex my-6 px-4">
              <Text className="font-pmedium text-gray-100 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white mt-1">
                {query}
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput initialQuery={query} refetch={refetch} />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
