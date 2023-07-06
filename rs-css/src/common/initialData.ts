import { GameDataState } from '../application/gameState';
import { INITIAL_STATE } from './constants';

export class InitialData {
  currentLevel: number;
  completeLevels: number[];
  completeLevelsWithHints: number[];

  constructor(data: GameDataState) {
    this.currentLevel = data.currentLevel;
    this.completeLevels = data.completeLevels;
    this.completeLevelsWithHints = data.completeLevelsWithHints;
  }

  static load(): InitialData {
    const loaded = localStorage.getItem('savedState');
    if (loaded) {
      return new InitialData(JSON.parse(loaded));
    } else {
      return new InitialData(INITIAL_STATE);
    }
  }

  save(): void {
    localStorage.setItem('savedState', JSON.stringify(this));
  }
}
