import Api from './api';
import View from '../view/view';
import { Order, Sort } from '../../types';
import { BUTTON_NEXT_WINNERS_CLASS_NAME, CURRENT_WINNERS_PAGE, WINNER_PAGE_NUMBER_DISPLAY_CLASS_NAME } from '../../types/constants';

class TableWinners extends Api {
  public sorting = async (sort: Sort, order: Order): Promise<void> => {
    const buttonNext = document.querySelector(BUTTON_NEXT_WINNERS_CLASS_NAME) as HTMLButtonElement;
    const currentPageString = (document.querySelector(
      WINNER_PAGE_NUMBER_DISPLAY_CLASS_NAME,
    ) as HTMLElement).getAttribute(CURRENT_WINNERS_PAGE);
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
