import { useState, useCallback } from "react";
import useAppwrite from "../lib/useAppwrite";
import {
  createEventUserLike,
  deleteEventUserLike,
  getEventLikesByEventID,
} from "../lib/clients/evento";
import { getUserEventLikeItem } from "../utils/event";

const useEventLikes = (eventID, user) => {
  const {
    data: eventLikes,
    refetch: refetchEventLikes,
    loading: loadingEventLikes,
  } = useAppwrite(() => getEventLikesByEventID(eventID));

  const handleUserLike = useCallback(async () => {
    if (user && eventLikes) {
      const userEventLikeItem = getUserEventLikeItem(eventLikes, user.$id);

      if (userEventLikeItem) {
        const result = await deleteEventUserLike(userEventLikeItem.$id);
        if (result) await refetchEventLikes();
      } else {
        const data = await createEventUserLike(eventID, user.$id);
        if (data) await refetchEventLikes();
      }
    }
  }, [eventLikes, eventID, user, refetchEventLikes]);

  return {
    eventLikes,
    loadingEventLikes,
    handleUserLike,
    refetchEventLikes,
  };
};

export default useEventLikes;
