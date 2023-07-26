import {
  headerStart, footerStart, mainStart, paginationGarage, renderCar, winnerStart, paginationWinners,
} from './templates';

import { Cars, TableWinnerCar } from '../../types';
import { CARS_PER_PAGE, WINNERS_PER_PAGE } from '../../types/constants';

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
    this.header.insertAdjacentHTML('afterbegin', headerStart);
    this.main.insertAdjacentHTML('afterbegin', mainStart(cars, count));
    this.paginationGarage.insertAdjacentHTML('afterbegin', paginationGarage);
    this.paginationWinners.insertAdjacentHTML('afterbegin', paginationWinners);
    this.footer.insertAdjacentHTML('afterbegin', footerStart);
    document.body.append(this.header, this.paginationWinners, this.main, this.paginationGarage);
    document.body.append(this.footer);
    const buttonNext = document.querySelector('.pagination-garage__next') as HTMLButtonElement;
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
    const buttonNext = document.querySelector('.pagination-winners__next') as HTMLButtonElement;
    const buttonPrev = document.querySelector('.pagination-winners__prev') as HTMLButtonElement;
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
      carUpdate = document.querySelector(`[data-car-id="${id}"]`) as HTMLLIElement;
    }
    if (carUpdate) {
      carUpdate.innerHTML = '';
      carUpdate.innerHTML = renderCar(car);
    }
    this.main.append(renderCar(car));
  };

  static deleteCar = (id: number, count: string): void => {
    const countCar = document.querySelector('.count-car') as HTMLElement;
    const carDelete = document.querySelector(`[data-car-id="${id}"]`) as HTMLLIElement;
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
    const pageNumber = document.querySelector('.page') as HTMLElement;
    pageNumber.innerHTML = '';
    pageNumber.innerHTML = `Page #${count}`;
  };

  static renderPopup = (name: string, minTime: number): void => {
    const popup = document.querySelector('.popup') as HTMLElement;
    popup.classList.remove('hidden');
    popup.textContent = '';
    popup.textContent = `${name} win (${Math.floor(minTime * 100) / 100}s)! (tap to close or press reset)`;
  };

  static renderAllBrokenPopup = (): void => {
    const allBrokenPopup = document.querySelector('.popup-broken-car') as HTMLElement;
    allBrokenPopup.classList.remove('hidden');
    allBrokenPopup.textContent = '';
    allBrokenPopup.textContent = 'All cars were broken!';
  };

  public disableButtonRace = (isRace: boolean): void => {
    const buttonCreate = document.querySelector('.create-form__button') as HTMLButtonElement;
    const buttonRace = document.querySelector('.controls__button-race') as HTMLButtonElement;
    const buttonGenerateCars = document.querySelector('.controls__button-generator') as HTMLButtonElement;
    const buttonsSelectAndRemove = document.querySelectorAll('.car-buttons__select,  .car-buttons__remove');

    buttonCreate.disabled = isRace;
    buttonRace.disabled = isRace;
    buttonGenerateCars.disabled = isRace;
    buttonsSelectAndRemove.forEach((element) => {
      const elementButton = element;
      ((elementButton as HTMLButtonElement).disabled = isRace);
    });

    const buttonPrev = document.querySelector('.pagination-garage__prev') as HTMLButtonElement;
    const buttonNext = document.querySelector('.pagination-garage__next') as HTMLButtonElement;
    const buttonUpdate = document.querySelector('.edit-form__button') as HTMLButtonElement;
    const buttonReset = document.querySelector('.controls__button-reset') as HTMLButtonElement;
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
    const buttonsStartCar = document.querySelectorAll('.start-stop-car__start-button');
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
    const startButton = document.querySelector(`[data-start-id="${id}"]`) as HTMLButtonElement;
    startButton.disabled = false;
  };

  public disableEnableButtonCar = (isRace: boolean): void => {
    const buttonCreate = document.querySelector('.create-form__button') as HTMLButtonElement;
    const buttonRace = document.querySelector('.controls__button-race') as HTMLButtonElement;
    const buttonEdit = document.querySelector('.edit-form__button') as HTMLButtonElement;
    const buttonReset = document.querySelector('.controls__button-reset') as HTMLButtonElement;
    const buttonGenerateCars = document.querySelector('.controls__button-generator') as HTMLButtonElement;
    const buttonsSelectAndRemove = document.querySelectorAll('.car-buttons__select,  .car-buttons__remove');

    buttonCreate.disabled = isRace;
    buttonEdit.disabled = isRace;
    buttonRace.disabled = isRace;
    buttonReset.disabled = isRace;
    buttonGenerateCars.disabled = isRace;
    buttonsSelectAndRemove.forEach((element) => {
      const elementButton = element;
      ((elementButton as HTMLButtonElement).disabled = isRace);
    });

    const buttonPrev = document.querySelector('.pagination-garage__prev') as HTMLButtonElement;
    const buttonNext = document.querySelector('.pagination-garage__next') as HTMLButtonElement;
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

  static changePage = (e: Event): void => {
    const main = document.querySelector('.main') as HTMLElement;
    const paginationButtonsGarage = document.querySelector('.pagination-garage') as HTMLButtonElement;
    const editForm = document.querySelector('.create-edit-form') as HTMLDivElement;
    const paginationButtonsWinners = document.querySelector('.pagination-winners') as HTMLDivElement;
    const winnersTable = document.querySelector('.winners') as HTMLElement;
    const buttonToGarage = e.target as HTMLButtonElement;
    const isClickButtonToGarage = buttonToGarage.classList.contains('main-button__garage');
    if (isClickButtonToGarage) {
      main.classList.remove('hidden');
      paginationButtonsGarage.classList.remove('hidden');
      editForm.classList.remove('hidden');
      paginationButtonsWinners.classList.add('hidden');
      winnersTable.classList.add('hidden');
      return;
    }
    main.classList.add('hidden');
    paginationButtonsGarage.classList.add('hidden');
    editForm.classList.add('hidden');
    paginationButtonsWinners.classList.remove('hidden');
    winnersTable.classList.remove('hidden');
  };

  static popupHidden = (): void => {
    const popup = document.querySelector('.popup') as HTMLElement;
    popup.classList.add('hidden');
    const popupBrokenCar = document.querySelector('.popup-broken-car') as HTMLElement;
    popupBrokenCar.classList.add('hidden');
  };

  static enableStartButton = (isRace: boolean): void => {
    const buttonStart = document.querySelectorAll('.start-stop-car__start-button');
    buttonStart.forEach((element) => {
      const elementButton = element;
      ((elementButton as HTMLButtonElement).disabled = isRace);
    });
  };
}

export default View;
