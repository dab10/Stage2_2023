import {
  BUTTON_EDIT_CLASS_NAME,
  BUTTON_NEXT_CLASS_NAME,
  BUTTON_PREV_CLASS_NAME,
  CAR_BRANDS, CAR_MODELS,
  COLOR_EDIT_CLASS_NAME,
  COLOR_NAME_LENGTH,
  CURRENT_PAGE,
  INPUT_EDIT_CLASS_NAME,
  LETTERS_OF_COLOR,
  NUMBER_RANDOM_CARS,
  PAGE_NUMBER_DISPLAY_CLASS_NAME,
} from '../../types/constants';
import View from '../view/view';
import Api from './api';

class EditCar extends Api {
  private id: number;

  private carBrand: string[];

  private carModel: string[];

  private lettersOfColor: string;

  constructor() {
    super();
    this.view = new View();
    this.id = 0;
    this.carBrand = CAR_BRANDS;
    this.carModel = CAR_MODELS;
    this.lettersOfColor = LETTERS_OF_COLOR;
  }

  public editCar = async (editEvent: Event): Promise<void> => {
    const selectButton = editEvent.target as HTMLElement;
    this.id = Number(selectButton.getAttribute('data-select-id'));
    if (this.id) {
      const form = document.querySelector('.edit-form') as HTMLFormElement;
      const inputName = document.querySelector(INPUT_EDIT_CLASS_NAME) as HTMLInputElement;
      const inputColor = document.querySelector(COLOR_EDIT_CLASS_NAME) as HTMLInputElement;
      const buttonUpdate = document.querySelector(BUTTON_EDIT_CLASS_NAME) as HTMLButtonElement;

      inputName.style.pointerEvents = 'auto';
      inputColor.style.pointerEvents = 'auto';
      buttonUpdate.disabled = false;

      const getFormValue = async (event: Event): Promise<void> => {
        event.preventDefault();
        const name = inputName.value;
        const color = inputColor.value;
        await this.updateCar(this.id, { name, color });
        const car = await this.getCar(this.id);
        this.view.renderCurrentCar(car, this.id);
        inputName.style.pointerEvents = 'none';
        inputColor.style.pointerEvents = 'none';
        buttonUpdate.disabled = true;
        this.winnersForStartPage();
      };
      form.addEventListener('submit', (event) => getFormValue(event));
    }
  };

  public createNewCar = async (event: Event): Promise<void> => {
    event.preventDefault();
    const buttonNext = document.querySelector(BUTTON_NEXT_CLASS_NAME) as HTMLButtonElement;
    const inputName = document.querySelector('.create-form__input') as HTMLInputElement;
    const inputColor = document.querySelector('.create-form__color') as HTMLInputElement;
    const currentPage = (document.querySelector(
      PAGE_NUMBER_DISPLAY_CLASS_NAME,
    ) as HTMLElement).getAttribute(CURRENT_PAGE);
    const name = inputName.value;
    const color = inputColor.value;
    await this.createCar({
      name,
      color,
      id: 0,
    });
    const { items, count } = (await this.getCars(Number(currentPage)));
    View.renderNewCars(items, count, Number(currentPage));
    const isCarsMoreThanCarsPerPage = Number(count) % this.carsPerPage === 1;
    const isOneCar = Number(count) === 1;
    if (isCarsMoreThanCarsPerPage && !isOneCar) {
      buttonNext.disabled = false;
    }
  };

  public removeCar = async (event: Event): Promise<void> => {
    const buttonNext = document.querySelector(BUTTON_NEXT_CLASS_NAME) as HTMLButtonElement;
    const buttonPrev = document.querySelector(BUTTON_PREV_CLASS_NAME) as HTMLButtonElement;
    const inputName = document.querySelector(INPUT_EDIT_CLASS_NAME) as HTMLInputElement;
    const inputColor = document.querySelector(COLOR_EDIT_CLASS_NAME) as HTMLInputElement;
    const buttonUpdate = document.querySelector(BUTTON_EDIT_CLASS_NAME) as HTMLButtonElement;
    const currentPageString = (document.querySelector(
      PAGE_NUMBER_DISPLAY_CLASS_NAME,
    ) as HTMLElement).getAttribute(CURRENT_PAGE);
    let currentPage = Number(currentPageString);
    const removeButton = event.target as HTMLElement;
    const id = removeButton.getAttribute('data-remove-id');
    let count;
    if (id) {
      await this.deleteCar(Number(id));
      ({ count } = (await this.getCars(currentPage)));

      const isHasCarOnPage = (Number(count) / this.carsPerPage + 1) === currentPage;
      if (isHasCarOnPage) {
        currentPage -= 1;
      }

      const { items } = (await this.getCars(currentPage));
      View.renderNewCars(items, count, currentPage);
    }
    const isNumbersOfCarsCarsPerPage = Number(count) === this.carsPerPage;
    if (isNumbersOfCarsCarsPerPage) {
      buttonNext.disabled = true;
      buttonPrev.disabled = true;
    }
    const isButtonUpdateDisabled = buttonUpdate.disabled === true;
    if (!isButtonUpdateDisabled) {
      inputName.style.pointerEvents = 'none';
      inputColor.style.pointerEvents = 'none';
      buttonUpdate.disabled = true;
    }
    await this.deleteWinner(Number(id));
    await this.winnersForStartPage();
  };

  private generateRandomName = (): string => {
    const brand = this.carBrand[Math.floor(Math.random() * this.carBrand.length)];
    const model = this.carModel[Math.floor(Math.random() * this.carModel.length)];
    return `${brand} ${model}`;
  };

  private generateRandomColor = (): string => {
    let colorRandom = '#';
    for (let i = 0; i < COLOR_NAME_LENGTH; i += 1) {
      colorRandom += this.lettersOfColor[Math.floor(Math.random() * this.lettersOfColor.length)];
    }
    return colorRandom;
  };

  public generateCars = async (): Promise<void> => {
    const buttonNext = document.querySelector(BUTTON_NEXT_CLASS_NAME) as HTMLButtonElement;
    const currentPageString = (document.querySelector(
      PAGE_NUMBER_DISPLAY_CLASS_NAME,
    ) as HTMLElement).getAttribute(CURRENT_PAGE);
    const currentPage = Number(currentPageString);

    const generateCarsArray = (count: number) => new Array(count).fill(1).map(() => ({
      name: this.generateRandomName(), color: this.generateRandomColor(),
    }));
    const generateCarsArrayResult = generateCarsArray(NUMBER_RANDOM_CARS);
    generateCarsArrayResult.map(async (element) => {
      await this.createCar({
        name: element.name,
        color: element.color,
        id: 0,
      });
    });
    const { items, count } = (await this.getCars(currentPage));
    View.renderNewCars(items, count, currentPage);
    buttonNext.disabled = false;
  };
}

export default EditCar;
