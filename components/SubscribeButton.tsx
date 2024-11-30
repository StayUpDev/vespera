import React from "react";
import { useGlobalContext } from "../context/GlobalProvider";
import { useOptimisticEventSubscribers } from "../hooks/useEventSubscribers";
import CustomButton from "./CustomButton";

interface LikeHeartProps {
  eventID: number;
}

export default function SubscriberButton({ eventID }: LikeHeartProps) {
  const { user } = useGlobalContext();


  return (
    <CustomButton
      title={"participate"}
      containerStyles={"py-2"}
      handlePress={() => {}}
      isLoading={false}
      textStyles={"text-lg"}
    />
  );
}
