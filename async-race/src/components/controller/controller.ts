import Api from '../model/api';

class Controller {
  private api: Api;

  constructor() {
    this.api = new Api();
  }

  public start() {
    this.api.carsForStartPage();
  }
}

export default Controller;
