import { APIResponse } from "./api";

export type Event = {
  id: number;

  label: string;
  description: string;
  dateFrom: Date;
  dateTo: Date;
  category: string;
  costo: number;
  userID: string;
  parcheggio: boolean;
  dressCode: string;
  tags: string[];
  thumbnail: string;

  createdAt: string;
  updatedAt: string;
};

export type EventoLike = {
  eventoID: number;
  userID: string;
};

export type EventoComment = {
  eventoID: number;
  userID: string;
  content: string;
};

export type EventWithLikesAndComments = Event & EventoLike & EventoComment;

export type GetEventoByUserIDRequest = {
  userID: string
}
export type GetEventsByUserIDResponse = APIResponse<Event[]>

export type GetEventoByEventoIDRequest = {
  userID: string
}

export type GetEventByEventIDResponse = APIResponse<Event>


export type EventoCreate = {

  label: string;
  description: string;
  dateFrom: Date;
  dateTo: Date;
  category: string;
  costo: number;
  userID: number;
  parcheggio: boolean;
  dressCode: string;
  tags: string[];
  thumbnail: File;

}

export type GetEventsResponse = APIResponse<Event[]>
