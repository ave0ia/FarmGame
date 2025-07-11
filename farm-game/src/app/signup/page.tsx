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
    alert("Sign up succesful! Redirecting...")

    router.push("/signin");
  }

  function handleBack() {
    router.push("/");
  }

  return (
    <div>
      <h1 className={styles.title}>Sign Up Page</h1>
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
          <button onClick={handleSave}>Sign Up</button>
          <button onClick={handleBack}>Back</button>
        </div>
      </div>
    </div>
  );
}
