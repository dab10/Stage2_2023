import Filter from '../src/components/filter/filter';
import data from '../src/components/goods/goods.json';
import { IFilter, filterWordsEmpty } from '../src/types/index';

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

const classFilter = new Filter();

describe('Class Filter', () => {
    test('Check draw after filter', () => {
        const filterWords: IFilter = filterWordsEmpty;
        filterWordsEmpty.id = ['1'];
        classFilter.filterItems(filterWords, data);
        const el = document.querySelector('.item__title') as HTMLElement;
        expect(el.innerHTML).toBe('Apple iPhone 11');
    });
    test('Check setCountRibbon', () => {
        const n = 7;
        classFilter.setCountRibbon(n);
        const counter = document.querySelector('.counter') as HTMLSpanElement;
        expect(counter.textContent).toBe('7');
    });
    test('Check filterByValue', () => {
        const filterByValue = document.querySelector('.apple') as HTMLButtonElement;
        filterByValue.click();
        const el = document.querySelector('.item__title') as HTMLElement;
        expect(el.innerHTML).not.toBe('Samsung');
    });
    test('Check filterByValue', () => {
        const filterByValue = document.querySelector('.apple') as HTMLButtonElement;
        filterByValue.click();
        const el = document.querySelector('.item__title') as HTMLElement;
        expect(el.innerHTML).not.toBe('Samsung');
    });
    test('Check getFilterWords', () => {
        expect(classFilter.getFilterWords()).toBeDefined();
    });
});
