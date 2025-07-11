"use client";
import plotStyles from "./Plot.module.css";
import selectorStyles from "../seedselector/SeedSelector.module.css";
import { useState, useEffect, useContext } from "react";
import { BalanceContext } from "@/app/contexts/BalanceContext";
import { SeedInventoryContext } from "@/app/contexts/SeedsInventoryContext";
import { SEED_COSTS, SEED_NAMES } from "@/app/data/seeds";

const states = [' ', 'T', 'F', 'B', 'Ç', 'K'];

export default function Plot() {
  const [index, setIndex] = useState(0);
  const [growing, setGrowing] = useState(false);
  const [showSeedMenu, setShowSeedMenu] = useState(false);
  const [plantedSeedId, setPlantedSeedId] = useState<number | null>(null);
  const { balance, setBalance } = useContext(BalanceContext);
  const { inventory, removeSeed } = useContext(SeedInventoryContext);

  useEffect(() => {
    if (!growing) return;

    const currentChar = states[index];
    const delay = currentChar === 'Ç' ? 4000 : 2000;

    const timeoutId = setTimeout(() => {
      if (!(currentChar === 'K')) setIndex((prevIndex) => (prevIndex + 1));
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [index, growing]);

  function handleSeedSelect(seedId: number) {
    if (!inventory[seedId] || inventory[seedId] <= 0) {
      alert("You don't have this seed!");
      setShowSeedMenu(false);
      return;
    }
    if (!removeSeed(seedId)) {
      alert("Failed to plant seed!");
      setShowSeedMenu(false);
      return;
    }
    setPlantedSeedId(seedId);
    setIndex(1);
    setGrowing(true);
    setShowSeedMenu(false);
  }

  function handleClick() {
    if (!growing) {
      // Check if player has any seeds
      const hasSeeds = Object.values(inventory).some(count => count > 0);
      if (!hasSeeds) {
        alert("You have no seeds! Visit the store.");
        return;
      }
      setShowSeedMenu(true);
    } else {
      setGrowing(false);
      setIndex(0);
      const currentChar = states[index];
      if (currentChar === 'Ç' && plantedSeedId !== null) {
        const reward = (SEED_COSTS[plantedSeedId] ?? 10) * 2;
        setBalance(balance + reward);
      }
      setPlantedSeedId(null);
    }
  }

  const currentChar = states[index];

  return (
    <div
      onClick={handleClick}
      className={`${plotStyles.plot} ${currentChar !== ' ' ? plotStyles.planted : ''}`}
      style={{ position: "relative" }}
    >
      {currentChar !== ' ' ? currentChar : ''}
      {showSeedMenu && !growing && (
        <div className={selectorStyles.popup}>
          <ul className={selectorStyles.seedList}>
            {Object.entries(inventory).map(([seedId, count]: [string, number]) =>
              count > 0 ? (
                <li key={seedId} className={selectorStyles.seedItem}>
                  <button
                    className={selectorStyles.seedButton}
                    onClick={e => {
                      e.stopPropagation();
                      handleSeedSelect(Number(seedId));
                    }}
                  >
                    {SEED_NAMES[seedId] ?? `Seed #${seedId}`} ({count})
                  </button>
                </li>
              ) : null
            )}
            <li>
              <button
                className={selectorStyles.cancelButton}
                onClick={e => {
                  e.stopPropagation();
                  setShowSeedMenu(false);
                }}
              >
                Cancel
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
