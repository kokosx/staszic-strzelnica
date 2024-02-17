export type WeaponInUse = {
  name: string;
  rounds: number;
  magazines: number;
};

export type ActiveSet = {
  targets: number;
  weapons: WeaponInUse[];
};
