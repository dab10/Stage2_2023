import { AnimatedControl } from '../common/animatedControl';
import Control from '../common/control';
import { GameData, HtmlDom } from './gameDataModel';
import { GameState } from './gameState';
import { START_NEST_LEVEL } from '../common/constants';

import style from './gameHeaderView.css';

export class GameHeaderView extends Control {
  element: Array<AnimatedControl>;
  onmouseover!: () => void;
  onmouseout!: () => void;

  constructor(parentNode: HTMLElement, gameData: GameData[], state: GameState) {
    super(parentNode);

    this.element = [];

    const elementTable = new Control(this.node, 'div', 'table');
    this.buildDom(gameData[state.data.currentLevel].htmlDom, elementTable.node, START_NEST_LEVEL);
  }

  private buildDom(htmlDom: HtmlDom[], parentNode: HTMLElement, nestLevel: number) {
    if (!htmlDom) {
      return;
    }
    const currentNestLevel = nestLevel + 1;
    htmlDom.forEach((item) => {
      if (item.classNameAnimation) {
        const element = new AnimatedControl(parentNode, item.tagName, {
          default: [
            style[`${item.className}`],
            style[`${item.classNameAnimation}`],
            style['default'],
            style['tooltip'],
          ].join(' '),
          hidden: style['hide'],
        });
        element.node.id = item.id ? item.id : '';
        this.element.push(element);

        const className = item.className ? ` class="${item.className}"` : '';
        const idName = item.id ? ` id="${item.id}"` : '';
        const tooltip = new Control(
          element.node,
          'span',
          style['tooltiptext'],
          `<${item.tagName}` + className + idName + `></${item.tagName}>`
        );

        if (item.child) {
          this.buildDom(item.child, element.node, currentNestLevel);
        }
      } else {
        const el = new Control(
          parentNode,
          item.tagName,
          [style[`${item.className}`], style[`tooltip${currentNestLevel}`]].join(' ')
        );
        el.node.id = item.id ? item.id : '';
        const className = item.className ? ` class="${item.className}"` : '';
        const idName = item.id ? ` id="${item.id}"` : '';
        if (!el.node.classList.contains('withChild')) {
          const tooltip = new Control(
            el.node,
            'span',
            [style['child'], style[`tooltiptext${currentNestLevel}`]].join(' '),
            `<${item.tagName}` + className + idName + `></${item.tagName}>`
          );
        }

        if (item.child) {
          this.buildDom(item.child, el.node, currentNestLevel);
        }
      }
    });
  }

  animateRightQuestion() {
    return Promise.all(this.element.map((item) => item.animateOut()));
  }
}
