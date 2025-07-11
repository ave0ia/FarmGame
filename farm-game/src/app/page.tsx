"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    function handleSignIn(){
     router.push("/signin")
    }

    function handleSignUp(){
      router.push("/signup")
    }
  return (
    <div>
      <div className={styles.title}>Welcome to Farm Game!</div>
      <> 
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={handleSignUp}>Sign Up</button>
      </>
    </div>
  );
}
