import {
  headerStart, footerStart, mainStart, paginationGarage, renderCar,
} from './templates';

import { Cars } from '../../types';

class View {
  private header: HTMLElement;

  private main: HTMLElement;

  private paginationGarage: HTMLElement;

  private footer: HTMLElement;

  private isStarted: boolean;

  constructor() {
    this.header = document.createElement('header');
    this.header.classList.add('header');
    this.main = document.createElement('main');
    this.main.classList.add('main');
    this.paginationGarage = document.createElement('div');
    this.footer = document.createElement('footer');
    this.isStarted = false;
  }

  public renderStartPage = (cars: Cars[], count: string) => {
    this.header.insertAdjacentHTML('afterbegin', headerStart);
    this.main.insertAdjacentHTML('afterbegin', mainStart(cars, count, this.isStarted));
    this.paginationGarage.insertAdjacentHTML('afterbegin', paginationGarage);
    this.footer.insertAdjacentHTML('afterbegin', footerStart);
    document.body.append(this.header, this.main, this.paginationGarage, this.footer);
    const buttonNext = document.querySelector('.pagination-garage__next') as HTMLButtonElement;
    if (Number(count) > 7) buttonNext.disabled = false;
  };

  public renderCurrentCar = (car: Cars, id: number) => {
    if (id) {
      const carUpdate = document.querySelector(`[data-car-id="${id}"]`) as HTMLLIElement;
      if (carUpdate) {
        carUpdate.innerHTML = '';
        carUpdate.innerHTML = renderCar(car, this.isStarted);
      }
    }
    this.main.append(renderCar(car, this.isStarted));
  };

  static deleteCar = (id: number, count: string) => {
    const countCar = document.querySelector('.count-car') as HTMLElement;
    const carDelete = document.querySelector(`[data-car-id="${id}"]`) as HTMLLIElement;
    countCar.innerHTML = '';
    countCar.innerHTML = `Garage (${count})`;
    carDelete.remove();
  };

  public renderNewCars = (cars: Cars[], count: string, page: number) => {
    const main = document.querySelector('.main') as HTMLElement;
    main.innerHTML = '';
    main.innerHTML = mainStart(cars, count, this.isStarted, page);
  };

  static renderPageNumber = (count: number) => {
    const pageNumber = document.querySelector('.page') as HTMLElement;
    pageNumber.innerHTML = '';
    pageNumber.innerHTML = `Page #${count}`;
  };
}

export default View;
