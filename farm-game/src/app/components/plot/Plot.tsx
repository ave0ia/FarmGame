import styles from "./Plot.module.css"
import { useState } from "react";

export default function Plot(){
  const [planted, setPlanted] = useState(false);

  function handleClick() {
    setPlanted(!planted);
  }

  return (
    <div
      onClick={handleClick}
      className={`${styles.plot} ${planted ? styles.planted : ''}`}
    >
      {planted ? 'T' : ''}
    </div>
  );
}