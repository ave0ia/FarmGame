"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");

  function handleSignIn() {
    if (!name || !pwd) {
      alert("Please enter both username and password");
      return;
    }
    const userStr = localStorage.getItem("users");
    const users = userStr ? JSON.parse(userStr) : {};

    if (!users[name] || users[name] !== pwd) {
      alert("Invalid username or password");
      return;
    }

    alert("Sign in succesful! Please enjoy!");
    localStorage.setItem("currentUser", name);
    router.push("/game");
  }

  function handleBack() {
    router.push("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.title}>Sign In</div>
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Username"
        />
        <input
          className={styles.input}
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="Password"
        />
        <button className={styles.button} onClick={handleSignIn}>
          Sign In
        </button>
        <button
          className={styles.button}
          onClick={handleBack}
          style={{ background: "#bdbdbd", color: "#333" }}
        >
          Back
        </button>
      </div>
    </div>
  );
}
