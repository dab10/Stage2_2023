import Api from '../model/api';
import EditCar from '../model/editCar';
import Pagination from '../model/pagination';
import Animation from '../model/animation';
import TableWinners from '../model/tableWinners';
import View from '../view/view';
import SelfCheck from '../view/selfCheck';

class Controller {
  private animation: Animation;

  private api: Api;

  private editCar: EditCar;

  private pagination: Pagination;

  private tableWinners: TableWinners;

  constructor() {
    this.animation = new Animation();
    this.api = new Api();
    this.editCar = new EditCar();
    this.pagination = new Pagination();
    this.tableWinners = new TableWinners();
  }

  public async start(): Promise<void> {
    await this.api.carsForStartPage();
    await this.api.winnersForStartPage();
    SelfCheck.selfCheck();

    const main = document.querySelector('.main') as HTMLElement;
    const winnersTable = document.querySelector('.winners') as HTMLElement;
    const createButton = document.querySelector('.create-form__button') as HTMLButtonElement;
    const buttonNext = document.querySelector('.pagination-garage__next') as HTMLButtonElement;
    const buttonPrev = document.querySelector('.pagination-garage__prev') as HTMLButtonElement;
    const raceAll = document.querySelector('.controls__button-race') as HTMLButtonElement;
    const raceReset = document.querySelector('.controls__button-reset') as HTMLButtonElement;
    const garage = document.querySelector('.main-button__garage') as HTMLButtonElement;
    const winners = document.querySelector('.main-button__winners') as HTMLButtonElement;
    const popup = document.querySelector('.popup') as HTMLElement;
    const generateCars = document.querySelector('.controls__button-generator') as HTMLDivElement;
    const buttonNextWinners = document.querySelector('.pagination-winners__next') as HTMLButtonElement;
    const buttonPrevWinners = document.querySelector('.pagination-winners__prev') as HTMLButtonElement;

    main.addEventListener('click', (e) => this.listenButtonsCar(e));
    createButton.addEventListener('click', (e) => this.editCar.createNewCar(e));
    buttonNext.addEventListener('click', this.pagination.moveNext);
    buttonPrev.addEventListener('click', this.pagination.movePrev);
    buttonNextWinners.addEventListener('click', this.pagination.moveNextWinners);
    buttonPrevWinners.addEventListener('click', this.pagination.movePrevWinners);
    raceAll.addEventListener('click', this.animation.raceAll);
    raceReset.addEventListener('click', this.animation.raceReset);
    winners.addEventListener('click', (e) => View.changePage(e));
    garage.addEventListener('click', (e) => View.changePage(e));
    popup.addEventListener('click', View.popupHidden);
    winnersTable.addEventListener('click', (e) => this.listenButtonsSortingTable(e));
    generateCars.addEventListener('click', this.editCar.generateCars);
  }

  private listenButtonsCar(e: Event): void {
    if ((e.target as HTMLButtonElement).classList.contains('start-stop-car__start-button')) this.animation.animatePosition(e);
    if ((e.target as HTMLButtonElement).classList.contains('start-stop-car__stop-button')) this.animation.animateStop(e);
    if ((e.target as HTMLButtonElement).classList.contains('car-buttons__select')) this.editCar.editCar(e);
    if ((e.target as HTMLButtonElement).classList.contains('car-buttons__remove')) this.editCar.removeCar(e);
  }

  private listenButtonsSortingTable(e: Event): void {
    if ((e.target as HTMLElement).classList.contains('sort-by-wins_asc')) this.tableWinners.sorting('wins', 'asc');
    if ((e.target as HTMLElement).classList.contains('sort-by-wins_desc')) this.tableWinners.sorting('wins', 'desc');
    if ((e.target as HTMLElement).classList.contains('sort-by-time_asc')) this.tableWinners.sorting('time', 'asc');
    if ((e.target as HTMLElement).classList.contains('sort-by-time_desc')) this.tableWinners.sorting('time', 'desc');
  }
}

export default Controller;
