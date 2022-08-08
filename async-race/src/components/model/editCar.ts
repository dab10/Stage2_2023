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
    this.carBrand = ['Hyundai', 'Lada', 'Kia', 'Toyota', 'Ford', 'Tesla', 'BMW', 'Mercedes', 'Honda', 'Renault', 'Peugeot'];
    this.carModel = ['Solaris', 'Granta', 'Rio', 'Vesta', 'Creta', 'Camry', 'RAV4', 'F-Series', 'Model S', 'CR-V', 'Clio', '308'];
    this.lettersOfColor = '0123456789ABCDEF';
  }

  public async editCar(e: Event): Promise<void> {
    this.id = Number((e.target as HTMLElement).getAttribute('data-select-id'));
    if (this.id) {
      const form = document.querySelector('.edit-form') as HTMLFormElement;
      const inputName = document.querySelector('.edit-form__input') as HTMLInputElement;
      const inputColor = document.querySelector('.edit-form__color') as HTMLInputElement;
      const buttonUpdate = document.querySelector('.edit-form__button') as HTMLButtonElement;

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
  }

  public async createNewCar(e: Event): Promise<void> {
    e.preventDefault();
    const buttonNext = document.querySelector('.pagination-garage__next') as HTMLButtonElement;
    const inputName = document.querySelector('.create-form__input') as HTMLInputElement;
    const inputColor = document.querySelector('.create-form__color') as HTMLInputElement;
    const currentPage = (document.querySelector('.page') as HTMLElement).getAttribute('data-page-id');
    const name = inputName.value;
    const color = inputColor.value;
    await this.createCar({
      name,
      color,
      id: 0,
    });
    const { items, count } = (await this.getCars(Number(currentPage)));
    View.renderNewCars(items, count, Number(currentPage));
    if (Number(count) % this.carsPerPage === 1 && Number(count) !== 1) buttonNext.disabled = false;
  }

  public async removeCar(e: Event): Promise<void> {
    const buttonNext = document.querySelector('.pagination-garage__next') as HTMLButtonElement;
    const buttonPrev = document.querySelector('.pagination-garage__prev') as HTMLButtonElement;
    const inputName = document.querySelector('.edit-form__input') as HTMLInputElement;
    const inputColor = document.querySelector('.edit-form__color') as HTMLInputElement;
    const buttonUpdate = document.querySelector('.edit-form__button') as HTMLButtonElement;
    const currentPageString = (document.querySelector('.page') as HTMLElement).getAttribute('data-page-id');
    let currentPage = Number(currentPageString);
    const id = (e.target as HTMLElement).getAttribute('data-remove-id');
    if (id) {
      await this.deleteCar(Number(id));
      const { count } = (await this.getCars(currentPage));

      if ((Number(count) / this.carsPerPage + 1) === currentPage) {
        currentPage -= 1;
      }

      const { items } = (await this.getCars(currentPage));
      View.renderNewCars(items, count, currentPage);

      if (Number(count) === this.carsPerPage) {
        buttonNext.disabled = true;
        buttonPrev.disabled = true;
      }
    }
    if (buttonUpdate.disabled === false) {
      inputName.style.pointerEvents = 'none';
      inputColor.style.pointerEvents = 'none';
      buttonUpdate.disabled = true;
    }
    await this.deleteWinner(Number(id));
    await this.winnersForStartPage();
  }

  private generateRandomName = (): string => {
    const brand = this.carBrand[Math.floor(Math.random() * this.carBrand.length)];
    const model = this.carModel[Math.floor(Math.random() * this.carModel.length)];
    return `${brand} ${model}`;
  };

  private generateRandomColor = (): string => {
    let colorRandom = '#';
    for (let i = 0; i < 6; i += 1) {
      colorRandom += this.lettersOfColor[Math.floor(Math.random() * this.lettersOfColor.length)];
    }
    return colorRandom;
  };

  public generateCars = async (): Promise<void> => {
    const buttonNext = document.querySelector('.pagination-garage__next') as HTMLButtonElement;
    const currentPageString = (document.querySelector('.page') as HTMLElement).getAttribute('data-page-id');
    const currentPage = Number(currentPageString);

    const generateCarsArr = (count: number) => new Array(count).fill(1).map(() => ({
      name: this.generateRandomName(), color: this.generateRandomColor(),
    }));
    const generateCarsArrResult = generateCarsArr(100);
    generateCarsArrResult.map(async (el) => {
      await this.createCar({
        name: el.name,
        color: el.color,
        id: 0,
      });
    });
    const { items, count } = (await this.getCars(currentPage));
    View.renderNewCars(items, count, currentPage);
    buttonNext.disabled = false;
  };
}

export default EditCar;
