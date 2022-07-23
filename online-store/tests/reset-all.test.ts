import Filter from '../src/components/filter/filter';
import ResetAll from '../src/components/filter/reset-all';
import data from '../src/components/goods/goods.json';
import { IFilter, filterWordsEmpty } from '../src/types/index';

document.body.innerHTML = `
<span class="counter">0</span>
<div class="reset">
    <button class="reset-filter">Сброс фильтров</button>
    <button class="reset-all">Сброс настроек</button>
</div>
<div class="item-list"></div>
<div class="no-result"></div>
<template id="items">
    <div class="item">
        <h4 class="item__title"></h4>
        <div class="item__img-container">
            <img class="item__img">
        </div>
        <ul class="item__props">
            <li><li>
            <li><li>
            <li><li>
        </ul>
        <div class="ribbon-class"></div>
    </div>
</template>
`;

const classResetAll = new ResetAll();

describe('Class ResetAll', () => {
    test('Check contain filterWords', () => {
        const resetAll = document.querySelector('.reset-all') as HTMLButtonElement;
        resetAll.click();
        expect(classResetAll.getResetAllFilterWords()).toMatchObject(filterWordsEmpty);
    });
});
