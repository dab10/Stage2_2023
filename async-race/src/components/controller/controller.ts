import Animation from '../model/animation';
import Api from '../model/api';
import EditCar from '../model/editCar';

class Controller {
  private animation: Animation;

  private api: Api;

  private editCar: EditCar;

  constructor() {
    this.animation = new Animation();
    this.api = new Api();
    this.editCar = new EditCar();
  }

  public async start() {
    await this.api.carsForStartPage();

    const garage = document.querySelector('.garage') as HTMLElement;
    const createButton = document.querySelector('.create-form__button') as HTMLButtonElement;

    garage.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('start-stop-car__start-button')) this.animation.animatePosition(e);
      if ((e.target as HTMLElement).classList.contains('car-buttons__select')) this.editCar.editCar(e);
    });

    createButton.addEventListener('click', (e) => this.editCar.createNewCar(e));
  }
}

export default Controller;
