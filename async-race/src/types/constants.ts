export const CAR_WIDTH = 140;

export const TIME_BETWEEN_RACE = 3000;

export const MILLISECOND_TO_SECOND_RATIO = 1000;

export const FRAMES_PER_SECOND = 60;

export const BASE_URL = 'http://localhost:3000';

export const START_PAGE_GARAGE = 1;

export const START_PAGE_WINNERS = 1;

export const CARS_PER_PAGE = 7;

export const WINNERS_PER_PAGE = 10;

export const CAR_BRANDS = ['Hyundai', 'Lada', 'Kia', 'Toyota', 'Ford', 'Tesla', 'BMW', 'Mercedes', 'Honda', 'Renault', 'Peugeot'];

export const CAR_MODELS = ['Solaris', 'Granta', 'Rio', 'Vesta', 'Creta', 'Camry', 'RAV4', 'F-Series', 'Model S', 'CR-V', 'Clio', '308'];

export const LETTERS_OF_COLOR = '0123456789ABCDEF';

export const COLOR_NAME_LENGTH = 6;

export const NUMBER_RANDOM_CARS = 100;

export const BUTTON_CLASSNAMES = {
  startButton: 'data-start-id',
  stopButton: 'data-stop-id',

  getStartButtonId(id: string) {
    return `[${this.startButton}="${id}"]`;
  },

  getStopButtonId(id: string) {
    return `[${this.stopButton}="${id}"]`;
  },
};

export const CAR_CLASS_NAME = {
  car: 'data-car-animation-id',
  getCarId(id: string) {
    return `[${this.car}="${id}"]`;
  },
};

export const BUTTON_RESET_CLASS_NAME = '.controls__button-reset';
