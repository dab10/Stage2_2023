import Api from './api';
import { NumberCarAnimate, WinnerCar } from '../../types/index';
import View from '../view/view';

class Animation extends Api {
  private animation: NumberCarAnimate;

  private allCars: string[];

  private timesFinishCar: WinnerCar[];

  private count: number;

  private countAnimation: number;

  private countBrokenCar: number;

  private carWidth: number;

  private timeBetweenRAce: number;

  constructor() {
    super();
    this.animation = {};
    this.allCars = [];
    this.timesFinishCar = [];
    this.count = 0;
    this.countAnimation = 0;
    this.countBrokenCar = 0;
    this.carWidth = 140;
    this.timeBetweenRAce = 3000;
  }

  public animatePosition = async (e: Event) => {
    if (this.count < 1) this.count = 0;
    this.countAnimation += 1;
    const id = (e.target as HTMLButtonElement).getAttribute('data-start-id');
    (e.target as HTMLButtonElement).disabled = true;
    const stopButton = document.querySelector(`[data-stop-id="${id}"]`) as HTMLButtonElement;
    stopButton.disabled = false;

    if (this.countAnimation === 1) this.view.disableButtonRace(true);
    if (id) {
      const node = document.querySelector(`[data-car-animation-id="${id}"]`) as HTMLElement;
      const { velocity, distance } = await this.startEngine(Number(id));
      const currentX: number = node.offsetLeft;
      const framesCount = ((distance / velocity) / 1000) * 60;
      const dX = ((window.innerWidth - this.carWidth) - node.offsetLeft) / framesCount;
      this.animation[id] = this.animationScreenDrive(node, currentX, dX, id);

      const { success } = await this.drive(Number(id));
      if (!success) window.cancelAnimationFrame(this.animation[id]);
    }
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
      if (currentXAnimation < (window.innerWidth - this.carWidth)) {
        this.animation[id] = window.requestAnimationFrame(step);
      }
    };

    this.animation[id] = window.requestAnimationFrame(step);
    return this.animation[id];
  };

  public animateStop = async (e: Event) => {
    this.countAnimation -= 1;
    if (this.count < 1) this.count = 1;
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
        this.count = 0;

        View.disableStartStopButtonRace(true);
        const node = document.querySelector(`[data-car-animation-id="${id}"]`) as HTMLElement;
        const { velocity, distance } = await this.startEngine(Number(id));
        const currentX: number = node.offsetLeft;
        const time = (distance / velocity) / 1000;
        const framesCount = ((distance / velocity) / 1000) * 60;
        const dX = ((window.innerWidth - this.carWidth) - node.offsetLeft) / framesCount;
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
      this.count += 1;
      if (this.count === 1) {
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
    if (this.count === 0) {
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
    setTimeout(() => this.view.disableButtonRace(false), this.timeBetweenRAce);
    setTimeout(() => View.enableStartButton(false), this.timeBetweenRAce);
  };
}

export default Animation;
