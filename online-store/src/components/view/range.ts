import noUiSlider from 'nouislider';
import { ITargetElement } from '../../types';
import 'nouislider/dist/nouislider.css';
//import FilterByName from '../filter/filterByName';

class Range {
    public rangeSliderByCount(): void {
        const countSlider = document.querySelector('.range-slider-by-count') as ITargetElement;

        noUiSlider.create(countSlider, {
            start: [1, 12],
            connect: true,
            step: 1,
            range: {
                min: 1,
                max: 12,
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

        noUiSlider.create(yearSlider, {
            start: [2004, 2021],
            connect: true,
            step: 1,
            range: {
                min: 2004,
                max: 2021,
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
