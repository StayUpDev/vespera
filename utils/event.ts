import { UserEventoLike } from "../constants/types";

export function getUserEventLikeItem(
  userEventLikes: UserEventoLike[],
  userID: string
) {
  return userEventLikes.find((like) => like.userID === userID);
}
