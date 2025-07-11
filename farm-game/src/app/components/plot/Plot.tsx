"use client";
import styles from "./Plot.module.css";
import { useState, useEffect, useContext } from "react";
import { BalanceContext } from "@/app/contexts/BalanceContext";

const states = [' ', 'T', 'F', 'B', 'Ç', 'K'];

export default function Plot() {
  const [index, setIndex] = useState(0);
  const [growing, setGrowing] = useState(false);
  const { balance, setBalance } = useContext(BalanceContext);

  useEffect(() => {
    if (!growing) return;

    const currentChar = states[index];
    const delay = currentChar === 'Ç' ? 4000 : 2000;

    const timeoutId = setTimeout(() => {
        if ( !(currentChar === 'K')) setIndex((prevIndex) => (prevIndex + 1));
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [index, growing]);

  function handleClick() {
    if (!growing) {
        if (balance<10) {
            alert("Insufficient balance!");
        }
        else {
            setIndex(1);
            setGrowing(true);
            setBalance(balance - 10);
        }
    } else {
        setGrowing(false);
        setIndex(0);
        if (currentChar ==='Ç') {
            setBalance(balance + 20);
        }
    }
  }

  const currentChar = states[index];

  return (
    <div
      onClick={handleClick}
      className={`${styles.plot} ${currentChar !== ' ' ? styles.planted : ''}`}
    >
      {currentChar !== ' ' ? currentChar : ''}
    </div>
  );
}
