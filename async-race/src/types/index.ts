export interface Cars {
  name: string;
  color: string;
  id?: number;
}

export interface Car {
  name: string;
  color: string;
}

export type Sort = 'wins' | 'time' | '';

export type Order = 'asc' | 'desc' | '';

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
  isSuccess?: boolean;
}

export interface TableWinner {
  page: number;
  limit: number;
  sort: Sort;
  order: Order;
}

export interface OptionsRace {
  'velocity': number;
  'distance': number;
}

export interface WinnersFromAPI {
  'id': number;
  'wins': number;
  'time': number;
  'query': string;
}

export interface AllCars {
  items: Cars[];
  count: string;
}

export interface SuccessStatus {
  success: boolean;
}

export interface AllWinners {
  items: TableWinnerCar[];
  count: string;
}

export enum HTTPStatusCode {
  Success = 200,
  NotFound = 404,
}

export enum HTTPMethods {
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
}
