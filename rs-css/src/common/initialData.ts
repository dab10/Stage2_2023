import { GameDataState } from '../application/gameState';
import { INITIAL_STATE, LOCAL_STORAGE_KEY } from './constants';

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
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!savedState) {
      return new InitialData(INITIAL_STATE);
    }

    return new InitialData(JSON.parse(savedState));
  }

  save(): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this));
  }
}
