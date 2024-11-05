import { useState, useCallback, useEffect } from "react";
import useAppwrite from "../lib/useAppwrite";
import {
  createEventUserLike,
  deleteEventUserLike,
  getEventLikesByEventID,
} from "../lib/clients/evento";
import { getUserEventLikeItem } from "../utils/event";
import { EventoLike, User } from "../constants/types";

// TODO: Fix types
export const useOptimisticEventLikes = (eventID: string, user: User) => {
  const {
    data: initialEventLikes,
    refetch: refetchEventLikes,
    loading: loadingEventLikes,
  } = useAppwrite(() => getEventLikesByEventID(eventID));

  const [eventLikes, setEventLikes] = useState<EventoLike[]>(
    initialEventLikes ?? []
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const userEventLikeItem = getUserEventLikeItem(eventLikes, user.$id);

  useEffect(() => {
    if (initialEventLikes) {
      setEventLikes(initialEventLikes);
    }
  }, [initialEventLikes]);

  const handleUserLike = useCallback(async () => {
    if (user && !isUpdating) {
      setIsUpdating(true);

      const newLikes = userEventLikeItem
        ? eventLikes.filter((like) => like.$id !== userEventLikeItem.$id)
        : [
            ...eventLikes,
            { $id: user.$id, userID: user.$id, eventoID: eventID },
          ];

      setEventLikes(newLikes);

      try {
        if (userEventLikeItem) {
          await deleteEventUserLike(userEventLikeItem.$id);
        } else {
          await createEventUserLike(eventID, user.$id);
        }
        await refetchEventLikes();
      } catch (error) {
        console.error("Failed to update like status:", error);
        setEventLikes(initialEventLikes);
      } finally {
        setIsUpdating(false);
      }
    }
  }, [
    eventLikes,
    eventID,
    user,
    refetchEventLikes,
    isUpdating,
    initialEventLikes,
  ]);

  return {
    eventLikes,
    loadingEventLikes,
    handleUserLike,
    isUpdating,
    refetchEventLikes,
  };
};
