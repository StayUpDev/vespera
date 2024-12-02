import { APIResponse } from "./api";

export type User = {
  ID: number;
  username: string;
  email: string;
  avatarURL: string;
  role: string;
};

export type CreateUserRequest = {
  email: string;
  username: string;
  password: string;
};

export type GenerateUserToken = {
  email: string;
  password: string;
};

export type CreateUserResponse = APIResponse<User>;

export type GetUserTokenResponse = APIResponse<User> & {
  token: string;
};
