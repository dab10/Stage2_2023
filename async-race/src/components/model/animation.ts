import Api from './api';
import { NumberCarAnimate } from '../../types/index';

class Animation extends Api {
  private animation: NumberCarAnimate;

  constructor() {
    super();
    this.animation = {};
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
      this.animation[id] = this.animationPerfect(node, currentX, dX, id);

      const { success } = await this.drive(Number(id));
      if (!success) window.cancelAnimationFrame(this.animation[id]);
    }
  };

  public animationPerfect = (
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
