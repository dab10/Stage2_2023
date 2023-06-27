import Control from '../common/control';

type IQuizResults = Array<boolean>;

export class GameOverPage extends Control {
  onNext!: () => void;
  onHome!: () => void;

  constructor(parentNode: HTMLElement, results: IQuizResults = []) {
    super(parentNode);

    const resultIndicator = new Control(this.node, 'div', '', '');
    resultIndicator.node.textContent = results.map((item) => (item ? '+' : '-')).join(' ');

    const nextButton = new Control(this.node, 'button', '', 'next');
    nextButton.node.onclick = () => {
      this.onNext();
    };

    const homeButton = new Control(this.node, 'button', '', 'home');
    homeButton.node.onclick = () => {
      this.onHome();
    };
  }
}
