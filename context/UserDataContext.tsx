"use client";

import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

import { getUserId, setUserId } from "./LocalStorageUtils";

interface UserDataContextType {
  accessToken: string | null;
  changeAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  userId: string | null;
  updateUserId: (newUserId: string) => void;
}

const UserDataContext = createContext<UserDataContextType | null>(null);

interface UserDataProviderProps {
  children: ReactElement;
}

export function UserDataProvider({ children }: UserDataProviderProps) {
  const [accessToken, changeAccessToken] = useState<string | null>(null);
  const [userId, changeUserId] = useState<string | null>(getUserId() || null);

  const updateUserId = (newUserId: string): void => {
    changeUserId(newUserId);
    setUserId(newUserId);
  };

  useEffect(() => {
    // get userId from local storage and update state
    const storedUserId = getUserId();
    if (storedUserId) {
      changeUserId(storedUserId);
    }
  }, []);

  return (
    <UserDataContext.Provider
      value={{ accessToken, changeAccessToken, userId, updateUserId }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export function userData() {
  const context = useContext(UserDataContext);
  if (context === null) {
    throw new Error("userData must be used within a TokenProvider");
  }
  return context;
}
