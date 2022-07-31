import Animation from '../model/animation';
import Api from '../model/api';

class Controller {
  private animation: Animation;

  private api: Api;

  constructor() {
    this.animation = new Animation();
    this.api = new Api();
  }

  public async start() {
    await this.api.carsForStartPage();

    const animation = document.querySelector('.start-stop-car__start-button') as HTMLElement;

    animation.addEventListener('click', () => this.animation.animatePosition());
  }
}

export default Controller;
