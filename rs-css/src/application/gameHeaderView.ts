import { AnimatedControl } from '../common/animatedControl';
import Control from '../common/control';
import { GameData, HTMLDom } from './gameDataModel';
import { GameState } from './gameState';

import style from './gameHeaderView.css';

export class GameHeaderView extends Control {
  el: Array<AnimatedControl>;
  onmouseover!: () => void;
  onmouseout!: () => void;
  constructor(parentNode: HTMLElement, gameData: GameData[], state: GameState) {
    super(parentNode);
    this.el = [];

    console.log(gameData[state.data.currentLevel].HTMLCode.split('\r\n').slice(1, -1));
    // gameData[state.data.currentLevel].HTMLDom.forEach((item) => {
    //   const el = new Control(this.node, this.findElName(item), this.findSelector(item))
    // })
    // gameData[state.data.currentLevel].HTMLCode.split('\r\n')
    //   .slice(1, -1)
    //   .forEach((item, i, arr) => {
    //     if (item.includes('class=')) {
    //       const el = new Control(elTable.node, this.findElName(item), this.findSelector(item));
    //       if (!item.endsWith('/>') && !item.startsWith('</')) {
    //         new Control(el.node, this.findElName(arr[i + 1]), this.findSelector(item));
    //         return;
    //       }
    //     } else if (item.includes('id=')) {
    //       const el = new Control(elTable.node, this.findElName(item));
    //       el.node.id = this.findSelector(item);
    //     } else if (item.startsWith('</') || !arr[i - 1].endsWith('/>')) {
    //       return;
    //     } else {
    //       new Control(elTable.node, this.findElName(item), this.findSelector(item));
    //     }
    //   });
    const elTable = new Control(this.node, 'div', 'table');
    const i = 0;
    this.buildDom(gameData[state.data.currentLevel].HTMLDom, elTable.node, i);
  }

  private buildDom(arr: HTMLDom[], parentNode: HTMLElement, i: number) {
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

        // if (el.node.classList.contains('child')) {
        //   el.node.onmouseover = () => {
        //     console.log(el.node.previousElementSibling);
        //     el.node.previousElementSibling?.classList.add('displayNone');
        //     el.node.previousElementSibling?.classList.remove('tooltiptext');
        //     el.node.previousElementSibling?.classList.remove('tooltiptext1');
        //   };

        //   el.node.onmouseout = () => {
        //     el.node.previousElementSibling?.classList.remove('displayNone');
        //     el.node.previousElementSibling?.classList.add('tooltiptext');
        //   };
        // }

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

          // if (el.node.classList.contains('child')) {
          //   el.node.onmouseover = () => {
          //     console.log(el.node.previousElementSibling);
          //     el.node.previousElementSibling?.classList.add('displayNone');
          //     el.node.previousElementSibling?.classList.remove('tooltiptext1');
          //     el.node.previousElementSibling?.classList.remove('tooltiptext');
          //   };

          //   el.node.onmouseout = () => {
          //     el.node.previousElementSibling?.classList.remove('displayNone');
          //     el.node.previousElementSibling?.classList.add('tooltiptext1');
          //     el.node.previousElementSibling?.classList.add('tooltiptext');
          //   };
          // }
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

  // private findSelector(str: string) {
  //   const matches = str.split('"');
  //   return matches[1] ? matches[1] : '';
  // }

  // private findElName(str: string) {
  //   const matches = str.slice(1, -1).split(' ');
  //   return matches[0] ? matches[0] : '';
  // }
}
