import { CreateEvento, UserEventoLike } from "../constants/types";

export function getUserEventItem(
  userEventLikes: UserEventoLike[],
  userID: string
) {
  return userEventLikes.find((item) => item.userID === userID);
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
