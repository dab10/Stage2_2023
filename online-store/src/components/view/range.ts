import noUiSlider from 'nouislider';
import { ITargetElement, IGoods } from '../../types';
import 'nouislider/dist/nouislider.css';
import data from '../goods/goods.json';

class Range {
    private data: IGoods[];
    private minCount: number;
    private maxCount: number;
    private minYear: number;
    private maxYear: number;

    constructor() {
        this.data = data;
        this.minCount = 0;
        this.maxCount = 0;
        this.minYear = 0;
        this.maxYear = 0;
    }

    public getCountAndYear(): number[] {
        return [this.minCount, this.maxCount, this.minYear, this.maxYear];
    }

    public rangeSliderByCount(): void {
        const countSlider = document.querySelector('.range-slider-by-count') as ITargetElement;

        const filteredByCount = this.data.map((item) => {
            return {
                quantityValue: Number(item.quantityValue),
            };
        });

        this.minCount = filteredByCount.reduce((acc, curr) =>
            acc.quantityValue < curr.quantityValue ? acc : curr
        ).quantityValue;
        this.maxCount = filteredByCount.reduce((acc, curr) =>
            acc.quantityValue > curr.quantityValue ? acc : curr
        ).quantityValue;

        noUiSlider.create(countSlider, {
            start: [this.minCount, this.maxCount],
            connect: true,
            tooltips: [true, true],
            step: 1,
            range: {
                min: this.minCount,
                max: this.maxCount,
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

        const filteredByYear = this.data.map((item) => {
            return {
                yearValue: Number(item.yearValue),
            };
        });

        this.minYear = filteredByYear.reduce((acc, curr) => (acc.yearValue < curr.yearValue ? acc : curr)).yearValue;
        this.maxYear = filteredByYear.reduce((acc, curr) => (acc.yearValue > curr.yearValue ? acc : curr)).yearValue;

        noUiSlider.create(yearSlider, {
            start: [this.minYear, this.maxYear],
            connect: true,
            tooltips: [true, true],
            step: 1,
            range: {
                min: this.minYear,
                max: this.maxYear,
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
