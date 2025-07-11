import { useContext } from "react";
import { SeedInventoryContext } from "@/app/contexts/SeedsInventoryContext";

export default function SeedSelector() {
  const { inventory, selectedSeed, setSelectedSeed } = useContext(SeedInventoryContext);

  return (
    <div>
      <h3>Select a Seed</h3>
      <ul>
        {Object.entries(inventory).map(([seedId, count]) =>
          count > 0 ? (
            <li key={seedId}>
              <button
                style={{
                  fontWeight: selectedSeed === Number(seedId) ? "bold" : "normal",
                }}
                onClick={() => setSelectedSeed(Number(seedId))}
              >
                Seed #{seedId} ({count})
              </button>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
}