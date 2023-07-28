import {
  HEADER_START, FOOTER_START, mainStart,
  PAGINATION_GARAGE, renderCar, winnerStart, PAGINATION_WINNERS,
} from './templates';

import { Cars, TableWinnerCar } from '../../types';
import {
  BUTTON_CLASSNAMES,
  BUTTON_CREATE_CLASS_NAME,
  BUTTON_EDIT_CLASS_NAME,
  BUTTON_GARAGE_CLASS_NAME,
  BUTTON_GENERATOR_CLASS_NAME,
  BUTTON_NEXT_CLASS_NAME,
  BUTTON_NEXT_WINNERS_CLASS_NAME,
  BUTTON_PREV_CLASS_NAME,
  BUTTON_PREV_WINNERS_CLASS_NAME,
  BUTTON_RACE_CLASS_NAME,
  BUTTON_REMOVE_CLASS_NAME,
  BUTTON_RESET_CLASS_NAME,
  BUTTON_SELECT_CLASS_NAME,
  BUTTON_START_CLASS_NAME,
  CARS_PER_PAGE,
  CAR_CLASS_NAME,
  HIDDEN_CLASS_NAME,
  INCREASER_NUMBER_POSITION,
  PAGE_NUMBER_DISPLAY_CLASS_NAME,
  POPUP_BROKEN_CLASS_NAME,
  POPUP_CLASS_NAME,
  REDUCER_NUMBER_POSITION,
  WINNERS_PER_PAGE,
} from '../../types/constants';

class View {
  private header: HTMLElement;

  private main: HTMLElement;

  private paginationGarage: HTMLElement;

  private paginationWinners: HTMLElement;

  private footer: HTMLElement;

  private isRaceButtonPrev: boolean;

  private isRaceButtonNext: boolean;

  private isRaceButtonUpdate: boolean;

  private isRaceButtonReset: boolean;

  constructor() {
    this.header = document.createElement('header');
    this.header.classList.add('header');
    this.main = document.createElement('main');
    this.main.classList.add('main');
    this.paginationGarage = document.createElement('div');
    this.paginationWinners = document.createElement('div');
    this.footer = document.createElement('footer');
    this.isRaceButtonNext = false;
    this.isRaceButtonPrev = false;
    this.isRaceButtonUpdate = false;
    this.isRaceButtonReset = false;
  }

  public renderStartPage = (cars: Cars[], count: string): void => {
    this.header.insertAdjacentHTML('afterbegin', HEADER_START);
    this.main.insertAdjacentHTML('afterbegin', mainStart(cars, count));
    this.paginationGarage.insertAdjacentHTML('afterbegin', PAGINATION_GARAGE);
    this.paginationWinners.insertAdjacentHTML('afterbegin', PAGINATION_WINNERS);
    this.footer.insertAdjacentHTML('afterbegin', FOOTER_START);
    document.body.append(this.header, this.paginationWinners, this.main, this.paginationGarage);
    document.body.append(this.footer);
    const buttonNext = document.querySelector(BUTTON_NEXT_CLASS_NAME) as HTMLButtonElement;
    const isCarsMoreThanCarsPerPage = Number(count) > CARS_PER_PAGE;
    if (isCarsMoreThanCarsPerPage) {
      buttonNext.disabled = false;
    }
  };

  static renderStartTableWinners = (
    resultWinner: TableWinnerCar[],
    count: string,
    page: number = 1,
  ): void => {
    const winnersTable = document.querySelector('.winners') as HTMLElement;
    if (winnersTable) {
      winnersTable.innerHTML = '';
    }
    winnersTable.innerHTML = winnerStart(resultWinner, count, page);
    const buttonNext = document.querySelector(BUTTON_NEXT_WINNERS_CLASS_NAME) as HTMLButtonElement;
    const buttonPrev = document.querySelector(BUTTON_PREV_WINNERS_CLASS_NAME) as HTMLButtonElement;
    const isFirstPage = page === 1;
    if (isFirstPage) {
      buttonPrev.disabled = true;
    }
    const isCarsMoreThanWinnersPerPage = Number(count) > WINNERS_PER_PAGE;
    if (isCarsMoreThanWinnersPerPage) {
      buttonNext.disabled = false;
    }
  };

  public renderCurrentCar = (car: Cars, id: number): void => {
    let carUpdate;
    if (id) {
      carUpdate = document.querySelector(
        CAR_CLASS_NAME.getIdFromCarContainer(String(id)),
      ) as HTMLLIElement;
    }
    if (carUpdate) {
      carUpdate.innerHTML = '';
      carUpdate.innerHTML = renderCar(car);
    }
    this.main.append(renderCar(car));
  };

  static deleteCar = (id: number, count: string): void => {
    const countCar = document.querySelector('.count-car') as HTMLElement;
    const carDelete = document.querySelector(
      CAR_CLASS_NAME.getIdFromCarContainer(String(id)),
    ) as HTMLLIElement;
    countCar.innerHTML = '';
    countCar.innerHTML = `Garage (${count})`;
    carDelete.remove();
  };

  static renderNewCars = (cars: Cars[], count: string, page: number): void => {
    const main = document.querySelector('.main') as HTMLElement;
    main.innerHTML = '';
    main.innerHTML = mainStart(cars, count, page);
  };

  static renderPageNumber = (count: number): void => {
    const pageNumber = document.querySelector(PAGE_NUMBER_DISPLAY_CLASS_NAME) as HTMLElement;
    pageNumber.innerHTML = '';
    pageNumber.innerHTML = `Page #${count}`;
  };

  static renderPopup = (name: string, minTime: number): void => {
    const popup = document.querySelector(POPUP_CLASS_NAME) as HTMLElement;
    const roundMinTime = Math.floor(minTime * INCREASER_NUMBER_POSITION) / REDUCER_NUMBER_POSITION;
    popup.classList.remove(HIDDEN_CLASS_NAME);
    popup.textContent = '';
    popup.textContent = `${name} win (${roundMinTime}s)! (tap to close or press reset)`;
  };

  static renderAllBrokenPopup = (): void => {
    const allBrokenPopup = document.querySelector(POPUP_BROKEN_CLASS_NAME) as HTMLElement;
    allBrokenPopup.classList.remove(HIDDEN_CLASS_NAME);
    allBrokenPopup.textContent = '';
    allBrokenPopup.textContent = 'All cars were broken!';
  };

  public disableButtonRace = (isRace: boolean): void => {
    const buttonCreate = document.querySelector(BUTTON_CREATE_CLASS_NAME) as HTMLButtonElement;
    const buttonRace = document.querySelector(BUTTON_RACE_CLASS_NAME) as HTMLButtonElement;
    const buttonGenerateCars = document.querySelector(
      BUTTON_GENERATOR_CLASS_NAME,
    ) as HTMLButtonElement;
    const buttonsSelectAndRemove = document.querySelectorAll(`${BUTTON_SELECT_CLASS_NAME},  ${BUTTON_REMOVE_CLASS_NAME}`);

    buttonCreate.disabled = isRace;
    buttonRace.disabled = isRace;
    buttonGenerateCars.disabled = isRace;
    buttonsSelectAndRemove.forEach((element) => {
      const elementButton = element;
      ((elementButton as HTMLButtonElement).disabled = isRace);
    });

    const buttonPrev = document.querySelector(BUTTON_PREV_CLASS_NAME) as HTMLButtonElement;
    const buttonNext = document.querySelector(BUTTON_NEXT_CLASS_NAME) as HTMLButtonElement;
    const buttonUpdate = document.querySelector(BUTTON_EDIT_CLASS_NAME) as HTMLButtonElement;
    const buttonReset = document.querySelector(BUTTON_RESET_CLASS_NAME) as HTMLButtonElement;
    if (isRace) {
      this.isRaceButtonPrev = buttonPrev.disabled;
      this.isRaceButtonNext = buttonNext.disabled;
      this.isRaceButtonUpdate = buttonUpdate.disabled;
      this.isRaceButtonReset = buttonReset.disabled;
    }
    buttonPrev.disabled = isRace;
    buttonNext.disabled = isRace;
    buttonUpdate.disabled = isRace;
    if (!isRace) {
      buttonPrev.disabled = this.isRaceButtonPrev;
      buttonNext.disabled = this.isRaceButtonNext;
      buttonUpdate.disabled = this.isRaceButtonUpdate;
      buttonReset.disabled = this.isRaceButtonReset;
    }
  };

  static disableStartStopButtonRace = (isRace: boolean): void => {
    const buttonsStartCar = document.querySelectorAll(BUTTON_START_CLASS_NAME);
    const buttonsStopCar = document.querySelectorAll('.start-stop-car__stop-button');
    buttonsStartCar.forEach((element) => {
      const elementButton = element;
      ((elementButton as HTMLButtonElement).disabled = isRace);
    });
    buttonsStopCar.forEach((element) => {
      const elementButton = element;
      ((elementButton as HTMLButtonElement).disabled = isRace);
    });
  };

  static enableStartButtonRace = (id: string): void => {
    const startButton = document.querySelector(
      BUTTON_CLASSNAMES.getStartButtonId(id),
    ) as HTMLButtonElement;
    startButton.disabled = false;
  };

  public disableEnableButtonCar = (isRace: boolean): void => {
    const buttonCreate = document.querySelector(BUTTON_CREATE_CLASS_NAME) as HTMLButtonElement;
    const buttonRace = document.querySelector(BUTTON_RACE_CLASS_NAME) as HTMLButtonElement;
    const buttonEdit = document.querySelector(BUTTON_EDIT_CLASS_NAME) as HTMLButtonElement;
    const buttonReset = document.querySelector(BUTTON_RESET_CLASS_NAME) as HTMLButtonElement;
    const buttonGenerateCars = document.querySelector(
      BUTTON_GENERATOR_CLASS_NAME,
    ) as HTMLButtonElement;
    const buttonsSelectAndRemove = document.querySelectorAll(`${BUTTON_SELECT_CLASS_NAME},  ${BUTTON_REMOVE_CLASS_NAME}`);

    buttonCreate.disabled = isRace;
    buttonEdit.disabled = isRace;
    buttonRace.disabled = isRace;
    buttonReset.disabled = isRace;
    buttonGenerateCars.disabled = isRace;
    buttonsSelectAndRemove.forEach((element) => {
      const elementButton = element;
      ((elementButton as HTMLButtonElement).disabled = isRace);
    });

    const buttonPrev = document.querySelector(BUTTON_PREV_CLASS_NAME) as HTMLButtonElement;
    const buttonNext = document.querySelector(BUTTON_NEXT_CLASS_NAME) as HTMLButtonElement;
    if (isRace) {
      this.isRaceButtonPrev = buttonPrev.disabled;
      this.isRaceButtonNext = buttonNext.disabled;
    }
    buttonPrev.disabled = isRace;
    buttonNext.disabled = isRace;
    if (!isRace) {
      buttonPrev.disabled = this.isRaceButtonPrev;
      buttonNext.disabled = this.isRaceButtonNext;
    }
  };

  static changePage = (event: Event): void => {
    const main = document.querySelector('.main') as HTMLElement;
    const paginationButtonsGarage = document.querySelector('.pagination-garage') as HTMLButtonElement;
    const editForm = document.querySelector('.create-edit-form') as HTMLDivElement;
    const paginationButtonsWinners = document.querySelector('.pagination-winners') as HTMLDivElement;
    const winnersTable = document.querySelector('.winners') as HTMLElement;
    const buttonToGarage = event.target as HTMLButtonElement;
    const isClickButtonToGarage = buttonToGarage.classList.contains(
      BUTTON_GARAGE_CLASS_NAME.slice(1),
    );
    if (isClickButtonToGarage) {
      main.classList.remove(HIDDEN_CLASS_NAME);
      paginationButtonsGarage.classList.remove(HIDDEN_CLASS_NAME);
      editForm.classList.remove(HIDDEN_CLASS_NAME);
      paginationButtonsWinners.classList.add(HIDDEN_CLASS_NAME);
      winnersTable.classList.add(HIDDEN_CLASS_NAME);
      return;
    }
    main.classList.add(HIDDEN_CLASS_NAME);
    paginationButtonsGarage.classList.add(HIDDEN_CLASS_NAME);
    editForm.classList.add(HIDDEN_CLASS_NAME);
    paginationButtonsWinners.classList.remove(HIDDEN_CLASS_NAME);
    winnersTable.classList.remove(HIDDEN_CLASS_NAME);
  };

  static popupHidden = (): void => {
    const popup = document.querySelector(POPUP_CLASS_NAME) as HTMLElement;
    popup.classList.add(HIDDEN_CLASS_NAME);
    const popupBrokenCar = document.querySelector(POPUP_BROKEN_CLASS_NAME) as HTMLElement;
    popupBrokenCar.classList.add(HIDDEN_CLASS_NAME);
  };

  static enableStartButton = (isRace: boolean): void => {
    const buttonStart = document.querySelectorAll(BUTTON_START_CLASS_NAME);
    buttonStart.forEach((element) => {
      const elementButton = element;
      ((elementButton as HTMLButtonElement).disabled = isRace);
    });
  };
}

export default View;
