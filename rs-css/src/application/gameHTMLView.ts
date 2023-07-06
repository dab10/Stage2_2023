import Control from '../common/control';
import { GameData } from './gameDataModel';
import { GameState } from './gameState';
import { AnimatedControl } from '../common/animatedControl';

import style from './cssEditorView.css';

export class GameHtmlView extends AnimatedControl {
  constructor(parentNode: HTMLElement, gameData: GameData[], state: GameState) {
    super(parentNode, 'pre', { default: '', hidden: style['shake'] });

    const gameHtmlViewField = new Control(this.node, 'code', 'language-html prettyprint');
    const elementTableStart = new Control(
      gameHtmlViewField.node,
      'div',
      '',
      gameData[state.data.currentLevel].htmlCode.split('\r\n')[0]
    );

    elementTableStart.node.id = 'editor';

    gameData[state.data.currentLevel].htmlCode
      .split('\r\n')
      .slice(1, -1)
      .forEach((item) => {
        new Control(gameHtmlViewField.node, 'div', 'white-font', item);
      });

    new Control(
      gameHtmlViewField.node,
      'div',
      '',
      gameData[state.data.currentLevel].htmlCode.split('\r\n').slice(-1).join()
    );
  }
}
