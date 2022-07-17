import Filter from './filter';
import { IGoods, IFilter, ITargetElement } from '../../types';

class resetFilter {
    private filter: Filter;

    constructor() {
        this.filter = new Filter();
    }

    public resetFilter(filterWords: IFilter, countAndYear: number[], data: IGoods[]): void {
        filterWords.companyValue = [];
        filterWords.cameraValue = [];
        filterWords.colorValue = [];
        filterWords.popularValue = [];
        filterWords.popularValue = [];
        filterWords.yearValue = [];
        filterWords.model = '';

        const resetFilterByValue = document.querySelectorAll('.alt');
        resetFilterByValue.forEach((el) => el.classList.remove('alt'));

        const input = document.querySelector('.search__input') as HTMLInputElement;
        input.value = '';

        const countSlider = document.querySelector('.range-slider-by-count') as ITargetElement;
        countSlider.noUiSlider.set([countAndYear[0], countAndYear[1]]);

        const yearSlider = document.querySelector('.range-slider-by-year') as ITargetElement;
        yearSlider.noUiSlider.set([countAndYear[2], countAndYear[3]]);

        this.filter.filterItems(filterWords, data);
    }
}

export default resetFilter;
