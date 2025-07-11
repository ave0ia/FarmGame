import styles from "./Plot.module.css";
import { useState, useEffect } from "react";

const states = [' ', 'T', 'F', 'B', 'Ç', 'K'];

export default function Plot() {
  const [index, setIndex] = useState(0);
  const [growing, setGrowing] = useState(false);

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
      setIndex(1);
      setGrowing(true);
    } else {
      setGrowing(false);
      setIndex(0);
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
