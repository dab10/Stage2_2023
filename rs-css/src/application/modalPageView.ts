import Control from '../common/control';

import style from './modalPageView.css';

export class ModalPage extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div');

    const modalPage = new Control<HTMLDialogElement>(
      this.node,
      'dialog',
      style['dialog'],
      'Congratulation! All levels complete!'
    );
    const modalPageButton = new Control<HTMLButtonElement>(modalPage.node, 'button', '', 'ok');
    modalPage.node.showModal();
    modalPageButton.node.onclick = () => {
      modalPage.node.close();
      modalPage.destroy();
    };
  }
}
