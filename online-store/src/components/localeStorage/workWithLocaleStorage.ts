import { IFilter, ITargetElement, filterWordsEmpty } from '../../types';
import Filter from '../filter/filter';

class WorkWithLocaleStorage {
    private filter: Filter;
    private countRibbonFromLocaleStorage: number;
    private filterWords: IFilter;

    constructor() {
        this.filter = new Filter();
        this.countRibbonFromLocaleStorage = 0;
        this.filterWords = filterWordsEmpty;
    }

    public getCountRibbonFromLocaleStorage(): number {
        return this.countRibbonFromLocaleStorage;
    }

    public getFilterWordsFromLocaleStorage(): IFilter {
        return this.filterWords;
    }

    public setLocalStorage(filterWords: IFilter, valueSelect: string): void {
        localStorage.setItem('filterWords', JSON.stringify(filterWords));
        localStorage.setItem('sort', valueSelect);
    }

    public getLocaleStorage(): void {
        if (localStorage.getItem('filterWords')) {
            const filterWordsJSON = localStorage.getItem('filterWords');
            this.filterWords = JSON.parse(filterWordsJSON as string);
            const countSlider = document.querySelector('.range-slider-by-count') as ITargetElement;
            countSlider.noUiSlider.set([
                this.filterWords.quantityValue[0],
                this.filterWords.quantityValue[this.filterWords.quantityValue.length - 1],
            ]);
            const yearSlider = document.querySelector('.range-slider-by-year') as ITargetElement;
            yearSlider.noUiSlider.set([
                this.filterWords.yearValue[0],
                this.filterWords.yearValue[this.filterWords.yearValue.length - 1],
            ]);

            const input = document.querySelector('.search__input') as HTMLInputElement;
            input.value = this.filterWords.model;

            this.countRibbonFromLocaleStorage = this.filterWords.id.length;

            const filterByNameWithClassAlt = document.querySelectorAll('.apple, .samsung, .xiaomi');
            filterByNameWithClassAlt.forEach((el) =>
                this.filterWords.companyValue.forEach((item) => {
                    if (el.textContent === item) {
                        el.classList.add('alt');
                    }
                })
            );
            const filterBySizeWithClassAlt = document.querySelectorAll(
                '.type-xlarge, .type-large, .type-medium, .type-small'
            );
            filterBySizeWithClassAlt.forEach((el) =>
                this.filterWords.cameraValue.forEach((item) => {
                    if (el.textContent === item) {
                        el.classList.add('alt');
                    }
                })
            );
            const filterByColorWithClassAlt = document.querySelectorAll('.white, .yellow, .red');
            filterByColorWithClassAlt.forEach((el) =>
                this.filterWords.colorValue.forEach((item) => {
                    if (el.textContent === item) {
                        el.classList.add('alt');
                    }
                })
            );
            const filterByPopularWithClassAlt = document.querySelector('.popular') as HTMLElement;
            if (filterByPopularWithClassAlt.textContent === this.filterWords.popularValue[0])
                filterByPopularWithClassAlt.classList.add('alt');
        }
    }
}
export default WorkWithLocaleStorage;
