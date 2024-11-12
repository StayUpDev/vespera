import { useState, useCallback, useEffect } from "react";
import useAppwrite from "../lib/useAppwrite";
import {
  createEventUserSubscriber,
  deleteEventUserSubscriber,
  getEventSubscribersByEventID,
} from "../lib/clients/evento";
import { getUserEventItem } from "../utils/event";
import { EventoSubscriber, User } from "../constants/types";

// TODO: Fix types
export const useOptimisticEventSubscribers = (eventID: string, user: User) => {
  const {
    data: initialEventSubscribers,
    refetch: refetchEventSubscribers,
    loading: loadingEventSubscribers,
  } = useAppwrite(() => getEventSubscribersByEventID(eventID));

  const [eventSubscribers, setEventSubscribers] = useState<EventoSubscriber[]>(
    initialEventSubscribers ?? []
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const userEventSubscriberItem = getUserEventItem(eventSubscribers, user?.$id);

  useEffect(() => {
    if (initialEventSubscribers) {
      setEventSubscribers(initialEventSubscribers);
    }
  }, [initialEventSubscribers]);

  const handleUserSubscriber = useCallback(async () => {
    if (user && !isUpdating) {
      setIsUpdating(true);

      const newSubscribers = userEventSubscriberItem
        ? eventSubscribers.filter(
            (like) => like.$id !== userEventSubscriberItem.$id
          )
        : [
            ...eventSubscribers,
            { $id: user.$id, userID: user.$id, eventoID: eventID },
          ];

      setEventSubscribers(newSubscribers);

      try {
        if (userEventSubscriberItem) {
          await deleteEventUserSubscriber(userEventSubscriberItem.$id);
        } else {
          await createEventUserSubscriber(eventID, user.$id);
        }
        await refetchEventSubscribers();
      } catch (error) {
        console.error("Failed to update like status:", error);
        setEventSubscribers(initialEventSubscribers);
      } finally {
        setIsUpdating(false);
      }
    }
  }, [
    eventSubscribers,
    eventID,
    user,
    refetchEventSubscribers,
    isUpdating,
    initialEventSubscribers,
  ]);

  return {
    eventSubscribers,
    loadingEventSubscribers,
    handleUserSubscriber,
    isUpdating,
    refetchEventSubscribers,
  };
};
