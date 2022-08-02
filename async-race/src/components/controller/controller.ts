import Animation from '../model/animation';
import Api from '../model/api';
import EditCar from '../model/editCar';
import Pagination from '../model/pagination';

class Controller {
  private animation: Animation;

  private api: Api;

  private editCar: EditCar;

  private pagination: Pagination;

  constructor() {
    this.animation = new Animation();
    this.api = new Api();
    this.editCar = new EditCar();
    this.pagination = new Pagination();
  }

  public async start() {
    await this.api.carsForStartPage();

    const main = document.querySelector('.main') as HTMLElement;
    const createButton = document.querySelector('.create-form__button') as HTMLButtonElement;
    const buttonNext = document.querySelector('.pagination-garage__next') as HTMLButtonElement;
    const buttonPrev = document.querySelector('.pagination-garage__prev') as HTMLButtonElement;

    main.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('start-stop-car__start-button')) this.animation.animatePosition(e);
      if ((e.target as HTMLElement).classList.contains('car-buttons__select')) this.editCar.editCar(e);
      if ((e.target as HTMLElement).classList.contains('car-buttons__remove')) this.editCar.removeCar(e);
    });

    createButton.addEventListener('click', (e) => this.editCar.createNewCar(e));
    buttonNext.addEventListener('click', this.pagination.moveNext);
    buttonPrev.addEventListener('click', this.pagination.movePrev);
  }
}

export default Controller;
