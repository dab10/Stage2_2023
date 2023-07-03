import Control from '../common/control';
import { LevelsView } from './levelsView';
import { GameDataModel } from './gameDataModel';
import { GameState } from './gameState';
import { cssEditorView } from './cssEditorView';
import { GameHTMLView } from './gameHTMLView';
import { GameHeaderView } from './gameHeaderView';
import { FooterView } from './footerView';
import { ModalPage } from './modalPageView';
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

    this.header = new Control(this.node, 'div', style['global_header'], 'RS Selectors');
    this.gameHeader = new Control(this.node, 'div', style['game_header']);
    this.gameEditor = new Control(this.node, 'div', style['game_editor']);
    this.gameHTMLViewer = new Control(this.node, 'div', style['game_HTML_Viewer']);
    this.gameLevel = new Control(this.node, 'div', style['game_level']);
    this.footer = new Control(this.node, 'div', style['global_footer']);
    const containerFooter = new FooterView(this.footer.node);

    this.model = new GameDataModel();
    // console.log(state.data);
    this.model.loadJSON().then(() => {
      this.gameCycle();
    });
  }

  private gameCycle() {
    // console.log('444', this.state.data);
    const levels = new LevelsView(this.gameLevel.node, this.model.getCategoriesData(), this.state);
    const gameHTMLViewerField = new GameHTMLView(this.gameHTMLViewer.node, this.model.getCategoriesData(), this.state);
    const gameHeaderField = new GameHeaderView(this.gameHeader.node, this.model.getCategoriesData(), this.state);
    const cssEditor = new cssEditorView(this.gameEditor.node, this.model.getCategoriesData(), this.state);
    // this.helpCycle(levels, cssEditor, gameHTMLViewerField, gameHeaderField);

    cssEditor.onGetValue = (value) => {
      // console.log('111', this.state.data);
      const gameData = this.model.getCategoriesData();
      const answer = this.model.getCategoriesData()[this.state.data.currentLevel].answer;
      // const enterAnswer = Array.from(document.querySelectorAll(`.table ${value}`));
      // const rightAnswer = Array.from(document.querySelectorAll(`.table ${answer}`));
      // console.log(enterAnswer, rightAnswer);
      // const isLengthEqual = enterAnswer.length === rightAnswer.length;
      // const isArraysEqual = enterAnswer.every((a, b) => a.innerHTML === rightAnswer[b].innerHTML);

      if (value === answer) {
        // console.log('222', this.state.data);
        const state = this.state;
        if (!state.data.completeLevels.includes(state.data.currentLevel)) {
          state.data.completeLevels.push(state.data.currentLevel);
        }

        // console.log(state.data.currentLevel);
        // console.log(gameData.length);
        const level = state.data.currentLevel + 1 >= gameData.length ? 0 : state.data.currentLevel + 1;
        state.data = {
          ...state.data,
          currentLevel: level,
        };
        // console.log('333', this.state.data);
        if (state.data.completeLevels.length === gameData.length) {
          gameHeaderField.animateRightQuestion().then(() => {
            levels.destroy();
            cssEditor.destroy();
            gameHTMLViewerField.destroy();
            gameHeaderField.destroy();
            new ModalPage(this.node);
            this.gameCycle();
          });
        } else {
          gameHeaderField.animateRightQuestion().then(() => {
            levels.destroy();
            cssEditor.destroy();
            gameHTMLViewerField.destroy();
            gameHeaderField.destroy();
            this.gameCycle();
          });
        }
      } else {
        cssEditor.removeAnimation();
        gameHTMLViewerField.removeAnimation();
        cssEditor.animateOut();
        gameHTMLViewerField.animateOut();
      }
    };

    levels.onChooseLevel = (levelNumber: number) => {
      const state = this.state;
      state.data = { ...state.data, currentLevel: levelNumber };
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
      // console.log(state.data);
      levels.destroy();
      cssEditor.destroy();
      gameHTMLViewerField.destroy();
      gameHeaderField.destroy();
      this.gameCycle();
    };

    cssEditor.onHelp = () => {
      // levels.destroy();
      // levels = new LevelsView(this.gameLevel.node, this.model.getCategoriesData(), this.state);
      levels.buildLevels(this.model.getCategoriesData(), this.state);
      // this.helpCycle(levels, cssEditor, gameHTMLViewerField, gameHeaderField);
    };
  }

  // private helpCycle(
  //   levels: LevelsView,
  //   cssEditor: cssEditorView,
  //   gameHTMLViewerField: GameHTMLView,
  //   gameHeaderField: GameHeaderView
  // ) {}

  // private compareNodes(node1: NodeListOf<Element>, node2: NodeListOf<Element>) {
  //   function objectsEqual (o1, o2) {
  //     return typeof o1 === 'object' && Object.keys(o1).length > 0
  //       ? Object.keys(o1).length === Object.keys(o2).length && Object.keys(o1).every((p) => objectsEqual(o1[p], o2[p]))
  //       : o1 === o2;
  //   }

  //   function arraysEqual(a1: NodeListOf<Element>, a2: NodeListOf<Element>) {
  //     return a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));
  //   }

  //   arraysEqual(node1, node2);
  // }
}
