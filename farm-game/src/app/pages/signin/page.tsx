"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    
    function handleBack(){
      router.push("../")
    }
  return (
    <div>
      <div className={styles.title}>Sign In Page</div>
      
      <>
      <button onClick={handleBack}>Back</button>
      </>
    </div>
  );
}
