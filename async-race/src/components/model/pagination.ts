import Api from './api';

class Pagination extends Api {
  public moveNext = async () => {
    const { items, count } = (await this.getCars(1));
    console.log(items, count);
  };
}

export default Pagination;
