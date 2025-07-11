"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Tarla from "../components/tarla/Tarla";

export default function Home() {
    const router = useRouter();

    function handleBack(){
      router.push("/")
    }
  return (
    <div>
      <div className={styles.title}>Welcome to Farm Game!</div>
      <Tarla></Tarla>
      <> 
      <button onClick={handleBack}>Return</button>
      </>
    </div>
  );
}
