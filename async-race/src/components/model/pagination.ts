import Api from './api';
import View from '../view/view';

class Pagination extends Api {
  public moveNext = async (): Promise<void> => {
    const buttonNext = document.querySelector('.pagination-garage__next') as HTMLButtonElement;
    const buttonPrev = document.querySelector('.pagination-garage__prev') as HTMLButtonElement;
    const currentPageString = (document.querySelector('.page') as HTMLElement).getAttribute('data-page-id');
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
    const buttonNext = document.querySelector('.pagination-garage__next') as HTMLButtonElement;
    const buttonPrev = document.querySelector('.pagination-garage__prev') as HTMLButtonElement;
    const currentPageString = (document.querySelector('.page') as HTMLElement).getAttribute('data-page-id');
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
    const buttonNext = document.querySelector('.pagination-winners__next') as HTMLButtonElement;
    const buttonPrev = document.querySelector('.pagination-winners__prev') as HTMLButtonElement;
    const currentPageString = (document.querySelector('.page-winners') as HTMLElement).getAttribute('data-page-winners-id');
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
    const buttonNext = document.querySelector('.pagination-winners__next') as HTMLButtonElement;
    const buttonPrev = document.querySelector('.pagination-winners__prev') as HTMLButtonElement;
    const currentPageString = (document.querySelector('.page-winners') as HTMLElement).getAttribute('data-page-winners-id');
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
