import noUiSlider from 'nouislider';
import { ITargetElement, IGoods } from '../../types';
import 'nouislider/dist/nouislider.css';
import data from '../goods/goods.json';
//import FilterByName from '../filter/filterByName';

class Range {
    private data: IGoods[];

    constructor() {
        this.data = data;
    }

    public rangeSliderByCount(): void {
        const countSlider = document.querySelector('.range-slider-by-count') as ITargetElement;

        const filteredByCount = data.map((item) => {
            return {
                quantityValue: Number(item.quantityValue),
            };
        });

        const minCount = filteredByCount.reduce((acc, curr) => (acc.quantityValue < curr.quantityValue ? acc : curr));
        const maxCount = filteredByCount.reduce((acc, curr) => (acc.quantityValue > curr.quantityValue ? acc : curr));

        noUiSlider.create(countSlider, {
            start: [1, 12],
            connect: true,
            tooltips: [true, true],
            step: 1,
            range: {
                min: minCount.quantityValue,
                max: maxCount.quantityValue,
            },
            format: {
                to: (value) => Math.floor(value),
                from: (value) => Math.floor(Number(value)),
            },
        });

        const countValues = [
            document.querySelector('.slider-count-snap-value-lower') as ITargetElement,
            document.querySelector('.slider-count-snap-value-upper') as ITargetElement,
        ];

        countSlider.noUiSlider.on('update', function (values, handle) {
            countValues[handle].innerHTML = String(values[handle]);
        });
    }

    public rangeSliderByYear(): void {
        const yearSlider = document.querySelector('.range-slider-by-year') as ITargetElement;

        const filteredByYear = data.map((item) => {
            return {
                yearValue: +item.yearValue,
            };
        });

        const minYear = filteredByYear.reduce((acc, curr) => (acc.yearValue < curr.yearValue ? acc : curr));
        const maxYear = filteredByYear.reduce((acc, curr) => (acc.yearValue > curr.yearValue ? acc : curr));

        noUiSlider.create(yearSlider, {
            start: [2000, 2022],
            connect: true,
            tooltips: [true, true],
            step: 1,
            range: {
                min: minYear.yearValue,
                max: maxYear.yearValue,
            },
            format: {
                to: (value) => Math.floor(value),
                from: (value) => Math.floor(Number(value)),
            },
        });

        const snapValues = [
            document.querySelector('.slider-year-snap-value-lower') as ITargetElement,
            document.querySelector('.slider-year-snap-value-upper') as ITargetElement,
        ];

        yearSlider.noUiSlider.on('update', function (values, handle) {
            snapValues[handle].innerHTML = String(values[handle]);
        });
    }
}

export default Range;
