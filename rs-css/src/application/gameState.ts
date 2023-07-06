export interface GameDataState {
  currentLevel: number;
  completeLevels: number[];
  completeLevelsWithHints: number[];
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
