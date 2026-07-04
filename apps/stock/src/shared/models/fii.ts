export type FiiData = {
  actualValue: number;
  dividendYield: number;
  name: string;
  pvp: number;
  segment?: string;
  yield: {
    lastYield?: {
      value: number;
      percentage: number;
      basePrice: number;
      date: string;
    };
    nextYield?: {
      value: number;
      percentage: number;
      basePrice: number;
      date: string;
    };
  };
};
