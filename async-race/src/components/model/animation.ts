import Api from './api';

class Animation extends Api {
  public animatePosition = async (e: Event) => {
    const id = (e.target as HTMLElement).getAttribute('data-start-id');
    if (id) {
      const node = document.querySelector(`[data-car-animation-id="${id}"]`) as HTMLElement;
      const { velocity, distance } = await this.startEngine(Number(id));
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
    }
  };
}

export default Animation;
