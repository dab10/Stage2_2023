import Control from './control';
import { ControlTag } from '../common/control';

interface ControlStyles {
  default: string;
  hidden: string;
}

export class AnimatedControl extends Control {
  private styles: ControlStyles;

  constructor(parentNode: HTMLElement | null, tagName: ControlTag, styles: ControlStyles, content = '') {
    super(parentNode, tagName, styles.default, content);
    this.styles = styles;
  }

  removeAnimation(): void {
    this.node.classList.remove(this.styles.hidden);
  }

  animateOut(): Promise<null> {
    return new Promise((resolve) => {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (this.node.classList.contains(this.styles.hidden)) {
            resolve(null);
          }
          this.node.classList.add(this.styles.hidden);
          this.node.ontransitionend = (e) => {
            if (e.target !== this.node) {
              return;
            }
            this.node.ontransitionend = null;
            resolve(null);
          };
        })
      );
    });
  }
}
