import gameData from '../assets/json/gameData.json';

interface GameData {
  levelNumber: number;
  HTMLCode: string;
}

export class GameDataModel {
  data: Array<GameData>;

  constructor() {
    this.data = [];
  }

  public async loadJSON() {
    this.data = await this.loadData(gameData);
    console.log(this.data);
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
