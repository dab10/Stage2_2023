import Filter from './filter';
import { IFilter, ITargetElement, filterWordsEmpty } from '../../types';

class ResetFilter {
    private filter: Filter;
    private filterWords: IFilter;

    constructor() {
        this.filter = new Filter();
        this.filterWords = filterWordsEmpty;
    }

    public getResetFilterFilterWords(): IFilter {
        return this.filterWords;
    }

    public setResetFilterFilterWords(filterWords: IFilter): void {
        this.filterWords = filterWords;
    }

    public resetFilter(filterWords: IFilter, countAndYear: number[]): void {
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
        this.filterWords = filterWords;
    }
}

export default ResetFilter;
