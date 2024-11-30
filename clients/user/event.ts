import axios from "axios";
import {
  GenerateUserToken,
  GetUserTokenResponse,
  User,
} from "../../types/user";
import { EventoCreate, GetEventByEventIDResponse, GetEventsByUserIDResponse } from "../../types/event";

export async function getEventoByUserID(userID: number): Promise<GetEventsByUserIDResponse> {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/events/user&userID=${userID}`
    );

    return response.data;
  } catch (error) {
    throw new Error("error fetching user events: ", error);
  }
}
export async function generateUserToken(
  user: GenerateUserToken
): Promise<GetUserTokenResponse> {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/users/validate`,
      user
    );

    return response.data;
  } catch (error) {
    console.error("error registering user: ", error);
    throw new Error("error registering user: ", error);
  }
}

export async function getUserByID(userID: string): Promise<User> {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/users&userID=${userID}`
    );

    return response.data;
  } catch (error) {
    console.error("error user: ", error);
    throw new Error("error registering user: ", error);
  }
}

export async function getEventByID(eventoID: number): Promise<GetEventByEventIDResponse> {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/events&eventID=${eventoID}`
    );

    return response.data;
  } catch (error) {
    throw new Error("error fetching events: ", error);
  }
}

export async function createEvento(evento: EventoCreate): Promise<GetEventByEventIDResponse> {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/events/create`
      , evento);

    return response.data;
  } catch (error) {
    throw new Error("error create evento: ", error);
  }
}
