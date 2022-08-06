import Api from '../model/api';
import EditCar from '../model/editCar';
import Pagination from '../model/pagination';
import Animation from '../model/animation';

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
    await this.api.winnersForStartPage();

    const main = document.querySelector('.main') as HTMLElement;
    const tableWinners = document.querySelector('.winners') as HTMLElement;
    const createButton = document.querySelector('.create-form__button') as HTMLButtonElement;
    const buttonNext = document.querySelector('.pagination-garage__next') as HTMLButtonElement;
    const buttonPrev = document.querySelector('.pagination-garage__prev') as HTMLButtonElement;
    const raceAll = document.querySelector('.controls__button-race') as HTMLButtonElement;
    const raceReset = document.querySelector('.controls__button-reset') as HTMLButtonElement;
    // const garage = document.querySelector('.main-button__garage') as HTMLButtonElement;
    const winners = document.querySelector('.main-button__winners') as HTMLButtonElement;
    const popup = document.querySelector('.popup') as HTMLElement;

    main.addEventListener('click', (e) => {
      if ((e.target as HTMLButtonElement).classList.contains('start-stop-car__start-button')) this.animation.animatePosition(e);
      if ((e.target as HTMLButtonElement).classList.contains('start-stop-car__stop-button')) this.animation.animateStop(e);
      if ((e.target as HTMLButtonElement).classList.contains('car-buttons__select')) this.editCar.editCar(e);
      if ((e.target as HTMLButtonElement).classList.contains('car-buttons__remove')) this.editCar.removeCar(e);
    });

    createButton.addEventListener('click', (e) => this.editCar.createNewCar(e));
    buttonNext.addEventListener('click', this.pagination.moveNext);
    buttonPrev.addEventListener('click', this.pagination.movePrev);
    raceAll.addEventListener('click', this.animation.raceAll);
    // raceAll.addEventListener('click', this.animation.winnerRace);
    raceReset.addEventListener('click', this.animation.raceReset);
    winners.addEventListener('click', () => tableWinners.classList.toggle('hidden'));
    popup.addEventListener('click', () => popup.classList.add('hidden'));
    // garage.addEventListener('click', () => main.classList.toggle('hidden'));
    // winners.addEventListener('click', () => main.classList.toggle('hidden'));
  }
}

export default Controller;
