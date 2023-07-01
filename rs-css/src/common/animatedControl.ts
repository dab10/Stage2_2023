import Control from './control';

export class AnimatedControl extends Control {
  private styles: { default: string; hidden: string };

  constructor(
    parentNode: HTMLElement | null,
    tagName = 'div',
    styles: { default: string; hidden: string },
    content = ''
  ) {
    super(parentNode, tagName, styles.default, content);
    this.styles = styles;
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
            if (e.target !== this.node) return;
            this.node.ontransitionend = null;
            resolve(null);
          };
        })
      );
    });
  }
}
