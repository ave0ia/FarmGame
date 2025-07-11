"use client";
import { createContext, useState, ReactNode, useEffect } from "react";

export type BalanceContextType = {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
};

export const BalanceContext = createContext<BalanceContextType>({
  balance: 500,
  setBalance: () => {},
});

type BalanceProviderProps = {
  children: ReactNode;
};

export const BalanceProvider = ({ children }: BalanceProviderProps) => {
  // Initialize balance state from localStorage if available, else 500
  const [balance, setBalance] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("balance");
      return saved ? JSON.parse(saved) : 500;
    }
    return 500; // fallback for SSR or no window
  });

  // Whenever balance changes, save it to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("balance", JSON.stringify(balance));
    }
  }, [balance]);

  return (
    <BalanceContext.Provider value={{ balance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};
