import Control from '../common/control';
import { LevelsView } from './levelsView';
import { GameDataModel } from './gameDataModel';
import { GameState } from './gameState';
import { cssEditorView } from './cssEditorView';
import { GameHTMLView } from './gameHTMLView';
import { GameHeaderView } from './gameHeaderView';
import { initialState } from '../common/constants';

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
    this.model.loadJSON().then(() => {
      this.gameCycle();
    });
  }

  private gameCycle() {
    // let levels = new LevelsView(this.gameLevel.node, this.model.getCategoriesData(), this.state);
    const levels = new LevelsView(this.gameLevel.node, this.model.getCategoriesData(), this.state);
    const gameHTMLViewerField = new GameHTMLView(this.gameHTMLViewer.node, this.model.getCategoriesData(), this.state);
    const gameHeaderField = new GameHeaderView(this.gameHeader.node, this.model.getCategoriesData(), this.state);
    const cssEditor = new cssEditorView(this.gameEditor.node, this.model.getCategoriesData(), this.state);
    this.helpCycle(levels, cssEditor, gameHTMLViewerField, gameHeaderField);

    cssEditor.onGetValue = (value) => {
      console.log(value);
      if (value === 'ok') {
        const state = this.state;
        state.data.completeLevels.push(state.data.currentLevel);
        state.data = { ...state.data, currentLevel: state.data.currentLevel + 1 };
        console.log(state);
        // levels.destroy();
        // const levels = new LevelsView(this.gameLevel.node, this.model.getCategoriesData(), this.state);
        gameHeaderField.animateRightQuestion().then(() => {
          levels.destroy();
          cssEditor.destroy();
          gameHTMLViewerField.destroy();
          gameHeaderField.destroy();
          this.gameCycle();
        });
      }
      if (value === 'no') {
        cssEditor.removeAnimation();
        gameHTMLViewerField.removeAnimation();
        cssEditor.animateOut();
        gameHTMLViewerField.animateOut();
      }
    };

    // cssEditor.onHelp = () => {
    //   levels.destroy();
    //   levels = new LevelsView(this.gameLevel.node, this.model.getCategoriesData(), this.state);
    //   this.gameCycle();
    // };

    // this.state.onChange.add(cssEditor.onGetValue);
  }

  // private answerCycle(
  //   levels: LevelsView,
  //   cssEditor: cssEditorView,
  //   gameHTMLViewerField: GameHTMLView,
  //   gameHeaderField: GameHeaderView
  // ) {

  // }

  private helpCycle(
    levels: LevelsView,
    cssEditor: cssEditorView,
    gameHTMLViewerField: GameHTMLView,
    gameHeaderField: GameHeaderView
  ) {
    levels.onChooseLevel = (levelNumber: number) => {
      // const data = this.model.getCategoriesData();
      // console.log(data, levelNumber);
      // this.gameHTMLViewer.node.textContent = data[levelNumber].HTMLCode;
      const state = this.state;
      state.data = { ...state.data, currentLevel: levelNumber };
      console.log(this.state.data);
      // cssEditor.destroy();
      // gameHTMLViewerField.destroy();
      // gameHeaderField.destroy();
      // gameHTMLViewerField = new GameHTMLView(this.gameHTMLViewer.node, this.model.getCategoriesData(), this.state);
      // gameHeaderField = new GameHeaderView(this.gameHeader.node, this.model.getCategoriesData(), this.state);
      // cssEditor = new cssEditorView(this.gameEditor.node, this.model.getCategoriesData(), this.state);
      levels.destroy();
      cssEditor.destroy();
      gameHTMLViewerField.destroy();
      gameHeaderField.destroy();
      this.gameCycle();
    };

    levels.onResetLevel = () => {
      const state = this.state;
      state.data.currentLevel = 0;
      state.data.completeLevels.length = 0;
      state.data.completeLevelsWithHints.length = 0;
      console.log(state.data);
      levels.destroy();
      cssEditor.destroy();
      gameHTMLViewerField.destroy();
      gameHeaderField.destroy();
      this.gameCycle();
    };

    cssEditor.onHelp = () => {
      levels.destroy();
      levels = new LevelsView(this.gameLevel.node, this.model.getCategoriesData(), this.state);
      this.helpCycle(levels, cssEditor, gameHTMLViewerField, gameHeaderField);
    };
  }
}
