import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
// context.tsx or similar file
import { User } from "../types/user";
import {
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
      if (userID && user === null) {
        console.log("getting user by id within global provider")
        const response = await getUserByID(userID);
        setIsLogged(true)
        setUser(response);
        return response
      }
      return null
    },
    queryKey: ["userID"],
  });


    return (
    <GlobalContext.Provider
      value={{ isLogged, setIsLogged, user, setUser, loading: isLoading }}
    >

      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
