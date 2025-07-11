"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Tarla from "../components/tarla/Tarla";
import { BalanceContext } from "../contexts/BalanceContext";
import { useContext, useState } from "react";
import StorePopup from "../components/store/Store";

export default function Home() {
  const router = useRouter();
  const { balance } = useContext(BalanceContext);
  const [storeOpen, setStoreOpen] = useState(false);

  function handleBack() {
    router.push("/");
  }

  return (
    <div className={styles.gameContainer}>
      <header className={styles.header}>
        <div className={styles.title}> Welcome to Farm Game! </div>
        <div className={styles.topBar}>
          <span className={styles.balance}> Balance: {balance} $ </span>
          <button className={styles.storeButton} onClick={() => setStoreOpen(true)}>
           Store
          </button>
          <button className={styles.exitButton} onClick={handleBack}>
            Exit
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <Tarla />
      </main>

      {storeOpen && <StorePopup onClose={() => setStoreOpen(false)} />}
    </div>
  );
}
