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
  };

  public renderCar = (car: Cars, id: number) => {
    if (id) {
      const carUpdate = document.querySelector(`[data-car-id="${id}"]`) as HTMLLIElement;
      carUpdate.innerHTML = '';
      carUpdate.innerHTML = renderCar(car, this.isStarted);
    }
    this.main.append(renderCar(car, this.isStarted));
  };

  public renderNewCar = (cars: Cars[], count: string) => {
    const main = document.querySelector('.main') as HTMLElement;
    main.innerHTML = '';
    main.innerHTML = mainStart(cars, count, this.isStarted);
  };
}

export default View;
