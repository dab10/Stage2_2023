import Control from '../common/control';
import { GameData } from './gameDataModel';

import style from './levelsView.css';

export class LevelsView extends Control {
  onChooseLevel!: (index: number) => void;

  constructor(parentNode: HTMLElement, gameData: GameData[]) {
    super(parentNode, 'div', style['levels_view_wrapper']);

    const chooseLevelButton = gameData.map((item, i) => {
      const levelSymbolsWrapper = new Control(this.node, 'div', style['levels_buttons_wrapper']);
      const completeLevelSymbol = new Control(levelSymbolsWrapper.node, 'div', style['complete_level_symbol']);
      completeLevelSymbol.node.innerHTML = '&#10004;';
      const completeLevelWithHintSymbol = new Control(
        levelSymbolsWrapper.node,
        'div',
        style['complete_level_symbol_with_hint']
      );
      completeLevelWithHintSymbol.node.innerHTML = '!';
      const button = new Control(levelSymbolsWrapper.node, 'button', style['level_button'], (i + 1).toString());
      button.node.onclick = () => {
        this.onChooseLevel(i);
      };
    });
  }
}
