type PitchAndAzimuth = {
  id: string;
  azimuth: number;
  pitch: number;
};

export type SolarSystem = {
  offset: number;
  systemSize: string;
  yearlyProduction: string;
  monthlyProduction: string[];
  numTotalPanels: number;
  numSelectedPanels: number;
  pitchAndAzimuthPerRoof: PitchAndAzimuth[];
};

type Credit = {
  name: string;
  amount: number;
};

type Adder = {
  name: string;
  flat_cost: boolean;
  count: number;
  cost: number;
  totalCost: number;
  dq: boolean;
};

export type SolarSavings = {
  systemSize: number;
  yearlySavings: (number | null)[];
  totalPanels: number;
  lifetimeSavings: (number | null)[];
  paybackYear: number;
  paybackMonth: number | null;
  systemCost: number;
  totalCost: number;
  rebateAmount: number;
  credits: Credit[];
  adders: Record<string, Adder>;
};