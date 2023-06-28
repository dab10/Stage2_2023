import Control from '../common/control';
import { LevelsView } from './levelView';
import { GameDataModel } from './gameDataModel';
import { GameState } from './keyboardState';

import style from './application.css';

export class Application extends Control {
  header: Control<HTMLElement>;
  footer!: Control<HTMLElement>;
  gameHeader: Control<HTMLElement>;
  gameEditor: Control<HTMLElement>;
  gameHTMLViewer: Control<HTMLElement>;
  gameLevel: Control<HTMLElement>;
  model: GameDataModel;

  constructor(parentNode: HTMLElement, protected state: GameState) {
    super(parentNode, 'div', style['global_wrapper']);

    this.header = new Control(this.node, 'div', style['global_header']);
    this.gameHeader = new Control(this.node, 'div', style['game_header']);
    this.gameEditor = new Control(this.node, 'div', style['game_editor']);
    this.gameHTMLViewer = new Control(this.node, 'div', style['game_HTML_Viewer']);
    this.gameLevel = new Control(this.node, 'div', style['game_level']);
    this.footer = new Control(this.node, 'div', style['global_footer']);

    this.model = new GameDataModel();
    console.log(state.data);
    this.model.loadJSON().then((res) => {
      this.gameHTMLViewer.node.textContent = res.data[this.state.data.startLevel].HTMLCode;
      this.gameCycle();
    });
  }

  private gameCycle() {
    const levels = new LevelsView(this.gameLevel.node, this.state.data.startLevel);
    levels.onChooseLevel = (levelNumber) => {
      const data = this.model.getCategoriesData();
      console.log(data, levelNumber);
      this.gameHTMLViewer.node.textContent = data[levelNumber].HTMLCode;
      // const state = this.state;
      // state.data = { ...state.data, content: state.data.content + 10 };
      // console.log(state.data);
    };
  }
}
