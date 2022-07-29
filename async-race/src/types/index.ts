export interface Cars {
  name: string;
  color: string;
  id: number;
}

export type Sort = 'id' | 'wins' | 'time';

export type Order = 'ASC' | 'DESC';

export interface Winners {
  page: number,
  limit: number,
  sort: Sort,
  order: Order
}

export interface Winner {
  id: number,
  wins: number,
  time: number
}
