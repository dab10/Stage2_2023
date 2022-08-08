import {
  headerStart, footerStart, mainStart, paginationGarage, renderCar, winnerStart, paginationWinners,
} from './templates';

import { Cars, TableWinnerCar } from '../../types';

class View {
  private header: HTMLElement;

  private main: HTMLElement;

  // private winners: HTMLElement;

  private paginationGarage: HTMLElement;

  private paginationWinners: HTMLElement;

  private footer: HTMLElement;

  private isStarted: boolean;

  private isRaceButtonPrev: boolean;

  private isRaceButtonNext: boolean;

  private isRaceButtonUpdate: boolean;

  constructor() {
    this.header = document.createElement('header');
    this.header.classList.add('header');
    this.main = document.createElement('main');
    this.main.classList.add('main');
    this.paginationGarage = document.createElement('div');
    this.paginationWinners = document.createElement('div');
    this.footer = document.createElement('footer');
    this.isStarted = false;
    this.isRaceButtonNext = false;
    this.isRaceButtonPrev = false;
    this.isRaceButtonUpdate = false;
  }

  public renderStartPage = (cars: Cars[], count: string) => {
    this.header.insertAdjacentHTML('afterbegin', headerStart);
    this.main.insertAdjacentHTML('afterbegin', mainStart(cars, count));
    this.paginationGarage.insertAdjacentHTML('afterbegin', paginationGarage);
    this.paginationWinners.insertAdjacentHTML('afterbegin', paginationWinners);
    this.footer.insertAdjacentHTML('afterbegin', footerStart);
    document.body.append(this.header, this.paginationWinners, this.main, this.paginationGarage);
    document.body.append(this.footer);
    const buttonNext = document.querySelector('.pagination-garage__next') as HTMLButtonElement;
    if (Number(count) > 7) buttonNext.disabled = false;
  };

  static renderStartTableWinners(resultWinner: TableWinnerCar[], count: string, page: number = 1) {
    const winnersTable = document.querySelector('.winners') as HTMLElement;
    if (winnersTable) winnersTable.innerHTML = '';
    winnersTable.innerHTML = winnerStart(resultWinner, count, page);
    const buttonNext = document.querySelector('.pagination-winners__next') as HTMLButtonElement;
    const buttonPrev = document.querySelector('.pagination-winners__prev') as HTMLButtonElement;
    if (page === 1) buttonPrev.disabled = true;
    if (Number(count) > 10) buttonNext.disabled = false;
  }

  public renderCurrentCar = (car: Cars, id: number) => {
    if (id) {
      const carUpdate = document.querySelector(`[data-car-id="${id}"]`) as HTMLLIElement;
      if (carUpdate) {
        carUpdate.innerHTML = '';
        carUpdate.innerHTML = renderCar(car);
      }
    }
    this.main.append(renderCar(car));
  };

  static deleteCar = (id: number, count: string) => {
    const countCar = document.querySelector('.count-car') as HTMLElement;
    const carDelete = document.querySelector(`[data-car-id="${id}"]`) as HTMLLIElement;
    countCar.innerHTML = '';
    countCar.innerHTML = `Garage (${count})`;
    carDelete.remove();
  };

  static renderNewCars = (cars: Cars[], count: string, page: number) => {
    const main = document.querySelector('.main') as HTMLElement;
    main.innerHTML = '';
    main.innerHTML = mainStart(cars, count, page);
  };

  static renderPageNumber = (count: number) => {
    const pageNumber = document.querySelector('.page') as HTMLElement;
    pageNumber.innerHTML = '';
    pageNumber.innerHTML = `Page #${count}`;
  };

  static renderPopup = (name: string, minTime: number) => {
    const popup = document.querySelector('.popup') as HTMLElement;
    popup.classList.remove('hidden');
    popup.textContent = '';
    popup.textContent = `${name} win (${Math.floor(minTime * 100) / 100}s)! (tap to close or press reset)`;
  };

  public disableButtonRace = (isRace: boolean) => {
    (document.querySelector('.create-form__button') as HTMLButtonElement).disabled = isRace;
    // (document.querySelector('.edit-form__button') as HTMLButtonElement).disabled = isRace;
    (document.querySelector('.controls__button-race') as HTMLButtonElement).disabled = isRace;
    (document.querySelector('.controls__button-reset') as HTMLButtonElement).disabled = isRace;
    (document.querySelector('.controls__button-generator') as HTMLButtonElement).disabled = isRace;
    (document.querySelectorAll('.car-buttons__select,  .car-buttons__remove')).forEach((el) => {
      const elButton = el;
      ((elButton as HTMLButtonElement).disabled = isRace);
    });

    const buttonPrev = (document.querySelector('.pagination-garage__prev') as HTMLButtonElement);
    const buttonNext = (document.querySelector('.pagination-garage__next') as HTMLButtonElement);
    const buttonUpdate = (document.querySelector('.edit-form__button') as HTMLButtonElement);
    if (isRace) {
      this.isRaceButtonPrev = buttonPrev.disabled;
      this.isRaceButtonNext = buttonNext.disabled;
      this.isRaceButtonUpdate = buttonUpdate.disabled;
    }
    buttonPrev.disabled = isRace;
    buttonNext.disabled = isRace;
    buttonUpdate.disabled = isRace;
    if (!isRace) {
      buttonPrev.disabled = this.isRaceButtonPrev;
      buttonNext.disabled = this.isRaceButtonNext;
      buttonUpdate.disabled = this.isRaceButtonUpdate;
    }
  };

  static disableStartStopButtonRace = (isRace: boolean) => {
    (document.querySelectorAll('.start-stop-car__start-button')).forEach((el) => {
      const elButton = el;
      ((elButton as HTMLButtonElement).disabled = isRace);
    });
    (document.querySelectorAll('.start-stop-car__stop-button')).forEach((el) => {
      const elButton = el;
      ((elButton as HTMLButtonElement).disabled = isRace);
    });
  };

  static enableStartButtonRace = (id: string) => {
    const startButton = document.querySelector(`[data-start-id="${id}"]`) as HTMLButtonElement;
    startButton.disabled = false;
  };

  public disableEnableButtonCar = (isRace: boolean) => {
    (document.querySelector('.create-form__button') as HTMLButtonElement).disabled = isRace;
    (document.querySelector('.edit-form__button') as HTMLButtonElement).disabled = isRace;
    (document.querySelector('.controls__button-race') as HTMLButtonElement).disabled = isRace;
    (document.querySelector('.controls__button-reset') as HTMLButtonElement).disabled = isRace;
    (document.querySelector('.controls__button-generator') as HTMLButtonElement).disabled = isRace;
    (document.querySelectorAll('.car-buttons__select,  .car-buttons__remove')).forEach((el) => {
      const elButton = el;
      ((elButton as HTMLButtonElement).disabled = isRace);
    });

    const buttonPrev = (document.querySelector('.pagination-garage__prev') as HTMLButtonElement);
    const buttonNext = (document.querySelector('.pagination-garage__next') as HTMLButtonElement);
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

  static changePage(e: Event) {
    const main = document.querySelector('.main') as HTMLElement;
    const paginationButtonsGarage = document.querySelector('.pagination-garage') as HTMLButtonElement;
    const editForm = document.querySelector('.create-edit-form') as HTMLDivElement;
    const paginationButtonsWinners = document.querySelector('.pagination-winners') as HTMLDivElement;
    const winnersTable = document.querySelector('.winners') as HTMLElement;
    if ((e.target as HTMLButtonElement).classList.contains('main-button__garage')) {
      main.classList.remove('hidden');
      paginationButtonsGarage.classList.remove('hidden');
      editForm.classList.remove('hidden');
      paginationButtonsWinners.classList.add('hidden');
      winnersTable.classList.add('hidden');
    } else {
      main.classList.add('hidden');
      paginationButtonsGarage.classList.add('hidden');
      editForm.classList.add('hidden');
      paginationButtonsWinners.classList.remove('hidden');
      winnersTable.classList.remove('hidden');
    }
  }
}

export default View;
