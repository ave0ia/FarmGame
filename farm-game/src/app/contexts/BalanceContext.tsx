"use client";
import { createContext, useState, ReactNode } from "react";

export type BalanceContextType = {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
};

export const BalanceContext = createContext<BalanceContextType >({
  balance: 500,
  setBalance: () => {},
});

type BalanceProviderProps = {
  children: ReactNode;
};

export const BalanceProvider = ({ children }: BalanceProviderProps) => {
  const [balance, setBalance] = useState(500);

  return (
    <BalanceContext.Provider value={{ balance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};