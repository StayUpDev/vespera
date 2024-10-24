export type AppwriteResponse<T> = {
  documents: T[];
  total: number;
  limit: number;
  offset: number;
};
export type Evento = {
  $id: string;
  label: string;
  dateFrom: Date;
  dateTo: Date;
  category: string;
  costo: number;
  userID: string;
  parcheggio: boolean;
  dressCode?: string;
  tags: string[];
  thumbnail: string;
};

export type User = {
  $id: string;
  email: string;
  password: string;
  username: string;
  accountID: string;
  role: string;
  avatar: string;
};

export type EventoImmagine = {
  eventoID: string;
  url: string;
};

export type UserEventoCommento = {
  eventoID: string;
  userID: string;
};

export type UserEventoLike = {
  eventoID: string;
  userID: string;
};

export type UserEventoSubscriber = {
  eventoID: string;
  userID: string;
};
