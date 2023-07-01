import Control from '../common/control';
import { GameData } from './gameDataModel';
import { GameState } from './gameState';
import { AnimatedControl } from '../common/animatedControl';

import style from './cssEditorView.css';

export class GameHTMLView extends AnimatedControl {
  constructor(parentNode: HTMLElement, gameData: GameData[], state: GameState) {
    super(parentNode, 'div', { default: '', hidden: style['shake'] });

    const gameHTMLViewField = new Control(this.node, 'div', '', gameData[state.data.currentLevel].HTMLCode);
  }
}
