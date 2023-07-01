import { Application } from './application/application';
import { GameState } from './application/gameState';
import { initialState } from './common/constants';

import './style.css';

const state = new GameState(initialState);

const app = new Application(document.body, state);
