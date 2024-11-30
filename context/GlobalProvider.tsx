// context.tsx or similar file
import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types/user";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserByID } from "../clients/user/user";

interface GlobalContextType {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const queryClient = new QueryClient();

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const { isLoading } = useQuery({
    queryFn: async () => {
      const userID = await AsyncStorage.getItem("user_id");
      if (userID) {
        const response = await getUserByID(userID);
        setUser(response);
      }
    },
    queryKey: ["userID"],
  });

  console.log("queryClient", queryClient);

  return (
    <GlobalContext.Provider
      value={{ isLogged, setIsLogged, user, setUser, loading: isLoading }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
