export const SEEDS = [
  { id: 1, name: "Daisy Seed", price: 10 },
  { id: 2, name: "Tulip Seed", price: 20 },
];

export const SEED_COSTS: { [seedId: number]: number } = Object.fromEntries(
  SEEDS.map(seed => [seed.id, seed.price])
);

export const SEED_NAMES: { [seedId: number]: string } = Object.fromEntries(
  SEEDS.map(seed => [seed.id, seed.name])
);