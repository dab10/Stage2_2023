import { AnimatedControl } from '../common/animatedControl';
import Control from '../common/control';
import { GameData, HTMLDom } from './gameDataModel';
import { GameState } from './gameState';

import style from './gameHeaderView.css';

export class GameHeaderView extends Control {
  el!: AnimatedControl;
  constructor(parentNode: HTMLElement, gameData: GameData[], state: GameState) {
    super(parentNode);

    // const gameHeaderWrapper = new Control(this.node, 'div');
    // gameHeaderWrapper.node.innerHTML = gameData[state.data.currentLevel].HTMLCode;
    // const elTable = new Control(gameHeaderWrapper.node, 'div', 'table');
    // gameHeaderWrapper.node.append(div.style.asd);
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
    this.buildDom(gameData[state.data.currentLevel].HTMLDom, this.node);
  }

  private buildDom(arr: HTMLDom[], parentNode: HTMLElement) {
    if (!arr) {
      return;
    }
    arr.forEach((item) => {
      if (item.classNameAnimation) {
        const el = new AnimatedControl(parentNode, item.tagName, {
          default: [style[`${item.className}`], style[`${item.classNameAnimation}`], style['default']].join(' '),
          hidden: style['hide'],
        });
        el.node.id = item.id ? item.id : '';
        this.el = el;
      } else {
        const el = new Control(
          parentNode,
          item.tagName,
          item.className ? [style[`${item.className}`], style[`${item.classNameAnimation}`]].join(' ') : ''
        );
        el.node.id = item.id ? item.id : '';
        if (item.child) {
          this.buildDom(item.child, el.node);
        }
      }
    });
  }

  animateRightQuestion() {
    return this.el.animateOut();
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
