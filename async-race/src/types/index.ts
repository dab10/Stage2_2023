export interface Cars {
  name: string;
  color: string;
  id: number;
}

export interface Car {
  name: string;
  color: string;
}

export type Sort = 'id' | 'wins' | 'time' | '';

export type Order = 'ASC' | 'DESC' | '';

export interface Winners {
  page: number,
  limit: number,
  sort: Sort,
  order: Order
}

export interface Winner {
  id: number,
  wins: number,
  time: number,
}

export interface TableWinnerCar {
  id: number,
  wins: number,
  time: number,
  car: Car
}

export interface NumberCarAnimate {
  [key: string]: number;
}

export interface WinnerCar {
  time: number;
  id: number;
  isSuccess: boolean;
}

export interface TableWinner {
  page: number;
  limit: number;
  sort: Sort;
  order: Order;
}
