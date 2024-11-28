import { useMutation } from "@tanstack/react-query";
import { CreateUserRequest } from "../types/user";
import { createUser } from "../clients/user/user";
import { queryClient } from "../app/_layout";

export function useCreateUser(user: CreateUserRequest) {
  useMutation({
    mutationFn: async () => {
      return createUser(user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
