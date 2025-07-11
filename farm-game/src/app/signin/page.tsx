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

    alert("Sign in succesful! Please enjoy!")
    localStorage.setItem("currentUser", name);
    router.push("/game");
  }

  function handleBack() {
    router.push("/");
  }

  return (
    <div>
      <h1 className={styles.title}>Sign In Page</h1>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="username"
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="password"
          />
        </label>
        <div>
          <button onClick={handleSignIn}>Sign In</button>
          <button onClick={handleBack}>Back</button>
        </div>
      </div>
    </div>
  );
}
