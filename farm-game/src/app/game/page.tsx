"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Tarla from "../components/tarla/Tarla";
import { BalanceContext } from "../contexts/BalanceContext";
import { useContext, useState } from "react";
import StorePopup from "../components/store/Store"; // Adjust the path if needed

export default function Home() {
  const router = useRouter();
  const { balance } = useContext(BalanceContext);
  const [storeOpen, setStoreOpen] = useState(false);

  function handleBack() {
    router.push("/");
  }

  return (
    <div>
      <div className={styles.title}>Welcome to Farm Game!</div>
      <button> Balance: {balance} </button>
      <button onClick={() => setStoreOpen(true)}>Store</button>

      <Tarla />
      {storeOpen && <StorePopup onClose={() => setStoreOpen(false)} />}

      <button onClick={handleBack}>Exit</button>
    </div>
  );
}
