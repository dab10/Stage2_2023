import noUiSlider from 'nouislider';
import { API } from 'nouislider';
import 'nouislider/dist/nouislider.css';

interface TargetElement extends HTMLElement {
    noUiSlider: API;
}

class Range {
    public rangeSliderByCount(): void {
        const snapSlider = document.querySelector('.range-slider-by-count') as TargetElement;

        noUiSlider.create(snapSlider, {
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

        const snapValues = [
            document.querySelector('.slider-snap-value-lower') as TargetElement,
            document.querySelector('.slider-snap-value-upper') as TargetElement,
        ];

        snapSlider.noUiSlider.on('update', function (values, handle) {
            snapValues[handle].innerHTML = String(values[handle]);
            console.log(snapValues[handle].innerHTML);
        });
    }

    public rangeSliderByYear(): void {
        const snapSlider = document.querySelector('.range-slider-by-year') as HTMLDivElement;

        noUiSlider.create(snapSlider, {
            start: [2004, 2021],
            connect: true,
            step: 1,
            range: {
                min: 2004,
                max: 2021,
            },
        });
    }
}

export default Range;
