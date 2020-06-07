export interface IMap {
  levels: IMapLevel[];
}

export interface IMapLevel {
  baskets: {
    lines: number[];
    colors: string[]
  };
  balls: {
    colors: string[];
    lines: number[];
    amount: number
  };
  velocity: number;
  time: number;
}
