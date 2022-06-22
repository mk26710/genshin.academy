export enum Rarity {
  FIVE_STAR = 5,
  FOUR_STAR = 4,
  THREE_STAR = 3,
  TWO_STAR = 2,
  ONE_STAR = 1,
  ZERO_STAR = 0,
}

export type RarityType = 5 | 4 | 3 | 2 | 1 | 0;

export enum Weapon {
  SWORD = "SWORD",
  CLAYMORE = "CLAYMORE",
  POLEARM = "POLEARM",
  CATALYST = "CATALYST",
  BOW = "BOW",
}

export type WeaponType = "SWORD" | "CLAYMORE" | "POLEARM" | "CATALYST" | "BOW";

export enum Vision {
  CRYO = "CRYO",
  ELECTRO = "ELECTRO",
  PYRO = "PYRO",
  ANEMO = "ANEMO",
  HYDRO = "HYDRO",
  GEO = "GEO",
}

export type VisionType = "CRYO" | "ELECTRO" | "PYRO" | "ANEMO" | "HYDRO" | "GEO";
