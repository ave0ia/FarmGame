import React, { useContext, useState } from "react";
import { BalanceContext } from "../../contexts/BalanceContext";

type Seed = {
  id: number;
  name: string;
  price: number;
};

const seeds: Seed[] = [
  { id: 1, name: "Daisy Seed", price: 10 },
  { id: 2, name: "Tulip Seed", price: 20 },
];

type StorePopupProps = {
  onClose: () => void;
};

export default function StorePopup({ onClose }: StorePopupProps) {
  const { balance, setBalance } = useContext(BalanceContext);
  const [message, setMessage] = useState<string>("");

  function buySeed(seed: Seed) {
    if (balance >= seed.price) {
      setBalance(balance - seed.price);
      setMessage(`You bought a ${seed.name}!`);
    } else {
      setMessage("Not enough balance!");
    }
  }

  return (
    <div>
      <h2>Store</h2>
      <ul>
        {seeds.map((seed) => (
          <li key={seed.id} style={{ marginBottom: 10 }}>
            <strong>{seed.name}</strong> - ${seed.price}
            <button
              onClick={() => buySeed(seed)}
              style={{ marginLeft: 10 }}
              disabled={balance < seed.price}
            >
              Buy
            </button>
          </li>
        ))}
      </ul>
      {message && <p>{message}</p>}
      <button onClick={onClose} style={{ marginTop: 15 }}>
        Close
      </button>
    </div>
  );
}
