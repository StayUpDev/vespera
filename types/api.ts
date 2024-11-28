export type APIResponse<T> = {
  message: string;
  data: T;
  error?: string;
};
