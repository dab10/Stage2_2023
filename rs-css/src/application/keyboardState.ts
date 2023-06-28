export interface GameData {
  startLevel: number;
  completeLevels: Array<number>;
  completeLevelsWithHints: Array<number>;
}

export class GameState {
  private _data: GameData;
  get data() {
    return this._data;
  }

  set data(value: GameData) {
    this._data = value;
  }

  constructor(initial: GameData) {
    this._data = initial;
  }
}
