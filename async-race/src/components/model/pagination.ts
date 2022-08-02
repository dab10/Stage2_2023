import Api from './api';

class Pagination extends Api {
  public moveNext = async () => {
    const buttonNext = document.querySelector('.pagination-garage__next') as HTMLButtonElement;
    const buttonPrev = document.querySelector('.pagination-garage__prev') as HTMLButtonElement;
    const currentPageString = (document.querySelector('.page') as HTMLElement).getAttribute('data-page-id');
    let currentPage = Number(currentPageString);
    currentPage += 1;
    const { items, count } = (await this.getCars(currentPage));
    this.view.renderNewCars(items, count, currentPage);
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
    this.view.renderNewCars(items, count, currentPage);
    if (currentPage === 1) buttonPrev.disabled = true;
    if (currentPage <= Math.floor(Number(count) / 7)) buttonNext.disabled = false;
  };
}

export default Pagination;
