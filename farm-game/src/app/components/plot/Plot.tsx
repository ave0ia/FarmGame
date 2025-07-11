import styles from "./Plot.module.css";
import { useState } from "react";

const states = [' ', 'T', 'F', 'B', 'Ç', 'K'];

export default function Plot() {
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIndex((prevIndex) => (prevIndex + 1) % states.length);
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
