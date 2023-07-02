import Control from '../common/control';
import { GameData } from './gameDataModel';
import { GameState } from './gameState';
import { AnimatedControl } from '../common/animatedControl';

import style from './cssEditorView.css';

export class GameHTMLView extends AnimatedControl {
  onHover!: (arg0: Control) => void;
  onHoverOut!: (arg0: Control) => void;

  constructor(parentNode: HTMLElement, gameData: GameData[], state: GameState) {
    super(parentNode, 'pre', { default: '', hidden: style['shake'] });

    const gameHTMLViewField = new Control(this.node, 'code', 'language-html prettyprint');
    const elTableStart = new Control(
      gameHTMLViewField.node,
      'div',
      '',
      gameData[state.data.currentLevel].HTMLCode.split('\r\n')[0]
    );

    elTableStart.node.id = 'editor';

    console.log(gameData[state.data.currentLevel].HTMLCode.split('\r\n'));

    gameData[state.data.currentLevel].HTMLCode.split('\r\n')
      .slice(1, -1)
      .forEach((item) => {
        const element = new Control(gameHTMLViewField.node, 'div', 'white_font', item);
        // element.node.onmouseover = () => {
        //   // this.onHover(element);
        //   element.node.classList.add('white_font');
        // };
        // element.node.onmouseout = () => {
        //   // this.onHoverOut(element);
        //   element.node.classList.remove('white_font');
        // };
      });

    const elTableEnd = new Control(
      gameHTMLViewField.node,
      'div',
      '',
      gameData[state.data.currentLevel].HTMLCode.split('\r\n').slice(-1).join()
    );
  }
}
