import { EventoCreate } from "../types/event";

export function getEmptyEventState(userID: number): EventoCreate {
  return {
    dressCode: "",
    description: "",
    category: "",
    costo: null,
    dateFrom: new Date(),
    dateTo: new Date(),
    label: "",
    parcheggio: false,
    tags: [],
    thumbnail: null,
    userID: userID,
  };
}
