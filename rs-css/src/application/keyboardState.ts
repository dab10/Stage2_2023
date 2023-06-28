export interface GameDataState {
  startLevel: number;
  completeLevels: Array<number>;
  completeLevelsWithHints: Array<number>;
}

export class GameState {
  private _data: GameDataState;
  get data() {
    return this._data;
  }

  set data(value: GameDataState) {
    this._data = value;
  }

  constructor(initial: GameDataState) {
    this._data = initial;
  }
}
