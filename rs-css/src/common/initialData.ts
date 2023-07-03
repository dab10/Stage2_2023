import { GameDataState } from '../application/gameState';
import { initialState } from './constants';

export class InitialData {
  currentLevel: number;
  completeLevels: Array<number>;
  completeLevelsWithHints: Array<number>;

  constructor(data: GameDataState) {
    this.currentLevel = data.currentLevel;
    this.completeLevels = data.completeLevels;
    this.completeLevelsWithHints = data.completeLevelsWithHints;
  }

  static load() {
    const loaded = localStorage.getItem('savedState');
    if (loaded) {
      return new InitialData(JSON.parse(loaded));
    } else {
      return new InitialData(initialState);
    }
  }

  save() {
    localStorage.setItem('savedState', JSON.stringify(this));
  }
}
