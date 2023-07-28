import Api from '../model/api';
import EditCar from '../model/editCar';
import Pagination from '../model/pagination';
import Animation from '../model/animation';
import TableWinners from '../model/tableWinners';
import View from '../view/view';
import SelfCheck from '../view/selfCheck';
import elementHasClassName from '../../common/elementHasClassName';
import {
  BUTTON_CREATE_CLASS_NAME,
  BUTTON_GENERATOR_CLASS_NAME,
  BUTTON_NEXT_CLASS_NAME,
  BUTTON_NEXT_WINNERS_CLASS_NAME,
  BUTTON_PREV_CLASS_NAME,
  BUTTON_PREV_WINNERS_CLASS_NAME,
  BUTTON_RACE_CLASS_NAME,
  BUTTON_RESET_CLASS_NAME,
  POPUP_CLASS_NAME,
} from '../../types/constants';

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

  public start = async (): Promise<void> => {
    await this.api.carsForStartPage();
    await this.api.winnersForStartPage();
    SelfCheck.selfCheck();

    const main = document.querySelector('.main') as HTMLElement;
    const winnersTable = document.querySelector('.winners') as HTMLElement;
    const createButton = document.querySelector(BUTTON_CREATE_CLASS_NAME) as HTMLButtonElement;
    const buttonNext = document.querySelector(BUTTON_NEXT_CLASS_NAME) as HTMLButtonElement;
    const buttonPrev = document.querySelector(BUTTON_PREV_CLASS_NAME) as HTMLButtonElement;
    const raceAll = document.querySelector(BUTTON_RACE_CLASS_NAME) as HTMLButtonElement;
    const raceReset = document.querySelector(BUTTON_RESET_CLASS_NAME) as HTMLButtonElement;
    const garage = document.querySelector('.main-button__garage') as HTMLButtonElement;
    const winners = document.querySelector('.main-button__winners') as HTMLButtonElement;
    const popup = document.querySelector(POPUP_CLASS_NAME) as HTMLElement;
    const generateCars = document.querySelector(BUTTON_GENERATOR_CLASS_NAME) as HTMLDivElement;
    const buttonNextWinners = document.querySelector(
      BUTTON_NEXT_WINNERS_CLASS_NAME,
    ) as HTMLButtonElement;
    const buttonPrevWinners = document.querySelector(
      BUTTON_PREV_WINNERS_CLASS_NAME,
    ) as HTMLButtonElement;

    main.addEventListener('click', this.listenButtonsCar);
    createButton.addEventListener('click', this.editCar.createNewCar);
    buttonNext.addEventListener('click', this.pagination.moveNext);
    buttonPrev.addEventListener('click', this.pagination.movePrev);
    buttonNextWinners.addEventListener('click', this.pagination.moveNextWinners);
    buttonPrevWinners.addEventListener('click', this.pagination.movePrevWinners);
    raceAll.addEventListener('click', this.animation.raceAll);
    raceReset.addEventListener('click', this.animation.resetRace);
    winners.addEventListener('click', View.changePage);
    garage.addEventListener('click', View.changePage);
    popup.addEventListener('click', View.popupHidden);
    winnersTable.addEventListener('click', this.listenButtonsSortingTable);
    generateCars.addEventListener('click', this.editCar.generateCars);
  };

  private listenButtonsCar = (event: Event): void => {
    if (elementHasClassName(event.target as HTMLButtonElement, 'start-stop-car__start-button')) {
      this.animation.animatePosition(event);
    }
    if (elementHasClassName(event.target as HTMLButtonElement, 'start-stop-car__stop-button')) {
      this.animation.animateStop(event);
    }
    if (elementHasClassName(event.target as HTMLButtonElement, 'car-buttons__select')) {
      this.editCar.editCar(event);
    }
    if (elementHasClassName(event.target as HTMLButtonElement, 'car-buttons__remove')) {
      this.editCar.removeCar(event);
    }
  };

  private listenButtonsSortingTable = (event: Event): void => {
    if (elementHasClassName(event.target as HTMLElement, 'sort-by-wins_asc')) {
      this.tableWinners.sorting('wins', 'asc');
    }
    if (elementHasClassName(event.target as HTMLElement, 'sort-by-wins_desc')) {
      this.tableWinners.sorting('wins', 'desc');
    }
    if (elementHasClassName(event.target as HTMLElement, 'sort-by-time_asc')) {
      this.tableWinners.sorting('time', 'asc');
    }
    if (elementHasClassName(event.target as HTMLElement, 'sort-by-time_desc')) {
      this.tableWinners.sorting('time', 'desc');
    }
  };
}

export default Controller;
