import React from "react";
import { useGlobalContext } from "../context/GlobalProvider";
import CustomButton from "./CustomButton";

interface LikeHeartProps {
  eventID: number;
}

export default function SubscriberButton({ eventID }: LikeHeartProps) {
  const { user } = useGlobalContext();


  return (
    <CustomButton
      title={"participate"}
      containerStyles={"h-[36px] w-24 border-[1px]"}
      handlePress={() => () => console.log("liked")}
      isLoading={false}
      textStyles={"text-xs"}
    />
  );
}
