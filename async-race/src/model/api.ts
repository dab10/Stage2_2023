import {
  Cars, Sort, Order, Winners, Winner,
} from '../types';

const base = 'http://localhost:3000';

const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

export const getCars = async (page: number, limit = 7): Promise< {
  items: Cars[]; count: string | null;
} > => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getCar = async (id: number): Promise<Cars> => (await fetch(`${garage}/${id}`)).json();

export const createCar = async (body: Pick<Cars, 'name' | 'color'>): Promise<Pick<Cars, 'name' | 'color'>> => (await fetch(garage, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})).json();

export const deleteCar = async (id: number): Promise<Cars> => (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();

export const updateCar = async (id: number, body: Pick<Cars, 'name' | 'color'>): Promise<Cars> => (await fetch(`${garage}/${id}`, {
  method: 'PUT',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})).json();

export const startEngine = async (id: number) => (await fetch(`${engine}?id=${id}&status=started`)).json(); // PATCH?

export const stopEngine = async (id: number) => (await fetch(`${engine}?id=${id}&status=stopped`)).json(); // PATCH?

export const drive = async (id: number) => {
  const res = await fetch(`${engine}?id=${id}&status=drive`).catch();
  return res.status !== 200 ? { success: true } : { ...(await res.json()) };
};

const getSortOrder = (sort: Sort, order: Order) => {
  if (sort && order) return `&_sort=${sort}&_order=${order}`;
  return '';
};

export const getWinners = async ({
  page, limit = 10, sort, order,
}: Winners) => {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`);
  const items = await response.json();

  return {
    items: await Promise.all(
      items.map(async (winner: Winner) => ({ ...winner, car: await getCar(winner.id) })),
    ),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getWinner = async (id: number) => (await fetch(`${winners}/${id}`)).json();

export const getWinnerStatus = async (id: number) => (await fetch(`${winners}/${id}`)).status;

export const deleteWinner = async (id: number) => (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();

export const createWinner = async (body: Winner) => (await fetch(winners, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})).json();

export const updateWinner = async (id: number, body: Winner) => (await fetch(`${winners}/${id}`, {
  method: 'PUT',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})).json();

export const saveWinner = async ({ id, time }: Pick<Winner, 'id' | 'time'>) => {
  const winnerStatus = await getWinnerStatus(id);

  if (winnerStatus === 404) {
    await createWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  }
};
