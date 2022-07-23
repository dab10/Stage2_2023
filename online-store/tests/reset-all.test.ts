import ResetAll from '../src/components/filter/reset-all';
import { filterWordsEmpty } from '../src/types/index';

document.body.innerHTML = `
<span class="counter">0</span>
<div class="filter-by-name">
    Производитель:
    <div class="filter-by-name__company">
        <button class="button apple">Apple</button>
        <button class="button samsung">Samsung</button>
        <button class="button xiaomi">Xiaomi</button>
    </div>
</div>
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
    test('Check contain filterWords', () => {
        const filterByValue = document.querySelector('.apple') as HTMLButtonElement;
        filterByValue.click();
        const resetAll = document.querySelector('.reset-all') as HTMLButtonElement;
        resetAll.click();
        const filterWordsEmptyFromResetAll = classResetAll.getResetAllFilterWords();
        expect(filterWordsEmptyFromResetAll.cameraValue).toHaveLength(0);
    });
});
