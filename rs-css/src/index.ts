import { Application } from './application/application';
import { GameState } from './application/gameState';
import { InitialData } from './common/initialData';
import { initialState } from './common/constants';

import './style.css';

let data: InitialData;
try {
  data = InitialData.load();
} catch (e) {
  data = new InitialData(initialState);
}

const state = new GameState(data);

const app = new Application(document.body, state);

window.onbeforeunload = () => {
  new InitialData(state.data).save();
};
