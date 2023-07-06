import { AnimatedControl } from '../common/animatedControl';
import Control from '../common/control';
import { GameData, HtmlDom } from './gameDataModel';
import { GameState } from './gameState';

import style from './gameHeaderView.css';

export class GameHeaderView extends Control {
  el: Array<AnimatedControl>;
  onmouseover!: () => void;
  onmouseout!: () => void;
  constructor(parentNode: HTMLElement, gameData: GameData[], state: GameState) {
    super(parentNode);
    this.el = [];

    const elTable = new Control(this.node, 'div', 'table');
    const i = 0;
    this.buildDom(gameData[state.data.currentLevel].htmlDom, elTable.node, i);
  }

  private buildDom(arr: HtmlDom[], parentNode: HTMLElement, i: number) {
    if (!arr) {
      return;
    }
    i++;
    arr.forEach((item) => {
      if (item.classNameAnimation) {
        const el = new AnimatedControl(parentNode, item.tagName, {
          default: [
            style[`${item.className}`],
            style[`${item.classNameAnimation}`],
            style['default'],
            style['tooltip'],
          ].join(' '),
          hidden: style['hide'],
        });
        el.node.id = item.id ? item.id : '';
        this.el.push(el);

        const className = item.className ? ` class="${item.className}"` : '';
        const idName = item.id ? ` id="${item.id}"` : '';
        const tooltip = new Control(
          el.node,
          'span',
          style['tooltiptext'],
          `<${item.tagName}` + className + idName + `></${item.tagName}>`
        );

        if (item.child) {
          this.buildDom(item.child, el.node, i);
        }
      } else {
        const el = new Control(parentNode, item.tagName, [style[`${item.className}`], style[`tooltip${i}`]].join(' '));
        el.node.id = item.id ? item.id : '';
        const className = item.className ? ` class="${item.className}"` : '';
        const idName = item.id ? ` id="${item.id}"` : '';
        if (!el.node.classList.contains('withChild')) {
          const tooltip = new Control(
            el.node,
            'span',
            [style['child'], style[`tooltiptext${i}`]].join(' '),
            `<${item.tagName}` + className + idName + `></${item.tagName}>`
          );
        }

        if (item.child) {
          this.buildDom(item.child, el.node, i);
        }
      }
    });
  }

  animateRightQuestion() {
    return Promise.all(this.el.map((item) => item.animateOut()));
  }
}
