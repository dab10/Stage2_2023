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

    const formCssEditor = new Control(this.node, 'form', style['container-editor']);
    const inputFieldCssEditor = new Control<HTMLInputElement>(formCssEditor.node, 'input', style['input-field']);
    inputFieldCssEditor.node.type = 'text';
    inputFieldCssEditor.node.title = 'Enter answer';
    const inputButtonCssEditor = new Control<HTMLInputElement>(
      formCssEditor.node,
      'input',
      [style['like-button'], style['transition']].join(' ')
    );
    inputButtonCssEditor.node.type = 'submit';
    inputButtonCssEditor.node.value = 'Enter';
    formCssEditor.node.onsubmit = (event) => {
      event.preventDefault();
      this.onGetValue(inputFieldCssEditor.node.value);
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
        setTimeout(() => (inputFieldCssEditor.node.value += item), i * TEXT_APPEARANCE_TIME);
        setTimeout(
          () => (inputButtonCssEditor.node.disabled = false),
          correctAnswer.split('').length * TEXT_APPEARANCE_TIME
        );
      });
      hintButton.node.disabled = true;
      inputButtonCssEditor.node.disabled = true;
      const isLevelCompleteWithHint = !state.data.completeLevelsWithHints.includes(state.data.currentLevel);
      if (isLevelCompleteWithHint) {
        state.data.completeLevelsWithHints.push(state.data.currentLevel);
      }
      this.onHelp();
    };
  }
}
