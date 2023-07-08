import gameData from '../assets/json/gameData.json';
import { ControlTag } from '../common/control';
export interface GameData {
  levelNumber: number;
  htmlCode: string;
  htmlDom: HtmlDom[];
  answer: string;
}

export interface HtmlDom {
  tagName: ControlTag;
  className?: string;
  classNameAnimation?: string;
  id?: string;
  child?: HtmlDom[];
}

export class GameDataModel {
  data: GameData[];

  constructor() {
    this.data = [];
  }

  public async loadJSON(): Promise<this> {
    this.data = await this.loadData(gameData);
    return this;
  }

  private loadData(url: string): Promise<GameData[]> {
    return fetch(url)
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  }

  public getCategoriesData(): GameData[] {
    return this.data;
  }
}
