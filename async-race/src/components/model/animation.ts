import Api from './api';
import { NumberCarAnimate, WinnerCar } from '../../types/index';
import View from '../view/view';
import {
  BUTTON_CLASSNAMES,
  BUTTON_RESET_CLASS_NAME,
  CAR_CLASS_NAME,
  CAR_WIDTH, FRAMES_PER_SECOND, MILLISECOND_TO_SECOND_RATIO, TIME_BETWEEN_RACE,
} from '../../types/constants';

class Animation extends Api {
  private animation: NumberCarAnimate;

  private allCars: string[];

  private timesFinishCar: WinnerCar[];

  private countFinishCar: number;

  private countAnimation: number;

  private countBrokenCar: number;

  constructor() {
    super();
    this.animation = {};
    this.allCars = [];
    this.timesFinishCar = [];
    this.countFinishCar = 0;
    this.countAnimation = 0;
    this.countBrokenCar = 0;
  }

  public animatePosition = async (event: Event) => {
    this.countAnimation += 1;
    const startButton = event.target as HTMLButtonElement;
    const idAnimateCar = startButton.getAttribute(BUTTON_CLASSNAMES.startButton) as string;
    startButton.disabled = true;
    const stopButton = document.querySelector(
      BUTTON_CLASSNAMES.getStopButtonId(idAnimateCar),
    ) as HTMLButtonElement;
    stopButton.disabled = false;
    let isCarWork = true;
    const isAnimated = this.countAnimation === 1;
    if (isAnimated) {
      this.view.disableButtonRace(true);
    }

    const node = document.querySelector(CAR_CLASS_NAME.getCarId(idAnimateCar)) as HTMLElement;
    const { velocity, distance } = await this.startEngine(Number(idAnimateCar));
    const currentX = node.offsetLeft;
    const framesCount = ((distance / velocity) / MILLISECOND_TO_SECOND_RATIO) * FRAMES_PER_SECOND;
    const deltaX = ((window.innerWidth - CAR_WIDTH) - node.offsetLeft) / framesCount;
    this.animation[idAnimateCar] = this.animateScreenDrive(node, currentX, deltaX, idAnimateCar);

    ({ success: isCarWork } = await this.drive(Number(idAnimateCar)));

    const isCarBroken = !isCarWork;
    if (isCarBroken) {
      window.cancelAnimationFrame(this.animation[idAnimateCar]);
    }
  };

  public animateScreenDrive = (
    node: HTMLElement,
    currentX: number,
    deltaX: number,
    id: string,
  ): number => {
    let currentXAnimation = currentX;
    const nodeAnimation = node;

    const step = () => {
      currentXAnimation += deltaX;
      nodeAnimation.style.transform = `translateX(${currentXAnimation}px)`;
      const isCarBeforeEndWindowWidth = currentXAnimation < (window.innerWidth - CAR_WIDTH);
      if (isCarBeforeEndWindowWidth) {
        this.animation[id] = window.requestAnimationFrame(step);
      }
    };

    this.animation[id] = window.requestAnimationFrame(step);

    return this.animation[id];
  };

  public animateStop = async (event: Event) => {
    this.countAnimation -= 1;
    const stopButton = event.target as HTMLElement;
    const idAnimateCar = stopButton.getAttribute(BUTTON_CLASSNAMES.stopButton) as string;
    const node = document.querySelector(CAR_CLASS_NAME.getCarId(idAnimateCar)) as HTMLElement;
    const stopCarButton = document.querySelector(
      BUTTON_CLASSNAMES.getStopButtonId(idAnimateCar),
    ) as HTMLButtonElement;
    const startCarButton = document.querySelector(
      BUTTON_CLASSNAMES.getStartButtonId(idAnimateCar),
    ) as HTMLButtonElement;
    stopCarButton.disabled = true;

    await this.stopEngine(Number(idAnimateCar));
    node.style.transform = 'translateX(0)';
    window.cancelAnimationFrame(this.animation[Number(idAnimateCar)]);
    startCarButton.disabled = false;
    const isAllCarsStop = this.countAnimation === 0;
    if (isAllCarsStop) {
      this.view.disableButtonRace(false);
    }
    this.controller.abort();
    this.controller = new AbortController();
  };

  public raceAll = async () => {
    this.allCars = [];
    this.timesFinishCar = [];
    const currentCarsId = document.querySelectorAll('.garage__car');
    currentCarsId.forEach((element) => this.allCars.push(element.getAttribute('data-car-id') as string));
    this.view.disableButtonRace(true);
    await Promise.race(
      this.allCars.map(async (id) => {
        this.countFinishCar = 0;

        View.disableStartStopButtonRace(true);
        const node = document.querySelector(CAR_CLASS_NAME.getCarId(id)) as HTMLElement;
        const { velocity, distance } = await this.startEngine(Number(id));
        const currentX = node.offsetLeft;
        const time = (distance / velocity) / MILLISECOND_TO_SECOND_RATIO;
        const framesCount = (
          (distance / velocity) / MILLISECOND_TO_SECOND_RATIO
        ) * FRAMES_PER_SECOND;
        const deltaX = ((window.innerWidth - CAR_WIDTH) - node.offsetLeft) / framesCount;
        this.animation[id] = this.animateScreenDrive(node, currentX, deltaX, id);

        const { success: isCarWork } = await this.drive(Number(id));
        if (isCarWork) {
          this.timesFinishCar.push({ time, id: Number(id), isSuccess: isCarWork });
        } else {
          window.cancelAnimationFrame(this.animation[id]);
        }
        this.createWinnerResult(this.timesFinishCar, this.allCars);
      }),
    );
  };

  public createWinnerResult = async (timesFinishCar: WinnerCar[], allCars: string[]) => {
    const buttonReset = document.querySelector(BUTTON_RESET_CLASS_NAME) as HTMLButtonElement;
    let filteredTimesFinishCar: WinnerCar[] = [];

    const isCarFinish = timesFinishCar.length !== 0;
    if (isCarFinish) {
      this.countFinishCar += 1;
    }
    const isCarFinishFirst = this.countFinishCar === 1;
    if (isCarFinishFirst) {
      filteredTimesFinishCar = timesFinishCar.filter((el) => el.isSuccess === true);
      buttonReset.disabled = false;
      this.countBrokenCar = 0;
    }
    const hasResultRace = filteredTimesFinishCar.length !== 0;
    if (isCarFinishFirst && hasResultRace) {
      const minTime = filteredTimesFinishCar.reduce(
        (previousResultWinnerCar, currentResultWinnerCar) => (
          previousResultWinnerCar.time < currentResultWinnerCar.time
            ? previousResultWinnerCar
            : currentResultWinnerCar
        ),
      );

      await this.saveWinner({ id: minTime.id, time: minTime.time });
      const { name } = await this.getCar(minTime.id);
      View.renderPopup(name, minTime.time);
      await this.winnersForStartPage();
    }
    const isCarBroken = this.countFinishCar === 0;
    if (isCarBroken) {
      this.countBrokenCar += 1;
    }
    const isAllCarsBroken = allCars.length === this.countBrokenCar;
    if (isCarBroken && isAllCarsBroken) {
      buttonReset.disabled = false;
      View.renderAllBrokenPopup();
      this.countBrokenCar = 0;
    }
  };

  public resetRace = async () => {
    this.allCars.map(async (id) => {
      const node = document.querySelector(CAR_CLASS_NAME.getCarId(id)) as HTMLElement;

      await this.stopEngine(Number(id));
      node.style.transform = 'translateX(0)';
      window.cancelAnimationFrame(this.animation[Number(id)]);
      this.controller.abort();
      this.controller = new AbortController();
      View.popupHidden();
    });
    const resetButton = document.querySelector(BUTTON_RESET_CLASS_NAME) as HTMLButtonElement;
    resetButton.disabled = true;
    setTimeout(() => this.view.disableButtonRace(false), TIME_BETWEEN_RACE);
    setTimeout(() => View.enableStartButton(false), TIME_BETWEEN_RACE);
  };
}

export default Animation;
