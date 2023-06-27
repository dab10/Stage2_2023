import Control from '../common/control';
import { LevelsView } from './levelView';

import style from './application.css';

export class Application extends Control {
  header: Control<HTMLElement>;
  footer: Control<HTMLElement>;
  gameHeader: Control<HTMLElement>;
  gameEditor: Control<HTMLElement>;
  gameView: Control<HTMLElement>;
  gameLevel: Control<HTMLElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', style['global_wrapper']);

    this.header = new Control(this.node, 'div', style['global_header']);
    this.gameHeader = new Control(this.node, 'div', style['game_header']);
    this.gameEditor = new Control(this.node, 'div', style['game_editor']);
    this.gameView = new Control(this.node, 'div', style['game_view']);
    this.gameLevel = new Control(this.node, 'div', style['game_level']);
    this.footer = new Control(this.node, 'div', style['global_footer']);
    this.gameCycle();
  }

  private gameCycle() {
    const levels = new LevelsView(this.gameLevel.node);
    levels.onChooseLevel = (levelNumber) => {
      console.log(levelNumber);
    };
  }
}
