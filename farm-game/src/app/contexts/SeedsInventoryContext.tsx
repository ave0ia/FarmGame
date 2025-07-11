"use client";
import React, { createContext, useState, ReactNode, useEffect } from "react";

type Inventory = { [seedId: number]: number };

type SeedInventoryContextType = {
  inventory: Inventory;
  addSeed: (seedId: number) => void;
  removeSeed: (seedId: number) => boolean;
};

export const SeedInventoryContext = createContext<SeedInventoryContextType>({
  inventory: {},
  addSeed: () => {},
  removeSeed: () => false,
});

export function SeedInventoryProvider({ children }: { children: ReactNode }) {
  // Initialize inventory from localStorage or empty object
  const [inventory, setInventory] = useState<Inventory>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("inventory");
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  // Save inventory to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("inventory", JSON.stringify(inventory));
    }
  }, [inventory]);

  function addSeed(seedId: number) {
    setInventory((prev) => ({
      ...prev,
      [seedId]: (prev[seedId] ?? 0) + 1,
    }));
  }

  function removeSeed(seedId: number) {
    if ((inventory[seedId] ?? 0) > 0) {
      setInventory((prev) => ({
        ...prev,
        [seedId]: prev[seedId]! - 1,
      }));
      return true;
    }
    return false;
  }

  return (
    <SeedInventoryContext.Provider value={{ inventory, addSeed, removeSeed }}>
      {children}
    </SeedInventoryContext.Provider>
  );
}
