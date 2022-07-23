import Goods from '../src/components/goods/goods';
import data from '../src/components/goods/goods.json';
import { IGoods } from '../src/types/index';

document.body.innerHTML = `
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

const classGoods = new Goods();

describe('Class Goods', () => {
    test('Check create title good', () => {
        classGoods.draw(data);
        const el = document.querySelector('.item__title') as HTMLElement;
        expect(el.innerHTML).toBe('Apple iPhone 11');
    });
    test('Check create hint when data is empty', () => {
        const emptyData: IGoods[] = [];
        classGoods.draw(emptyData);
        const el = document.querySelector('.no-result') as HTMLElement;
        expect(el.textContent).toBe('Извините, совпадений не обнаружено');
    });
    test('Check add class "ribbon"', () => {
        data[0].classRibbon = 'true';
        classGoods.draw(data);
        const el = document.querySelector('.ribbon-class') as HTMLElement;
        expect(el.classList.contains('ribbon')).toBe(true);
    });
});
