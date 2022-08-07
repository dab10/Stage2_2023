import Api from './api';
import View from '../view/view';

class Pagination extends Api {
  public moveNext = async () => {
    const buttonNext = document.querySelector('.pagination-garage__next') as HTMLButtonElement;
    const buttonPrev = document.querySelector('.pagination-garage__prev') as HTMLButtonElement;
    const currentPageString = (document.querySelector('.page') as HTMLElement).getAttribute('data-page-id');
    let currentPage = Number(currentPageString);
    currentPage += 1;
    const { items, count } = (await this.getCars(currentPage));
    View.renderNewCars(items, count, currentPage);
    if (currentPage > 1) buttonPrev.disabled = false;
    if (currentPage === Math.ceil(Number(count) / 7)) buttonNext.disabled = true;
  };

  public movePrev = async () => {
    const buttonNext = document.querySelector('.pagination-garage__next') as HTMLButtonElement;
    const buttonPrev = document.querySelector('.pagination-garage__prev') as HTMLButtonElement;
    const currentPageString = (document.querySelector('.page') as HTMLElement).getAttribute('data-page-id');
    let currentPage = Number(currentPageString);
    currentPage -= 1;
    const { items, count } = (await this.getCars(currentPage));
    View.renderNewCars(items, count, currentPage);
    if (currentPage === 1) buttonPrev.disabled = true;
    if (currentPage <= Math.floor(Number(count) / 7)) buttonNext.disabled = false;
  };

  public moveNextWinners = async () => {
    const buttonNext = document.querySelector('.pagination-winners__next') as HTMLButtonElement;
    const buttonPrev = document.querySelector('.pagination-winners__prev') as HTMLButtonElement;
    const currentPageString = (document.querySelector('.page-winners') as HTMLElement).getAttribute('data-page-winners-id');
    let currentPage = Number(currentPageString);
    currentPage += 1;
    const { items, count } = (await this.getWinners({
      page: currentPage, limit: 10, sort: 'wins', order: 'asc',
    }));
    View.renderStartTableWinners(items, count, currentPage);
    if (currentPage > 1) buttonPrev.disabled = false;
    if (currentPage === Math.ceil(Number(count) / 10)) buttonNext.disabled = true;
  };

  public movePrevWinners = async () => {
    const buttonNext = document.querySelector('.pagination-winners__next') as HTMLButtonElement;
    const buttonPrev = document.querySelector('.pagination-winners__prev') as HTMLButtonElement;
    const currentPageString = (document.querySelector('.page-winners') as HTMLElement).getAttribute('data-page-winners-id');
    let currentPage = Number(currentPageString);
    currentPage -= 1;
    const { items, count } = (await this.getWinners({
      page: currentPage, limit: 10, sort: 'wins', order: 'asc',
    }));
    View.renderStartTableWinners(items, count, currentPage);
    if (currentPage === 1) buttonPrev.disabled = true;
    if (currentPage <= Math.floor(Number(count) / 10)) buttonNext.disabled = false;
  };
}

export default Pagination;
