import View from '../view/view';
import Api from './api';

class EditCar extends Api {
  private id: string | null;

  constructor() {
    super();
    this.view = new View();
    this.id = '';
  }

  public async editCar(e: Event) {
    this.id = (e.target as HTMLElement).getAttribute('data-select-id');
    if (this.id) {
      const form = document.querySelector('.edit-form') as HTMLFormElement;
      const inputName = document.querySelector('.edit-form__input') as HTMLInputElement;
      const inputColor = document.querySelector('.edit-form__color') as HTMLInputElement;
      const buttonUpdate = document.querySelector('.edit-form__button') as HTMLButtonElement;

      inputName.style.pointerEvents = 'auto';
      inputColor.style.pointerEvents = 'auto';
      buttonUpdate.disabled = false;

      const getFormValue = async (event: Event) => {
        console.log(this.id);
        event.preventDefault();
        const name = inputName.value;
        const color = inputColor.value;
        await this.updateCar(Number(this.id), { name, color });
        const car = await this.getCar(Number(this.id));
        console.log(car);
        this.view.renderCar(car, Number(this.id));
        inputName.style.pointerEvents = 'none';
        inputColor.style.pointerEvents = 'none';
        buttonUpdate.disabled = true;
      };
      console.log(this.id);
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

  public async removeCar(e: Event) {
    // const form = document.querySelector('.edit-form') as HTMLFormElement;
    const inputName = document.querySelector('.edit-form__input') as HTMLInputElement;
    const inputColor = document.querySelector('.edit-form__color') as HTMLInputElement;
    const buttonUpdate = document.querySelector('.edit-form__button') as HTMLButtonElement;
    console.log(e.target);
    const id = (e.target as HTMLElement).getAttribute('data-remove-id');
    if (id) {
      await this.deleteCar(Number(id));
      const { count } = (await this.getCars(1));
      View.deleteCar(Number(id), count);
    }
    if (buttonUpdate.disabled === false) {
      inputName.style.pointerEvents = 'none';
      inputColor.style.pointerEvents = 'none';
      buttonUpdate.disabled = true;
      // form.removeEventListener('submit', getFormValue);
    }
  }
}

export default EditCar;
