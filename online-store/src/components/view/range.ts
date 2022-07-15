import noUiSlider from 'nouislider';
import { API } from 'nouislider';
import 'nouislider/dist/nouislider.css';

interface Instanse extends HTMLElement {
    noUiSlider: API;
}

class Range {
    public rangeSliderByCount(): void {
        const snapSlider: Instanse = document.querySelector('.rangeSliderByCount');

        noUiSlider.create(snapSlider, {
            start: [1, 12],
            connect: true,
            step: 1,
            range: {
                min: 1,
                max: 12,
            },
        });

        const snapValues = [
            document.getElementById('slider-snap-value-lower'),
            document.getElementById('slider-snap-value-upper'),
        ];

        snapSlider.noUiSlider.on('update', function (values, handle) {
            snapValues[handle].innerHTML = values[handle];
        });
    }

    public rangeSliderByYear(): void {
        const snapSlider = document.querySelector('.rangeSliderByYear') as HTMLDivElement;

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
