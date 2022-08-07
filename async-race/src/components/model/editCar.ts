import View from '../view/view';
import Api from './api';

class EditCar extends Api {
  private id: string | null;

  private currentPage: number;

  private carBrand: string[];

  private carModel: string[];

  private letters: string;

  constructor() {
    super();
    this.view = new View();
    this.id = '';
    this.currentPage = 1;
    this.carBrand = ['Hyundai', 'Lada', 'Kia', 'Toyota', 'Ford', 'Tesla', 'BMW', 'Mercedes', 'Honda', 'Renault', 'Peugeot'];
    this.carModel = ['Solaris', 'Granta', 'Rio', 'Vesta', 'Creta', 'Camry', 'RAV4', 'F-Series', 'Model S', 'WR-V', 'Clio', '308'];
    this.letters = '0123456789ABCDEF';
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
        event.preventDefault();
        console.log(inputName, inputColor);
        const name = inputName.value;
        const color = inputColor.value;
        await this.updateCar(Number(this.id), { name, color });
        const car = await this.getCar(Number(this.id));
        this.view.renderCurrentCar(car, Number(this.id));
        inputName.style.pointerEvents = 'none';
        inputColor.style.pointerEvents = 'none';
        buttonUpdate.disabled = true;
      };
      form.addEventListener('submit', (event) => getFormValue(event));
    }
  }

  public async createNewCar(e: Event) {
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
    this.view.renderNewCars(items, count, Number(currentPage));
    if (Number(count) % 7 === 1 && Number(count) !== 1) buttonNext.disabled = false;
  }

  public async removeCar(e: Event) {
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

      if ((Number(count) / 7 + 1) === currentPage) {
        currentPage -= 1;
      }

      const { items } = (await this.getCars(currentPage));
      this.view.renderNewCars(items, count, currentPage);

      if (Number(count) === 7) {
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

  private generateRandomName = () => {
    const brand = this.carBrand[Math.floor(Math.random() * this.carBrand.length)];
    const model = this.carModel[Math.floor(Math.random() * this.carModel.length)];
    return `${brand} ${model}`;
  };

  private generateRandomColor = () => {
    let colorRandom = '#';
    for (let i = 0; i < 6; i += 1) {
      colorRandom += this.letters[Math.floor(Math.random() * this.letters.length)];
    }
    return colorRandom;
  };

  public generateCars = async () => {
    const buttonNext = document.querySelector('.pagination-garage__next') as HTMLButtonElement;
    const currentPageString = (document.querySelector('.page') as HTMLElement).getAttribute('data-page-id');
    const currentPage = Number(currentPageString);

    const generateCarsArr = (count: number) => new Array(count).fill(1).map(() => ({
      name: this.generateRandomName(), color: this.generateRandomColor(),
    }));
    const generateCarsArrResult = generateCarsArr(100);
    console.log(generateCarsArrResult);
    generateCarsArrResult.map(async (el) => {
      await this.createCar({
        name: el.name,
        color: el.color,
        id: 0,
      });
    });
    const { items, count } = (await this.getCars(Number(currentPage)));
    this.view.renderNewCars(items, count, Number(currentPage));
    buttonNext.disabled = false;
  };
}

export default EditCar;
