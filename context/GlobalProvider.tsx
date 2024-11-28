// context.tsx or similar file
import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types/user";
import { useQuery } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jsonwebtoken";
import { JWTClaims } from "../types/api";
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
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const decoded: JWTClaims = jwt_decode.verify(
          token,
          process.env.EXPO_PUBLIC_JWT_SECRET
        );
        console.log("Decoded token: ", decoded);

        const response = await getUserByID(decoded.userID);
        setUser(response);
      }
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
