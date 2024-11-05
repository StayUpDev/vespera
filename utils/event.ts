import { CreateEvento, UserEventoLike } from "../constants/types";

export function getUserEventLikeItem(
  userEventLikes: UserEventoLike[],
  userID: string
) {
  return userEventLikes.find((like) => like.userID === userID);
}

export function getEmptyEventState(): CreateEvento {
  return {
    description: "",
    category: "",
    costo: null,
    dateFrom: new Date(),
    dateTo: new Date(),
    label: "",
    parcheggio: false,
    tags: [],
    thumbnail: null,
    userID: "",
  };
}
