import Control from '../common/control';
import { GameData } from './gameDataModel';
import { GameState } from './gameState';
import { AnimatedControl } from '../common/animatedControl';

import style from './cssEditorView.css';
import { TEXT_APPEARANCE_TIME } from '../common/constants';

export class CssEditorView extends AnimatedControl {
  onGetValue!: (value: string) => void;
  onHelp!: () => void;

  constructor(parentNode: HTMLElement, gameData: GameData[], state: GameState) {
    super(parentNode, 'div', { default: style['container-editor'], hidden: style['shake'] });

    const formCSSEditor = new Control(this.node, 'form', style['container-editor']);
    const inputFieldCSSEditor = new Control<HTMLInputElement>(formCSSEditor.node, 'input', style['input-field']);
    inputFieldCSSEditor.node.type = 'text';
    inputFieldCSSEditor.node.title = 'Enter answer';
    const inputButtonCSSEditor = new Control<HTMLInputElement>(
      formCSSEditor.node,
      'input',
      [style['like-button'], style['transition']].join(' ')
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
      [style['help-button'], style['transition']].join(' '),
      'Help'
    );
    hintButton.node.onclick = () => {
      const correctAnswer = gameData[state.data.currentLevel].answer;

      correctAnswer.split('').forEach((item, i) => {
        setTimeout(() => (inputFieldCSSEditor.node.value += item), i * TEXT_APPEARANCE_TIME);
        setTimeout(
          () => (inputButtonCSSEditor.node.disabled = false),
          correctAnswer.split('').length * TEXT_APPEARANCE_TIME
        );
      });
      hintButton.node.disabled = true;
      inputButtonCSSEditor.node.disabled = true;
      const isLevelCompleteWithHint = !state.data.completeLevelsWithHints.includes(state.data.currentLevel);
      if (isLevelCompleteWithHint) {
        state.data.completeLevelsWithHints.push(state.data.currentLevel);
      }
      this.onHelp();
    };
  }
}
