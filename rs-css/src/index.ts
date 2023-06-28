import { Application } from './application/application';
import { GameState } from './application/keyboardState';
import './style.css';

const state = new GameState({
  startLevel: 0,
  completeLevels: [],
  completeLevelsWithHints: [],
});

const app = new Application(document.body, state);
