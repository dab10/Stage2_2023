import { INITIAL_STATE } from '../src/common/constants';
import { GameState } from '../src/application/gameState';
import gameData from '../src/assets/json/gameData.json';
import { Application } from '../src/application/application';

const TIME_ANIMATION = 1000;

beforeAll((done) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(gameData),
    })
  ) as jest.Mock;

  const state = new GameState(INITIAL_STATE);
  new Application(document.body, state);
  done();
});

describe('Application tests', () => {
  test('Check create all button', () => {
    const buttonElements = document.querySelectorAll('.level-button');

    expect(buttonElements).toHaveLength(gameData.length);
  });

  test('Check create reset button', () => {
    const resetButton = document.querySelector('.reset-button') as HTMLButtonElement;

    expect(resetButton).not.toBeUndefined();
  });

  test('Check choose level 5', () => {
    const pickButton = () =>
      document.querySelector('body > div > div.game-level > div > div:nth-child(5) > button') as HTMLButtonElement;

    let button = pickButton();

    button.click();

    button = pickButton();

    expect(button.classList.contains('active-level-button')).toBe(true);
  });

  test('Check use hint the 5 level', () => {
    const helpButton = document.querySelector('.help-button') as HTMLButtonElement;

    helpButton.click();

    const hintSymbol = document.querySelector(
      'body > div > div.game-level > div > div:nth-child(5) > div.complete-level-symbol-with-hint.complete-level'
    ) as HTMLButtonElement;

    expect(hintSymbol.classList.contains('complete-level')).toEqual(true);
  });

  test('Check text in input after press help button', async () => {
    const helpButton = document.querySelector('.help-button') as HTMLButtonElement;
    const inputField = document.querySelector(
      'body > div > div.game-editor > div > form > input.input-field'
    ) as HTMLInputElement;

    helpButton.click();

    setTimeout(() => {
      expect(inputField.value).toMatch('plate');
    }, TIME_ANIMATION);
  });

  test('Check move to next level', async () => {
    const enterButton = document.querySelector('.like-button ') as HTMLInputElement;

    enterButton.click();

    setTimeout(() => {
      const levelButton = document.querySelector(
        'body > div > div.game-level > div > div:nth-child(6) > button'
      ) as HTMLButtonElement;

      expect(levelButton.classList.contains('active-level-button')).toBeTruthy();
    }, TIME_ANIMATION);
  });

  test('Check moving element', async () => {
    const inputField = document.querySelector(
      'body > div > div.game-editor > div > form > input.input-field'
    ) as HTMLInputElement;
    inputField.value = 'plate';
    const enterButton = document.querySelector('.like-button ') as HTMLInputElement;
    const plate = document.querySelector('body > div > div.game-header > div > div > div > plate') as HTMLElement;

    enterButton.click();

    setTimeout(() => {
      expect(plate).toBeNull();
    }, TIME_ANIMATION);
  });

  test('Check animation incorrect answer', async () => {
    const inputField = document.querySelector(
      'body > div > div.game-editor > div > form > input.input-field'
    ) as HTMLInputElement;
    inputField.value = 'plate';
    const enterButton = document.querySelector('.like-button ') as HTMLInputElement;
    const containerEditor = document.querySelector('body > div > div.game-editor > div') as HTMLInputElement;

    enterButton.click();

    expect(containerEditor.classList.contains('shake')).toBeDefined();
  });

  test('Check reset progress', async () => {
    const resetButton = document.querySelector('.reset-button') as HTMLButtonElement;

    resetButton.click();

    const firstLevelButton = document.querySelector(
      'body > div > div.game-level > div > div:nth-child(1) > button'
    ) as HTMLButtonElement;

    expect(firstLevelButton.classList.contains('active-level-button')).toBe(true);
  });

  test('Check strobe animation on element', async () => {
    const elementWithAnimation = document.querySelector(
      'body > div > div.game-header > div > div > box:nth-child(1)'
    ) as HTMLElement;

    expect(elementWithAnimation.classList.contains('strobe')).not.toBeFalsy();
  });
});
