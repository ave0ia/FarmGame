"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");

  function handleSave() {
    if (!name || !pwd) {
      alert("Please enter both username and password");
      return;
    }

    const userStr = localStorage.getItem("users");
    const users = userStr ? JSON.parse(userStr) : {};

    if (users[name]) {
      alert("Username already exists");
      return;
    }

    users[name] = pwd;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Sign up successful! Redirecting...");

    router.push("/signin");
  }

  function handleBack() {
    router.push("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.title}>Sign Up</div>
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
        <button className={styles.button} onClick={handleSave}>
          Sign Up
        </button>
        <button
          className={styles.button}
          onClick={handleBack}
          style={{ background: "#bdbdbd", color: "#333", marginTop: "8px" }}
        >
          Back
        </button>
      </div>
    </div>
  );
}
