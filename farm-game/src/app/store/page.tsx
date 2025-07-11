"use client";
import React, { useContext, useState } from "react";
import { BalanceContext } from "../contexts/BalanceContext";
import { SeedInventoryContext } from "../contexts/SeedsInventoryContext";
import { SEEDS } from "../data/seeds";
import styles from "../components/store/Store.module.css";
import { useRouter } from "next/navigation";

export default function StorePage() {
  const { balance, setBalance } = useContext(BalanceContext);
  const { inventory, addSeed } = useContext(SeedInventoryContext);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  function buySeed(seed: { id: number; name: string; price: number }) {
    if (balance >= seed.price) {
      setBalance(balance - seed.price);
      addSeed(seed.id);
      setMessage(`You bought a ${seed.name}!`);
    } else {
      setMessage("Not enough balance!");
    }
  }

  function handleBack() {
    router.back();
  }

  return (
    <div className={styles.storePopup}>
      <h2 className={styles.title}>Store</h2>
      <ul className={styles.seedList}>
        {SEEDS.map((seed) => (
          <li key={seed.id} className={styles.seedItem}>
            <span>
              <span className={styles.seedName}>{seed.name}</span>
              <span className={styles.seedPrice}>${seed.price}</span>
              <span className={styles.seedCount}>
                (You own: {inventory[seed.id] ?? 0})
              </span>
            </span>
            <button
              onClick={() => buySeed(seed)}
              className={styles.buyButton}
              disabled={balance < seed.price}
            >
              Buy
            </button>
          </li>
        ))}
      </ul>
      {message && <p className={styles.message}>{message}</p>}
      <button onClick={handleBack} className={styles.closeButton}>
        Back
      </button>
    </div>
  );
}