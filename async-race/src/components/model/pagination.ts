import Api from './api';
import View from '../view/view';
import {
  BUTTON_NEXT_CLASS_NAME,
  BUTTON_NEXT_WINNERS_CLASS_NAME,
  BUTTON_PREV_CLASS_NAME,
  BUTTON_PREV_WINNERS_CLASS_NAME,
  CURRENT_PAGE,
  CURRENT_WINNERS_PAGE,
  PAGE_NUMBER_DISPLAY_CLASS_NAME,
  WINNER_PAGE_NUMBER_DISPLAY_CLASS_NAME,
} from '../../types/constants';

class Pagination extends Api {
  public moveNext = async (): Promise<void> => {
    const buttonNext = document.querySelector(BUTTON_NEXT_CLASS_NAME) as HTMLButtonElement;
    const buttonPrev = document.querySelector(BUTTON_PREV_CLASS_NAME) as HTMLButtonElement;
    const currentPageString = (document.querySelector(
      PAGE_NUMBER_DISPLAY_CLASS_NAME,
    ) as HTMLElement).getAttribute(CURRENT_PAGE);
    let currentPage = Number(currentPageString);
    currentPage += 1;
    const { items, count } = (await this.getCars(currentPage));
    View.renderNewCars(items, count, currentPage);
    const isPageAnotherThanFirst = currentPage > 1;
    if (isPageAnotherThanFirst) {
      buttonPrev.disabled = false;
    }
    const isLastPage = currentPage === Math.ceil(Number(count) / this.carsPerPage);
    if (isLastPage) {
      buttonNext.disabled = true;
    }
  };

  public movePrev = async (): Promise<void> => {
    const buttonNext = document.querySelector(BUTTON_NEXT_CLASS_NAME) as HTMLButtonElement;
    const buttonPrev = document.querySelector(BUTTON_PREV_CLASS_NAME) as HTMLButtonElement;
    const currentPageString = (document.querySelector(
      PAGE_NUMBER_DISPLAY_CLASS_NAME,
    ) as HTMLElement).getAttribute(CURRENT_PAGE);
    let currentPage = Number(currentPageString);
    currentPage -= 1;
    const { items, count } = (await this.getCars(currentPage));
    View.renderNewCars(items, count, currentPage);
    const isFirstPage = currentPage === 1;
    if (isFirstPage) {
      buttonPrev.disabled = true;
    }
    const isLastPage = currentPage <= Math.floor(Number(count) / this.carsPerPage);
    if (isLastPage) {
      buttonNext.disabled = false;
    }
  };

  public moveNextWinners = async (): Promise<void> => {
    const buttonNext = document.querySelector(BUTTON_NEXT_WINNERS_CLASS_NAME) as HTMLButtonElement;
    const buttonPrev = document.querySelector(BUTTON_PREV_WINNERS_CLASS_NAME) as HTMLButtonElement;
    const currentPageString = (document.querySelector('') as HTMLElement).getAttribute(CURRENT_WINNERS_PAGE);
    let currentPage = Number(currentPageString);
    currentPage += 1;
    const { items, count } = (await this.getWinners({
      page: currentPage, limit: this.winnersPerPage, sort: 'wins', order: 'asc',
    }));
    View.renderStartTableWinners(items, count, currentPage);
    const isPageAnotherThanFirst = currentPage > 1;
    if (isPageAnotherThanFirst) {
      buttonPrev.disabled = false;
    }
    const isLastPage = currentPage === Math.ceil(Number(count) / this.winnersPerPage);
    if (isLastPage) {
      buttonNext.disabled = true;
    }
  };

  public movePrevWinners = async (): Promise<void> => {
    const buttonNext = document.querySelector(BUTTON_NEXT_WINNERS_CLASS_NAME) as HTMLButtonElement;
    const buttonPrev = document.querySelector(BUTTON_PREV_WINNERS_CLASS_NAME) as HTMLButtonElement;
    const currentPageString = (document.querySelector(
      WINNER_PAGE_NUMBER_DISPLAY_CLASS_NAME,
    ) as HTMLElement).getAttribute(CURRENT_WINNERS_PAGE);
    let currentPage = Number(currentPageString);
    currentPage -= 1;
    const { items, count } = (await this.getWinners({
      page: currentPage, limit: this.winnersPerPage, sort: 'wins', order: 'asc',
    }));
    View.renderStartTableWinners(items, count, currentPage);
    const isFirstPage = currentPage === 1;
    if (isFirstPage) {
      buttonPrev.disabled = true;
    }
    const isLastPage = currentPage <= Math.floor(Number(count) / this.winnersPerPage);
    if (isLastPage) {
      buttonNext.disabled = false;
    }
  };
}

export default Pagination;
