import { Application } from './application/application';
import { GameState } from './application/gameState';
import { InitialData } from './common/initialData';
import { INITIAL_STATE } from './common/constants';

import './style.css';

let data: InitialData;
try {
  data = InitialData.load();
} catch {
  data = new InitialData(INITIAL_STATE);
}

const state = new GameState(data);

const app = new Application(document.body, state);

window.onbeforeunload = () => {
  new InitialData(state.data).save();
};
