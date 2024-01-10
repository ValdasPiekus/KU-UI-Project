export interface Currency {
  code: string;
  name: string;
}

export interface Rates {
  amount: number;
  base: string;
  date: Date;
  rates: {
    [key: string]: number;
  };
}
