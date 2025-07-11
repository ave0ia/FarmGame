"use client";
import React, { useContext, useState } from "react";
import { BalanceContext } from "../../contexts/BalanceContext";
import { SeedInventoryContext } from "../../contexts/SeedsInventoryContext";
import { SEEDS } from "../../data/seeds";
import styles from "./Store.module.css";
import { useRouter } from "next/navigation";

type StorePopupProps = {
  onClose: () => void;
};

export default function StorePopup({ onClose }: StorePopupProps) {
  const { balance, setBalance } = useContext(BalanceContext);
  const { inventory, addSeed } = useContext(SeedInventoryContext);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  function handleStore() {
    router.push("/store");
  }

  function buySeed(seed: { id: number; name: string; price: number }) {
    if (balance >= seed.price) {
      setBalance(balance - seed.price);
      addSeed(seed.id);
      setMessage(`You bought a ${seed.name}!`);
    } else {
      setMessage("Not enough balance!");
    }
  }

  return (
    <>
      <div className={styles.storeOverlay} onClick={onClose} />
      <div className={styles.storePopup} role="dialog" aria-modal="true">
        <h2 className={styles.title}>Store</h2>
        <ul className={styles.seedList}>
          {SEEDS.map((seed) => (
            <li key={seed.id} className={styles.seedItem}>
              <span>
                <span className={styles.seedName}>{seed.name}</span>{" "}
                <span className={styles.seedPrice}>${seed.price}</span>{" "}
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
        <button onClick={handleStore} className={styles.buyButton}>
          Store Page
        </button>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </>
  );
}
