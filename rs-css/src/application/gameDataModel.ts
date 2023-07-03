import gameData from '../assets/json/gameData.json';

export interface GameData {
  levelNumber: number;
  HTMLCode: string;
  HTMLDom: HTMLDom[];
  answer: string;
}

export interface HTMLDom {
  tagName: string;
  className?: string;
  classNameAnimation?: string;
  id?: string;
  child?: HTMLDom[];
}

export class GameDataModel {
  data: Array<GameData>;

  constructor() {
    this.data = [];
  }

  public async loadJSON() {
    this.data = await this.loadData(gameData);
    return this;
  }

  private loadData(url: string): Promise<Array<GameData>> {
    return fetch(url)
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  }

  public getCategoriesData() {
    return this.data;
  }
}
