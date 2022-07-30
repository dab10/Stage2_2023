import {
  headerStart, footerStart, mainStart, paginationGarage,
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
    this.main = document.createElement('main');
    this.paginationGarage = document.createElement('div');
    this.footer = document.createElement('footer');
    this.isStarted = false;
  }

  public renderStartPage = (cars: Cars[], count: string | null) => {
    this.header.insertAdjacentHTML('afterbegin', headerStart);
    this.main.insertAdjacentHTML('afterbegin', mainStart(cars, count, this.isStarted));
    this.paginationGarage.insertAdjacentHTML('afterbegin', paginationGarage);
    this.footer.insertAdjacentHTML('afterbegin', footerStart);
    document.body.append(this.header, this.main, this.paginationGarage, this.footer);
  };
}

export default View;
