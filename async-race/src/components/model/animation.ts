import Api from './api';
import { NumberCarAnimate, WinnerCar } from '../../types/index';
import View from '../view/view';
import { CAR_WIDTH, FRAMES_PER_SECOND, TIME_BETWEEN_RACE } from '../../types/constants';

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

  public animatePosition = async (e: Event) => {
    if (this.countFinishCar < 1) this.countFinishCar = 0;
    this.countAnimation += 1;
    const startButton = e.target as HTMLButtonElement;
    const id = startButton.getAttribute('data-start-id');
    startButton.disabled = true;
    const stopButton = document.querySelector(`[data-stop-id="${id}"]`) as HTMLButtonElement;
    stopButton.disabled = false;

    if (this.countAnimation === 1) this.view.disableButtonRace(true);
    let success = true;
    if (id) {
      const node = document.querySelector(`[data-car-animation-id="${id}"]`) as HTMLElement;
      const { velocity, distance } = await this.startEngine(Number(id));
      const currentX = node.offsetLeft;
      const framesCount = ((distance / velocity) / 1000) * FRAMES_PER_SECOND;
      const dX = ((window.innerWidth - CAR_WIDTH) - node.offsetLeft) / framesCount;
      this.animation[id] = this.animationScreenDrive(node, currentX, dX, id);

      ({ success } = await this.drive(Number(id)));
    }
    if (!success && id) window.cancelAnimationFrame(this.animation[id]);
  };

  public animationScreenDrive = (
    node: HTMLElement,
    currentX: number,
    dX: number,
    id: string,
  ): number => {
    let currentXAnimation = currentX;
    const nodeAnimation = node;
    const step = () => {
      currentXAnimation += dX;
      nodeAnimation.style.transform = `translateX(${currentXAnimation}px)`;
      if (currentXAnimation < (window.innerWidth - CAR_WIDTH)) {
        this.animation[id] = window.requestAnimationFrame(step);
      }
    };

    this.animation[id] = window.requestAnimationFrame(step);
    return this.animation[id];
  };

  public animateStop = async (e: Event) => {
    this.countAnimation -= 1;
    if (this.countFinishCar < 1) this.countFinishCar = 1;
    const id = (e.target as HTMLElement).getAttribute('data-stop-id');
    const node = document.querySelector(`[data-car-animation-id="${id}"]`) as HTMLElement;
    const stopButton = document.querySelector(`[data-stop-id="${id}"]`) as HTMLButtonElement;
    const startButton = document.querySelector(`[data-start-id="${id}"]`) as HTMLButtonElement;
    stopButton.disabled = true;

    await this.stopEngine(Number(id));
    node.style.transform = 'translateX(0)';
    window.cancelAnimationFrame(this.animation[Number(id)]);
    startButton.disabled = false;
    if (this.countAnimation === 0) this.view.disableButtonRace(false);
    this.controller.abort();
    this.controller = new AbortController();
  };

  public raceAll = async () => {
    this.allCars = [];
    this.timesFinishCar = [];
    const currentCarsId = document.querySelectorAll('.garage__car');
    currentCarsId.forEach((el) => this.allCars.push(el.getAttribute('data-car-id') as string));
    this.view.disableButtonRace(true);
    await Promise.race(
      this.allCars.map(async (id) => {
        this.countFinishCar = 0;

        View.disableStartStopButtonRace(true);
        const node = document.querySelector(`[data-car-animation-id="${id}"]`) as HTMLElement;
        const { velocity, distance } = await this.startEngine(Number(id));
        const currentX = node.offsetLeft;
        const time = (distance / velocity) / 1000;
        const framesCount = ((distance / velocity) / 1000) * FRAMES_PER_SECOND;
        const dX = ((window.innerWidth - CAR_WIDTH) - node.offsetLeft) / framesCount;
        this.animation[id] = this.animationScreenDrive(node, currentX, dX, id);

        const { success } = await this.drive(Number(id));
        if (!success) {
          window.cancelAnimationFrame(this.animation[id]);
        }
        if (success) this.timesFinishCar.push({ time, id: Number(id), isSuccess: success });
        this.winnerResult(this.timesFinishCar, this.allCars);
      }),
    );
  };

  public winnerResult = async (timesFinishCar: WinnerCar[], allCars: string[]) => {
    const buttonReset = document.querySelector('.controls__button-reset') as HTMLButtonElement;

    if (timesFinishCar.length !== 0) {
      this.countFinishCar += 1;
      if (this.countFinishCar === 1) {
        const filteredTimesFinishCar = timesFinishCar.filter((el) => el.isSuccess === true);
        if (filteredTimesFinishCar.length !== 0) {
          const minTime = filteredTimesFinishCar.reduce((acc, curr) => (
            acc.time < curr.time ? acc : curr
          ));

          await this.saveWinner({ id: minTime.id, time: minTime.time });
          const { name } = await this.getCar(minTime.id);
          View.renderPopup(name, minTime.time);
          await this.winnersForStartPage();
        }
        buttonReset.disabled = false;
        this.countBrokenCar = 0;
      }
    }
    if (this.countFinishCar === 0) {
      this.countBrokenCar += 1;
      if (allCars.length === this.countBrokenCar) {
        buttonReset.disabled = false;
        View.renderAllBrokenPopup();
        this.countBrokenCar = 0;
      }
    }
  };

  public raceReset = async () => {
    this.allCars.map(async (id) => {
      const node = document.querySelector(`[data-car-animation-id="${id}"]`) as HTMLElement;

      await this.stopEngine(Number(id));
      node.style.transform = 'translateX(0)';
      window.cancelAnimationFrame(this.animation[Number(id)]);
      this.controller.abort();
      this.controller = new AbortController();
      View.popupHidden();
    });
    (document.querySelector('.controls__button-reset') as HTMLButtonElement).disabled = true;
    setTimeout(() => this.view.disableButtonRace(false), TIME_BETWEEN_RACE);
    setTimeout(() => View.enableStartButton(false), TIME_BETWEEN_RACE);
  };
}

export default Animation;
