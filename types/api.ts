export type APIResponse<T> = {
  message: string;
  data: T;
  error?: string;
};

export type JWTClaims = {
  expiresAt: number;
  issuer: string;
  userID: string;
};
