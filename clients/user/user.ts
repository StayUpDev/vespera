import axios from "axios";
import {
  CreateUserRequest,
  CreateUserResponse,
  GenerateUserToken,
  GetUserTokenResponse,
  User,
} from "../../types/user";

export async function createUser(
  user: CreateUserRequest
): Promise<CreateUserResponse> {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/users/create`,
      user
    );

    return response.data;
  } catch (error) {
    console.error("error registering user: ", error);
    throw new Error("error registering user: ", error);
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
  console.log("Getting user by ID")
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/users?userID=${userID}`
    );

    return response.data;
  } catch (error) {
    console.error("error user: ", error);
    throw new Error("error registering user: ", error);
  }
}
