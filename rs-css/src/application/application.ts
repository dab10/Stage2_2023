import Control from '../common/control';
import { LevelsView } from './levelsView';
import { GameDataModel } from './gameDataModel';
import { GameState } from './gameState';
import { CssEditorView } from './cssEditorView';
import { GameHtmlView } from './gameHtmlView';
import { GameHeaderView } from './gameHeaderView';
import { FooterView } from './footerView';
import { ModalPage } from './modalPageView';
import { FIRST_LEVEL } from '../common/constants';

import style from './application.css';

export class Application extends Control {
  header: Control<HTMLElement>;
  footer!: Control<HTMLElement>;
  gameHeader: Control<HTMLElement>;
  gameEditor: Control<HTMLElement>;
  gameHtmlViewer: Control<HTMLElement>;
  gameLevel: Control<HTMLElement>;
  model: GameDataModel;

  constructor(parentNode: HTMLElement, protected state: GameState) {
    super(parentNode, 'div', style['global-wrapper']);

    this.header = new Control(this.node, 'div', style['global-header'], 'RS Selectors');
    this.gameHeader = new Control(this.node, 'div', style['game-header']);
    this.gameEditor = new Control(this.node, 'div', style['game-editor']);
    this.gameHtmlViewer = new Control(this.node, 'div', style['game-html-viewer']);
    this.gameLevel = new Control(this.node, 'div', style['game-level']);
    this.footer = new Control(this.node, 'div', style['global-footer']);
    const containerFooter = new FooterView(this.footer.node);

    this.model = new GameDataModel();
    this.model.loadJSON().then(() => {
      this.gameCycle();
    });
  }

  private gameCycle(): void {
    const levels = new LevelsView(this.gameLevel.node, this.model.getCategoriesData(), this.state);
    const gameHtmlViewerField = new GameHtmlView(this.gameHtmlViewer.node, this.model.getCategoriesData(), this.state);
    const gameHeaderField = new GameHeaderView(this.gameHeader.node, this.model.getCategoriesData(), this.state);
    const cssEditor = new CssEditorView(this.gameEditor.node, this.model.getCategoriesData(), this.state);

    cssEditor.onGetValue = (value) => {
      const gameData = this.model.getCategoriesData();
      const answer = this.model.getCategoriesData()[this.state.data.currentLevel].answer;
      const isCorrectAnswer = value === answer;

      if (!isCorrectAnswer) {
        cssEditor.removeAnimation();
        gameHtmlViewerField.removeAnimation();
        cssEditor.animateOut();
        gameHtmlViewerField.animateOut();
        return;
      }

      const state = this.state;
      const isNewLevelCompleted = !state.data.completeLevels.includes(state.data.currentLevel);
      if (isNewLevelCompleted) {
        state.data.completeLevels.push(state.data.currentLevel);
      }

      const isLastLevel = state.data.currentLevel + 1 >= gameData.length;
      const level = isLastLevel ? FIRST_LEVEL : state.data.currentLevel + 1;
      state.data = {
        ...state.data,
        currentLevel: level,
      };

      const isAllLevelsComplete = state.data.completeLevels.length === gameData.length;

      if (!isAllLevelsComplete) {
        gameHeaderField.animateRightQuestion().then(() => {
          this.destroyAppComponents(levels, cssEditor, gameHtmlViewerField, gameHeaderField);
        });
        return;
      }

      gameHeaderField.animateRightQuestion().then(() => {
        this.destroyAppComponents(levels, cssEditor, gameHtmlViewerField, gameHeaderField);
        new ModalPage(this.node);
      });
    };

    levels.onChooseLevel = (levelNumber) => {
      const state = this.state;
      state.data = { ...state.data, currentLevel: levelNumber };
      this.destroyAppComponents(levels, cssEditor, gameHtmlViewerField, gameHeaderField);
    };

    levels.onResetLevel = () => {
      const state = this.state;
      state.data.currentLevel = FIRST_LEVEL;
      state.data.completeLevels = [];
      state.data.completeLevelsWithHints = [];
      this.destroyAppComponents(levels, cssEditor, gameHtmlViewerField, gameHeaderField);
    };

    cssEditor.onHelp = () => {
      levels.buildLevels(this.model.getCategoriesData(), this.state);
    };
  }

  private destroyAppComponents(
    levels: LevelsView,
    cssEditor: CssEditorView,
    gameHtmlViewerField: GameHtmlView,
    gameHeaderField: GameHeaderView
  ): void {
    levels.destroy();
    cssEditor.destroy();
    gameHtmlViewerField.destroy();
    gameHeaderField.destroy();
    this.gameCycle();
  }
}
