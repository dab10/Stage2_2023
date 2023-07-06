import Control from '../common/control';
import { GameData } from './gameDataModel';
import { GameState } from './gameState';

import style from './levelsView.css';

export class LevelsView extends Control {
  onChooseLevel!: (index: number) => void;
  onResetLevel!: () => void;

  constructor(parentNode: HTMLElement, gameData: GameData[], state: GameState) {
    super(parentNode, 'div', style['levels-view-wrapper']);
    this.buildLevels(gameData, state);
  }

  buildLevels(gameData: GameData[], state: GameState): void {
    this.node.innerHTML = '';
    gameData.map((item, i) => {
      const completeLevelSymbolStyle = state.data.completeLevels.includes(i)
        ? [style['complete-level-symbol'], style['complete-level']].join(' ')
        : style['complete-level-symbol'];

      const completeLevelWithHintSymbolStyle = state.data.completeLevelsWithHints.includes(i)
        ? [style['complete-level-symbol-with-hint'], style['complete-level']].join(' ')
        : style['complete-level-symbol-with-hint'];

      const levelSymbolsWrapper = new Control(this.node, 'div', style['levels-buttons-wrapper']);
      const completeLevelSymbol = new Control(levelSymbolsWrapper.node, 'div', completeLevelSymbolStyle);
      completeLevelSymbol.node.innerHTML = '&#10004;';
      const completeLevelWithHintSymbol = new Control(
        levelSymbolsWrapper.node,
        'div',
        completeLevelWithHintSymbolStyle
      );
      completeLevelWithHintSymbol.node.innerHTML = '&#9733;';
      const button = new Control(levelSymbolsWrapper.node, 'button', style['level-button'], (i + 1).toString());
      if (state.data.currentLevel === i) button.node.classList.add('active-level-button');
      button.node.onclick = () => {
        this.onChooseLevel(i);
      };
    });

    const resetProgressButton = new Control(this.node, 'button', style['reset-button'], 'Reset progress');
    resetProgressButton.node.onclick = () => {
      this.onResetLevel();
    };
  }
}
