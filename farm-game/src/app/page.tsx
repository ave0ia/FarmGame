"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function handleSignIn() {
    router.push("/signin");
  }

  function handleSignUp() {
    router.push("/signup");
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.title}>🌻 Welcome to Farm Game! 🌻</div>
        <button className={styles.button} onClick={handleSignIn}>
          Sign In
        </button>
        <button className={styles.button} onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
}
