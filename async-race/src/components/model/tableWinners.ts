import Api from './api';
import View from '../view/view';
import { Order, Sort } from '../../types';

class TableWinners extends Api {
  public sorting = async (sort: Sort, order: Order) => {
    const buttonNext = document.querySelector('.pagination-winners__next') as HTMLButtonElement;
    const currentPageString = (document.querySelector('.page-winners') as HTMLElement).getAttribute('data-page-winners-id');
    const currentPage = Number(currentPageString);
    const { items, count } = await this.getWinners({
      page: currentPage, limit: this.winnersPerPage, sort, order,
    });
    View.renderStartTableWinners(items, count, currentPage);
    const isCarsMoreThanWinnersPerPage = Number(count) % this.winnersPerPage === 1;
    const isOneWinnerCar = Number(count) === 1;
    if (isCarsMoreThanWinnersPerPage && !isOneWinnerCar) {
      buttonNext.disabled = false;
    }
    const isLastPage = Math.ceil(Number(count) / this.winnersPerPage) === currentPage;
    if (isLastPage) {
      buttonNext.disabled = true;
    }
  };
}

export default TableWinners;
