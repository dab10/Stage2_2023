import {
  Cars, Sort, Order, Winner, WinnerCar, TableWinner, TableWinnerCar,
  OptionsRace, WinnersFromAPI, HTTPErrors,
} from '../../types';
import View from '../view/view';

class Api {
  private base: string;

  private garage: string;

  private engine: string;

  private winners: string;

  private sortAndOrder: string;

  private startPageGarage: number;

  private startPageWinners: number;

  private carsPerPage: number;

  private winnersPerPage: number;

  protected view: View;

  protected controller: AbortController;

  constructor() {
    this.base = 'http://localhost:3000';
    this.garage = `${this.base}/garage`;
    this.engine = `${this.base}/engine`;
    this.winners = `${this.base}/winners`;
    this.sortAndOrder = '';
    this.view = new View();
    this.controller = new AbortController();
    this.startPageGarage = 1;
    this.startPageWinners = 1;
    this.carsPerPage = 7;
    this.winnersPerPage = 10;
  }

  public async carsForStartPage(): Promise<void> {
    const { items, count } = (await this.getCars(this.startPageGarage));
    this.view.renderStartPage(items, count);
  }

  public async winnersForStartPage(): Promise<void> {
    const { items, count } = await this.getWinners({
      page: this.startPageWinners, limit: this.winnersPerPage, sort: '', order: '',
    });
    View.renderStartTableWinners(items, count);
  }

  public getCars = async (page: number, limit = this.carsPerPage): Promise< {
    items: Cars[]; count: string;
  } > => {
    const response = await fetch(`${this.garage}?_page=${page}&_limit=${limit}`);
    return {
      items: await response.json(),
      count: response.headers.get('X-Total-Count') as string,
    };
  };

  public getCar = async (id: number): Promise<Cars> => (await fetch(`${this.garage}/${id}`)).json();

  public createCar = async (body: Cars): Promise<Cars> => (
    await fetch(this.garage, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

  public deleteCar = async (id: number): Promise<Cars> => (await fetch(`${this.garage}/${id}`, { method: 'DELETE' })).json();

  public updateCar = async (id: number, body: Pick<Cars, 'name' | 'color'>): Promise<Cars> => (await fetch(`${this.garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })).json();

  public startEngine = async (id: number): Promise<OptionsRace> => (await fetch(`${this.engine}?id=${id}&status=started`, { method: 'PATCH' })).json();

  public stopEngine = async (id: number): Promise<OptionsRace> => (await fetch(`${this.engine}?id=${id}&status=stopped`, { method: 'PATCH' })).json();

  public drive = async (id: number): Promise<{ success: boolean }> => {
    try {
      const res = await fetch(`${this.engine}?id=${id}&status=drive`, { method: 'PATCH', signal: this.controller.signal });
      return res.status === HTTPErrors.Success ? { success: true } : { success: false };
    } catch {
      return { success: true };
    }
  };

  public getSortOrder = (sort: Sort, order: Order): string => {
    if (sort && order) {
      this.sortAndOrder = `&_sort=${sort}&_order=${order}`;
      return this.sortAndOrder;
    }
    this.sortAndOrder = '';
    return this.sortAndOrder;
  };

  public getWinners = async ({
    page, limit = this.winnersPerPage, sort, order,
  }: TableWinner): Promise<{ items: TableWinnerCar[]; count: string; }> => {
    const response = await fetch(`${this.winners}?_page=${page}&_limit=${limit}${this.getSortOrder(sort, order)}`);
    const items = await response.json();
    return {
      items: await Promise.all(
        items.map(async (winner: Winner) => ({ ...winner, car: await this.getCar(winner.id) })),
      ),
      count: response.headers.get('X-Total-Count') as string,
    };
  };

  public getWinner = async (id: number): Promise<WinnersFromAPI> => (await fetch(`${this.winners}/${id}`)).json();

  public getWinnerStatus = async (id: number): Promise<number> => (await fetch(`${this.winners}/${id}`)).status;

  public deleteWinner = async (id: number): Promise<WinnersFromAPI> => (await fetch(`${this.winners}/${id}`, { method: 'DELETE' })).json();

  public createWinner = async (body: Winner): Promise<WinnersFromAPI> => (
    await fetch(this.winners, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

  public updateWinner = async (id: number, body: Winner): Promise<WinnersFromAPI> => (await fetch(`${this.winners}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })).json();

  public saveWinner = async ({ id, time }: Pick<WinnerCar, 'id' | 'time'>) => {
    const winnerStatus = await this.getWinnerStatus(id);

    if (winnerStatus === HTTPErrors.NotFound) {
      await this.createWinner({
        id,
        wins: 1,
        time,
      });
    } else {
      const winner = await this.getWinner(id);
      await this.updateWinner(id, {
        id,
        wins: winner.wins + 1,
        time: time < winner.time ? time : winner.time,
      });
    }
  };
}

export default Api;
