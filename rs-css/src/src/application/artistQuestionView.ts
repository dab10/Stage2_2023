import Control from '../common/control';
import { AnimatedControl } from './animatedControl';
import { IArtistsQuestionData, IPicturesQuestionData } from './quizDataModel';

import style from './pictureQuestionView.css';

export class ArtistQuestionView extends AnimatedControl {
  onAnswer!: (index: number) => void;

  constructor(parentNode: HTMLElement, questionData: IArtistsQuestionData) {
    super(parentNode, 'div', { default: style['wrapper'], hidden: style['hide'] });
    this.quickOut();

    const question = new Control(this.node, 'div', '', 'Вопрос?');
    const img = new Image(200, 200);
    img.src = questionData.artistImgUrl;
    question.node.append(img);
    const answerButton = questionData.answers.map((item, i) => {
      const button = new Control(this.node, 'button', '', item.toString());
      button.node.onclick = () => {
        this.onAnswer(i);
      };
    });
  }
}
