import Control from '../common/control';
import { AnimatedControl } from './animatedControl';
// import { IArtistQuestionData } from './IArtistQuestionData';
import { ArtistQuestionView } from './artistQuestionView';
import { PictureQuestionView } from './pictureQuestionView';
import { IArtistsQuestionData, IPicturesQuestionData } from './quizDataModel';
import { IQuizSettings } from './settingsPage';
import { SoundManager } from './soundManager';
import { Timer } from './timer';

interface IQuizOptions {
  gameName: string;
  categoryIndex: number;
  settings: IQuizSettings;
}

type IQuizResults = Array<boolean>;

export class GameFieldPage<QuestionDataType> extends Control {
  onBack!: () => void;
  onHome!: () => void;
  onFinish!: (results?: IQuizResults) => void;
  progressIndicator: Control<HTMLElement>;
  results: IQuizResults;
  answersIndicator: Control<HTMLElement>;
  timer: Timer;
  gameOptions: IQuizOptions;
  private GameQuestionConstructor: IQuestionViewConstructor<QuestionDataType>;

  constructor(
    parentNode: HTMLElement,
    GameQuestionConstructor: IQuestionViewConstructor<QuestionDataType>,
    gameOption: IQuizOptions,
    questionsData: Array<QuestionDataType>
  ) {
    super(parentNode);
    this.GameQuestionConstructor = GameQuestionConstructor;
    console.log(gameOption);
    this.gameOptions = gameOption;
    const header = new Control(this.node, 'h1', '', `${gameOption.gameName} - ${gameOption.categoryIndex}`);

    const backButton = new Control(this.node, 'button', '', 'back');
    backButton.node.onclick = () => {
      this.onBack();
    };

    const homeButton = new Control(this.node, 'button', '', 'home');
    homeButton.node.onclick = () => {
      this.onHome();
    };

    this.timer = new Timer(this.node);
    this.progressIndicator = new Control(this.node, 'div', '', '');
    this.answersIndicator = new Control(this.node, 'div', '', '');

    this.results = [];

    this.questionCycle(gameOption.gameName, questionsData, 0, () => {
      this.onFinish(this.results);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private questionCycle(gameName: string, questions: Array<any>, index: number, onFinish: () => void) {
    if (index >= questions.length) {
      onFinish();
      return;
    }
    this.progressIndicator.node.textContent = `${index + 1} / ${questions.length}`;
    this.answersIndicator.node.textContent = this.results.map((item) => (item ? '+' : '-')).join(' ');
    if (this.gameOptions.settings.timeEnable) {
      this.timer.start(this.gameOptions.settings.time);
      this.timer.onTimeout = () => {
        question.destroy();
        this.results.push(false);
        SoundManager.fail();
        this.questionCycle(gameName, questions, index + 1, onFinish);
      };
    }

    // if (gameName === 'artists') {
    //   //const question = new ArtistQuestionView(this.node, questions[index]);
    //   const question = new this.GameQuestionConstructor(this.node, questions[index]);
    //   _quest = question;
    //   question.onAnswer = (answerIndex) => {
    //     question.destroy();
    //     const result = answerIndex === questions[index].correctAnswerIndex;
    //     if (result) {
    //       SoundManager.ok();
    //     } else {
    //       SoundManager.fail();
    //     }
    //     this.results.push(result);
    //     this.questionCycle(gameName, questions, index + 1, onFinish);
    //   };
    // } else if (gameName === 'pictures') {

    // const question = new PictureQuestionView(this.node, questions[index]);
    const question = new this.GameQuestionConstructor(this.node, questions[index]);
    question.animateIn();
    question.onAnswer = (answerIndex) => {
      question.animateOut().then(() => {
        question.destroy();
        const result = answerIndex === questions[index].correctAnswerIndex;
        if (result) {
          SoundManager.ok();
        } else {
          SoundManager.fail();
        }
        this.results.push(result);
        this.questionCycle(gameName, questions, index + 1, onFinish);
      });
    };
    // } else {
    //   throw new Error('Game type is not exists');
    // }
  }

  destroy() {
    this.timer.stop();
    super.destroy();
  }
}

interface IQuestionView {
  onAnswer: (index: number) => void;
}

interface IQuestionViewConstructor<DataType> {
  new (parentNode: HTMLElement, data: DataType): IQuestionView & AnimatedControl;
}
