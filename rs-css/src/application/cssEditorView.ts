import Control from '../common/control';
import { AnimatedControl } from '../common/animatedControl';

import style from './cssEditorView.css';

export class cssEditorView extends AnimatedControl {
  onGetValue!: (value: string) => void;

  constructor(parentNode: HTMLElement) {
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
  }
}
