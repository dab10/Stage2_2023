import Control from '../common/control';
import { GameData } from './gameDataModel';
import { GameState } from './gameState';
import { AnimatedControl } from '../common/animatedControl';

import style from './cssEditorView.css';

export class cssEditorView extends AnimatedControl {
  onGetValue!: (value: string) => void;
  onHelp!: () => void;

  constructor(parentNode: HTMLElement, gameData: GameData[], state: GameState) {
    super(parentNode, 'div', { default: '', hidden: style['shake'] });

    const formCSSEditor = new Control(this.node, 'form');
    const inputFieldCSSEditor = new Control<HTMLInputElement>(formCSSEditor.node, 'input');
    inputFieldCSSEditor.node.type = 'text';
    const inputButtonCSSEditor = new Control<HTMLInputElement>(formCSSEditor.node, 'input');
    inputButtonCSSEditor.node.type = 'submit';
    inputButtonCSSEditor.node.value = 'enter';
    formCSSEditor.node.onsubmit = (event) => {
      event.preventDefault();
      this.onGetValue(inputFieldCSSEditor.node.value);
    };

    const hintButton = new Control<HTMLButtonElement>(this.node, 'button', style['help_button'], 'Help');
    hintButton.node.onclick = () => {
      const correctAnswer = gameData[state.data.currentLevel].answer;
      let res: string;
      correctAnswer.split('').forEach((item, i) => {
        setTimeout(() => (inputFieldCSSEditor.node.value += item), i * 10);
        setTimeout(() => (inputButtonCSSEditor.node.disabled = false), correctAnswer.split('').length * 10);
      });
      hintButton.node.disabled = true;
      inputButtonCSSEditor.node.disabled = true;
      state.data.completeLevelsWithHints.push(state.data.currentLevel);
      console.log(state.data);
      this.onHelp();
    };
  }
}
