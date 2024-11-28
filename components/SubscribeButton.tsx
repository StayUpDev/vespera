import React from "react";
import { useGlobalContext } from "../context/GlobalProvider";
import { getUserEventItem } from "../utils/event";
import { useOptimisticEventSubscribers } from "../hooks/useEventSubscribers";
import CustomButton from "./CustomButton";

interface LikeHeartProps {
  eventID: string;
}

export default function SubscriberButton({ eventID }: LikeHeartProps) {
  const { user } = useGlobalContext();

  const { eventSubscribers, handleUserSubscriber } =
    useOptimisticEventSubscribers(eventID, user);

  const isNotEventSubscribed = getUserEventItem(eventSubscribers, user?.$id)
    ? true
    : false;

  const totalSubscribers = eventSubscribers ? eventSubscribers.length : 0;

  return (
    <CustomButton
      title={isNotEventSubscribed ? "opt out" : "participate"}
      containerStyles={"h-[36px] w-24 border-[1px]"}
      handlePress={() => handleUserSubscriber()}
      isLoading={false}
      textStyles={"text-xs"}
    />
  );
}
