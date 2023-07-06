import Control from '../common/control';
import { LevelsView } from './levelsView';
import { GameDataModel } from './gameDataModel';
import { GameState } from './gameState';
import { cssEditorView } from './cssEditorView';
import { GameHTMLView } from './gameHTMLView';
import { GameHeaderView } from './gameHeaderView';
import { FooterView } from './footerView';
import { ModalPage } from './modalPageView';

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
    super(parentNode, 'div', style['global-wrapper']);

    this.header = new Control(this.node, 'div', style['global-header'], 'RS Selectors');
    this.gameHeader = new Control(this.node, 'div', style['game-header']);
    this.gameEditor = new Control(this.node, 'div', style['game-editor']);
    this.gameHTMLViewer = new Control(this.node, 'div', style['game-HTML-Viewer']);
    this.gameLevel = new Control(this.node, 'div', style['game-level']);
    this.footer = new Control(this.node, 'div', style['global-footer']);
    const containerFooter = new FooterView(this.footer.node);

    this.model = new GameDataModel();
    this.model.loadJSON().then(() => {
      this.gameCycle();
    });
  }

  private gameCycle() {
    const levels = new LevelsView(this.gameLevel.node, this.model.getCategoriesData(), this.state);
    const gameHTMLViewerField = new GameHTMLView(this.gameHTMLViewer.node, this.model.getCategoriesData(), this.state);
    const gameHeaderField = new GameHeaderView(this.gameHeader.node, this.model.getCategoriesData(), this.state);
    const cssEditor = new cssEditorView(this.gameEditor.node, this.model.getCategoriesData(), this.state);

    cssEditor.onGetValue = (value) => {
      const gameData = this.model.getCategoriesData();
      const answer = this.model.getCategoriesData()[this.state.data.currentLevel].answer;

      if (value === answer) {
        const state = this.state;
        if (!state.data.completeLevels.includes(state.data.currentLevel)) {
          state.data.completeLevels.push(state.data.currentLevel);
        }

        const level = state.data.currentLevel + 1 >= gameData.length ? 0 : state.data.currentLevel + 1;
        state.data = {
          ...state.data,
          currentLevel: level,
        };
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
      levels.destroy();
      cssEditor.destroy();
      gameHTMLViewerField.destroy();
      gameHeaderField.destroy();
      this.gameCycle();
    };

    cssEditor.onHelp = () => {
      levels.buildLevels(this.model.getCategoriesData(), this.state);
    };
  }
}
