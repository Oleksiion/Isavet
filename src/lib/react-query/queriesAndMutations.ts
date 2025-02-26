import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { createNewUserAccount, signInAccount } from "../appwrite/api";
import { INewUser } from "@/types";

// create user
export const useCreateUserAccountMutation = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createNewUserAccount(user),
  });
};

// signin account
export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};
