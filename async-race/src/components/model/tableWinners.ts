import Api from './api';
import View from '../view/view';
import { Order, Sort } from '../../types';

class TableWinners extends Api {
  public sorting = async (sort: Sort, order: Order) => {
    const { items, count } = await this.getWinners({
      page: 1, limit: 10, sort, order,
    });
    console.log(items);
    View.renderStartTableWinners(items, count);
  };
}

export default TableWinners;
