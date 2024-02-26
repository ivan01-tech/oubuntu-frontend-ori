import { UserTypes } from "@/types/users";
import React, { createContext, useState } from "react";

export interface UserContextType {
  user: UserTypes | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserTypes | null | undefined>>;
}
export const UserContext = createContext<UserContextType | null>(null);

type Props = {
  children: React.ReactNode;
};
export function UserContextProvider({ children }: Props) {
  const [user, setUser] = useState<UserTypes | null>();

  const value: UserContextType = {
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
