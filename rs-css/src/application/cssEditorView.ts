import Control from '../common/control';
import { GameData } from './gameDataModel';
import { GameState } from './gameState';
import { AnimatedControl } from '../common/animatedControl';

import style from './cssEditorView.css';

export class cssEditorView extends AnimatedControl {
  onGetValue!: (value: string) => void;
  onHelp!: () => void;

  constructor(parentNode: HTMLElement, gameData: GameData[], state: GameState) {
    super(parentNode, 'div', { default: style['container_editor'], hidden: style['shake'] });

    const formCSSEditor = new Control(this.node, 'form', style['container_editor']);
    const inputFieldCSSEditor = new Control<HTMLInputElement>(formCSSEditor.node, 'input', style['input_field']);
    inputFieldCSSEditor.node.type = 'text';
    inputFieldCSSEditor.node.title = 'Enter answer';
    const inputButtonCSSEditor = new Control<HTMLInputElement>(
      formCSSEditor.node,
      'input',
      [style['like_button'], style['transition']].join(' ')
    );
    inputButtonCSSEditor.node.type = 'submit';
    inputButtonCSSEditor.node.value = 'Enter';
    formCSSEditor.node.onsubmit = (event) => {
      event.preventDefault();
      this.onGetValue(inputFieldCSSEditor.node.value);
    };

    const hintButton = new Control<HTMLButtonElement>(
      this.node,
      'button',
      [style['help_button'], style['transition']].join(' '),
      'Help'
    );
    hintButton.node.onclick = () => {
      const correctAnswer = gameData[state.data.currentLevel].answer;
      let res: string;
      correctAnswer.split('').forEach((item, i) => {
        setTimeout(() => (inputFieldCSSEditor.node.value += item), i * 10);
        setTimeout(() => (inputButtonCSSEditor.node.disabled = false), correctAnswer.split('').length * 10);
      });
      hintButton.node.disabled = true;
      inputButtonCSSEditor.node.disabled = true;
      if (!state.data.completeLevelsWithHints.includes(state.data.currentLevel)) {
        state.data.completeLevelsWithHints.push(state.data.currentLevel);
      }
      this.onHelp();
    };
  }
}
