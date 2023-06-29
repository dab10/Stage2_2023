import Control from '../common/control';
import { GameData } from './gameDataModel';
import { GameState } from './gameState';

import style from './application.css';

export class GameHTMLView1 extends Control {
  constructor(parentNode: HTMLElement, gameData: GameData[], state: GameState) {
    super(parentNode);

    const levelSymbolsWrapper = new Control(this.node, 'div', '', gameData[state.data.currentLevel].HTMLCode);
  }
}
