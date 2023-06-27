import Control from '../common/control';

export class LevelsView extends Control {
  onChooseLevel!: (index: number) => void;

  constructor(parentNode: HTMLElement) {
    super(parentNode);

    const questionData = {
      levelNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };

    const chooseLevelButton = questionData.levelNumber.map((item, i) => {
      const button = new Control(this.node, 'button', '', (i + 1).toString());
      button.node.onclick = () => {
        this.onChooseLevel(i);
      };
    });
  }
}
