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
    if (Number(count) % this.winnersPerPage === 1 && Number(count) !== 1) {
      buttonNext.disabled = false;
    }
    if (Math.ceil(Number(count) / this.winnersPerPage) === currentPage) {
      buttonNext.disabled = true;
    }
  };
}

export default TableWinners;
