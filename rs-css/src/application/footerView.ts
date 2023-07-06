import Control from '../common/control';
import { FOOTER_START } from '../common/constants';

import style from './footerView.css';

export class FooterView extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', style['footer']);

    const footer = new Control(this.node);
    footer.node.outerHTML = FOOTER_START;
  }
}
