import Api from './api';

class Animation extends Api {
  public animatePosition = async () => {
    const { velocity, distance } = await this.startEngine(1);
    const node = document.querySelector('.car-animation') as HTMLElement;
    let currentX: number = node.offsetLeft;
    const framesCount = ((distance / velocity) / 1000) * 60;
    const dX = ((window.innerWidth - 140) - node.offsetLeft) / framesCount;

    const tick = () => {
      currentX += dX;

      node.style.transform = `translateX(${currentX}px)`;

      if (currentX < (window.innerWidth - 140)) {
        requestAnimationFrame(tick);
      }
    };
    tick();
  };
}

export default Animation;
