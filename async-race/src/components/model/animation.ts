import Api from './api';
import { NumberCarAnimate, WinnerCar } from '../../types/index';
import View from '../view/view';

class Animation extends Api {
  private animation: NumberCarAnimate;

  private allCars: string[];

  private timesFinishCar: WinnerCar[];

  private res: any[];

  constructor() {
    super();
    this.animation = {};
    this.allCars = [];
    this.timesFinishCar = [];
    this.res = [];
  }

  public animatePosition = async (e: Event) => {
    const id = (e.target as HTMLButtonElement).getAttribute('data-start-id');
    (e.target as HTMLButtonElement).disabled = true;
    const stopButton = document.querySelector(`[data-stop-id="${id}"]`) as HTMLButtonElement;
    stopButton.disabled = false;
    if (id) {
      const node = document.querySelector(`[data-car-animation-id="${id}"]`) as HTMLElement;
      const { velocity, distance } = await this.startEngine(Number(id));
      const currentX: number = node.offsetLeft;

      const framesCount = ((distance / velocity) / 1000) * 60;
      console.log(velocity);
      const dX = ((window.innerWidth - 140) - node.offsetLeft) / framesCount;
      this.animation[id] = this.animationScreen(node, currentX, dX, id);

      const { success } = await this.drive(Number(id));
      if (!success) window.cancelAnimationFrame(this.animation[id]);
    }
  };

  public animationScreen = (
    node: HTMLElement,
    currentX: number,
    dX: number,
    id: string,
  ): number => {
    let currentXAnimation = currentX;
    const nodeAnimation = node;
    const tick = () => {
      currentXAnimation += dX;

      nodeAnimation.style.transform = `translateX(${currentXAnimation}px)`;

      if (currentXAnimation < (window.innerWidth - 140)) {
        this.animation[id] = window.requestAnimationFrame(tick);
      }
    };

    this.animation[id] = window.requestAnimationFrame(tick);
    return this.animation[id];
  };

  public animateStop = async (e: Event) => {
    const id = (e.target as HTMLElement).getAttribute('data-stop-id');
    const node = document.querySelector(`[data-car-animation-id="${id}"]`) as HTMLElement;
    const stopButton = document.querySelector(`[data-stop-id="${id}"]`) as HTMLButtonElement;
    const startButton = document.querySelector(`[data-start-id="${id}"]`) as HTMLButtonElement;
    await this.stopEngine(Number(id));
    node.style.transform = 'translateX(0)';
    window.cancelAnimationFrame(this.animation[Number(id)]);
    startButton.disabled = false;
    stopButton.disabled = true;
    this.controller.abort();
    this.controller = new AbortController();
  };

  public raceAll = async () => {
    this.allCars = [];
    this.timesFinishCar = [];
    const currentCarsId = document.querySelectorAll('.garage__car');
    currentCarsId.forEach((el) => this.allCars.push(el.getAttribute('data-car-id') as string));
    console.log(this.allCars);

    // const race2 = async (id: string, time: number) => {
    //   const { success } = await this.drive(Number(id));
    //   if (!success) {
    //     window.cancelAnimationFrame(this.animation[id]);
    //     this.timesFinishCar.push({ id1: id, success1: success });
    //   } else if (success) {
    //     this.timesFinishCar.push({ time1: time, id1: id, success1: success });
    //   }
    // };

    await Promise.allSettled(
      this.allCars.map(async (id) => {
        const startButton = document.querySelector(`[data-start-id="${id}"]`) as HTMLButtonElement;
        const stopButton = document.querySelector(`[data-stop-id="${id}"]`) as HTMLButtonElement;
        stopButton.disabled = false;
        startButton.disabled = true;
        const node = document.querySelector(`[data-car-animation-id="${id}"]`) as HTMLElement;
        const { velocity, distance } = await this.startEngine(Number(id));
        const currentX: number = node.offsetLeft;
        const time = (distance / velocity) / 1000;
        const framesCount = ((distance / velocity) / 1000) * 60;
        console.log(velocity, id);
        const dX = ((window.innerWidth - 140) - node.offsetLeft) / framesCount;
        this.animation[id] = this.animationScreen(node, currentX, dX, id);

        const { success } = await this.drive(Number(id));
        if (!success) {
          window.cancelAnimationFrame(this.animation[id]);
          this.timesFinishCar.push({ time, id: Number(id), isSuccess: success });
        }
        if (success) this.timesFinishCar.push({ time, id: Number(id), isSuccess: success });

        // await this.drive(Number(id))
        //   .then(({ success }) => {
        //     if (success) this.timesFinishCar.push({ time1: time, id1: id, success1: success });
        //   });
      }),
    );

    // await Promise.any(

    // );

    // if (this.timesFinishCar[0].success1 === false) {
    //   this.allCars.splice(this.allCars.indexOf(this.timesFinishCar[0].id1 as string), 1);
    //   this.timesFinishCar.splice(0, 1);

    //   await Promise.any(
    //     this.allCars.map(async (id) => {
    //       const { success } = await this.drive(Number(id));
    //       if (!success) {
    //         this.timesFinishCar.push({ id1: id, success1: success });
    //       }
    //       if (success) this.timesFinishCar.push({ id1: id });
    //     }),
    //   );
    // }

    console.log(this.allCars);
    console.log(this.timesFinishCar);
    this.winnerResult(this.timesFinishCar);
    // setTimeout(() => this.winnerResult(this.timesFinishCar), 3000);
  };

  public winnerResult = async (timesFinishCar: WinnerCar[]) => {
    console.log(timesFinishCar);
    const filteredTimesFinishCar = timesFinishCar.filter((el) => el.isSuccess === true);
    console.log(filteredTimesFinishCar);
    if (filteredTimesFinishCar.length !== 0) {
      const minTime = filteredTimesFinishCar.reduce((acc, curr) => (
        acc.time < curr.time ? acc : curr
      ));
      console.log(minTime);

      await this.saveWinner({ id: minTime.id, time: minTime.time });
      const { name } = await this.getCar(minTime.id);
      View.renderPopup(name, minTime.time);
      await this.winnersForStartPage();
    }
  };

  public raceReset = async () => {
    const popup = document.querySelector('.popup') as HTMLElement;
    popup.classList.add('hidden');
    this.allCars.map(async (id) => {
      const node = document.querySelector(`[data-car-animation-id="${id}"]`) as HTMLElement;
      const stopButton = document.querySelector(`[data-stop-id="${id}"]`) as HTMLButtonElement;
      const startButton = document.querySelector(`[data-start-id="${id}"]`) as HTMLButtonElement;
      await this.stopEngine(Number(id));
      node.style.transform = 'translateX(0)';
      window.cancelAnimationFrame(this.animation[Number(id)]);
      startButton.disabled = false;
      stopButton.disabled = true;
      this.controller.abort();
      this.controller = new AbortController();
    });
  };

  // public stopAnimation = async (dX: number, id: string) => {
  //   const node = document.querySelector(`[data-car-animation-id="${id}"]`) as HTMLElement;
  //   let currentX: number = node.offsetLeft;
  //   let animation = 0;
  //   const tick = () => {
  //     currentX += dX;

  //     node.style.transform = `translateX(${currentX}px)`;

  //     if (currentX < (window.innerWidth - 140)) {
  //       animation = window.requestAnimationFrame(tick);
  //     }
  //   };
  //   animation = window.requestAnimationFrame(tick);
  //   console.log(animation);
  //   const { success } = await this.drive(Number(id));
  //   if (!success) window.cancelAnimationFrame(animation);
  //   return animation;
  //   // const { success } = await this.drive(Number(id));
  // };
}

export default Animation;
