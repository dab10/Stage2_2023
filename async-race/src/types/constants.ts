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
  carContainer: 'data-car-id',

  getCarId(id: string) {
    return `[${this.car}="${id}"]`;
  },

  getIdFromCarContainer(id: string) {
    return `[${this.carContainer}="${id}"]`;
  },
};

export const CURRENT_PAGE = 'data-page-id';

export const CURRENT_WINNERS_PAGE = 'data-page-winners-id';

export const BUTTON_RESET_CLASS_NAME = '.controls__button-reset';

export const BUTTON_NEXT_CLASS_NAME = '.pagination-garage__next';

export const BUTTON_PREV_CLASS_NAME = '.pagination-garage__prev';

export const BUTTON_NEXT_WINNERS_CLASS_NAME = '.pagination-winners__next';

export const BUTTON_PREV_WINNERS_CLASS_NAME = '.pagination-winners__prev';

export const BUTTON_CREATE_CLASS_NAME = '.create-form__button';

export const BUTTON_RACE_CLASS_NAME = '.controls__button-race';

export const BUTTON_GENERATOR_CLASS_NAME = '.controls__button-generator';

export const BUTTON_SELECT_CLASS_NAME = '.car-buttons__select';

export const BUTTON_REMOVE_CLASS_NAME = '.car-buttons__remove';

export const BUTTON_START_CLASS_NAME = '.start-stop-car__start-button';

export const BUTTON_EDIT_CLASS_NAME = '.edit-form__button';

export const INPUT_EDIT_CLASS_NAME = '.edit-form__input';

export const COLOR_EDIT_CLASS_NAME = '.edit-form__color';

export const HIDDEN_CLASS_NAME = 'hidden';

export const POPUP_CLASS_NAME = '.popup';

export const POPUP_BROKEN_CLASS_NAME = '.popup-broken-car';

export const WINNER_PAGE_NUMBER_DISPLAY_CLASS_NAME = '.page-winners';

export const PAGE_NUMBER_DISPLAY_CLASS_NAME = '.page';
