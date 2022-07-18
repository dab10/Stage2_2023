import { IFilter } from '../../types';
import { ITargetElement } from '../../types';
import Filter from '../filter/filter';
//import data from '../goods/goods.json';
class WorkWithLocaleStorage {
    private filter: Filter;
    private countRibbonFromLocaleStorage: number;
    private filterWords: IFilter;

    constructor() {
        this.filter = new Filter();
        this.countRibbonFromLocaleStorage = 0;
        this.filterWords = {
            companyValue: [],
            cameraValue: [],
            colorValue: [],
            popularValue: [],
            quantityValue: [],
            yearValue: [],
            model: '',
            id: [],
            classRibbon: '',
        };
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
        // localStorage.setItem('count', JSON.stringify(count));
        // localStorage.setItem('year', JSON.stringify(year));
        //localStorage.setItem('countRibbon', JSON.stringify(countRibbon));
    }

    public getLocaleStorage(): void {
        // if (localStorage.getItem('count')) {
        //     const countJSON = localStorage.getItem('count');
        //     const count = JSON.parse(countJSON as string);
        //     const countSlider = document.querySelector('.range-slider-by-count') as ITargetElement;
        //     countSlider.noUiSlider.set([count[0], count[1]]);
        // }
        // if (localStorage.getItem('year')) {
        //     const yearJSON = localStorage.getItem('year');
        //     const year = JSON.parse(yearJSON as string);
        //     const yearSlider = document.querySelector('.range-slider-by-year') as ITargetElement;
        //     yearSlider.noUiSlider.set([year[0], year[1]]);
        // }
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

            //this.filter.filterItems(filterWords, data);
        }

        // if (localStorage.getItem('language')) {
        //     const language = localStorage.getItem('language');
        //     getTranslate(language);
        //     if (language === 'ru') {
        //         const activeLang = document.querySelector('.switch-ru');
        //         const nonActiveLang = document.querySelector('.switch-eng')
        //         nonActiveLang.classList.remove('active-lang');
        //         activeLang.classList.add('active-lang');
        //     }
        // }
        // if (localStorage.getItem('theme')) {
        //     const themeLocal = localStorage.getItem('theme');
        //     const colors = document.querySelectorAll(arrClass)
        //     if (themeLocal === 'light') {
        //         colors.forEach((el) => el.classList.add('light-theme'));
        //     } else {
        //         colors.forEach((el) => el.classList.remove('light-theme'));
        //     }
        //     return (theme = themeLocal);
        // }
    }
}
export default WorkWithLocaleStorage;
