import { Application } from './application/application';
import { GameState } from './application/gameState';
import './style.css';

const state = new GameState({
  currentLevel: 0,
  completeLevels: [],
  completeLevelsWithHints: [],
});

const app = new Application(document.body, state);
