import View from '../view/view';
import Api from './api';

class EditCar extends Api {
  constructor() {
    super();
    this.view = new View();
  }

  public async editCar(e: Event) {
    const id = (e.target as HTMLElement).getAttribute('data-select-id');
    if (id) {
      const form = document.querySelector('.edit-form') as HTMLFormElement;
      const inputName = document.querySelector('.edit-form__input') as HTMLInputElement;
      const inputColor = document.querySelector('.edit-form__color') as HTMLInputElement;
      const buttonUpdate = document.querySelector('.edit-form__button') as HTMLButtonElement;

      inputName.style.pointerEvents = 'auto';
      inputColor.style.pointerEvents = 'auto';
      buttonUpdate.disabled = false;

      const getFormValue = async (event: Event) => {
        event.preventDefault();
        const name = inputName.value;
        const color = inputColor.value;
        await this.updateCar(Number(id), { name, color });
        const car = await this.getCar(Number(id));
        console.log(car);
        this.view.renderCar(car, Number(id));
        inputName.style.pointerEvents = 'none';
        inputColor.style.pointerEvents = 'none';
        buttonUpdate.disabled = true;
      };

      form.addEventListener('submit', (event) => getFormValue(event));
    }
  }

  public async createNewCar(e: Event) {
    e.preventDefault();
    const inputName = document.querySelector('.create-form__input') as HTMLInputElement;
    const inputColor = document.querySelector('.create-form__color') as HTMLInputElement;
    const name = inputName.value;
    const color = inputColor.value;
    await this.createCar({
      name,
      color,
      id: 0,
    });
    const { items, count } = (await this.getCars(1));
    this.view.renderNewCar(items, count);
  }
}

export default EditCar;
