import { IGoods, ITargetElement } from '../../types';
import Goods from '../goods/goods';
import data from '../goods/goods.json';
import Filter from '../filter/filter';
import Range from '../view/range';
import ResetFilter from '../filter/reset-filter';
import WorkWithLocaleStorage from '../localeStorage/workWithLocaleStorage';
import ResetAll from '../filter/reset-all';
import selfCheck from '../view/selfCheck';

class App {
    private view: Goods;
    private data: IGoods[];
    private filter: Filter;
    private viewRange: Range;
    private resetFilter: ResetFilter;
    private workWithLocaleStorage: WorkWithLocaleStorage;
    private resetAll: ResetAll;
    private selfCheck: selfCheck;

    constructor() {
        this.view = new Goods();
        this.data = data;
        this.filter = new Filter();
        this.viewRange = new Range();
        this.resetFilter = new ResetFilter();
        this.workWithLocaleStorage = new WorkWithLocaleStorage();
        this.resetAll = new ResetAll();
        this.selfCheck = new selfCheck();
    }

    public start(): void {
        const filterByValue = document.querySelector('.filter-by-value') as HTMLDivElement;
        const countSlider = document.querySelector('.range-slider-by-count') as ITargetElement;
        const yearSlider = document.querySelector('.range-slider-by-year') as ITargetElement;
        const input = document.querySelector('.search__input') as HTMLInputElement;
        const select = document.querySelector('.sort-list') as HTMLSelectElement;
        const favoriteItems = document.querySelector('.item-list') as HTMLDivElement;
        const resetFilter = document.querySelector('.reset-filter') as HTMLButtonElement;
        const resetAll = document.querySelector('.reset-all') as HTMLButtonElement;

        this.view.draw(this.data);
        this.viewRange.rangeSliderByCount();
        this.viewRange.rangeSliderByYear();
        this.selfCheck.selfCheck();

        filterByValue.addEventListener('click', (e) => this.filter.filterByValue(e, data));
        countSlider.noUiSlider.on('set', () => this.filter.rangeByCount(data));
        yearSlider.noUiSlider.on('set', () => this.filter.rangeByYear(data));
        input.addEventListener('input', () => this.filter.filterSearch(data));
        select.addEventListener('change', () => this.filter.filterSort(data));
        favoriteItems.addEventListener('click', (e) => this.filter.chooseFavorite(e));

        resetFilter.addEventListener('click', () => {
            const filterWords = this.filter.getFilterWords();
            const countAndYear = this.viewRange.getCountAndYear();
            this.resetFilter.resetFilter(filterWords, countAndYear);
            const filterWordsFromResetFilter = this.resetFilter.getResetFilterFilterWords();
            this.filter.setFilterWords(filterWordsFromResetFilter, data);
        });

        window.addEventListener('beforeunload', () => {
            const filterWords = this.filter.getFilterWords();
            const valueSelect = select.options[select.selectedIndex].value;
            this.workWithLocaleStorage.setLocalStorage(filterWords, valueSelect);
        });

        window.addEventListener('load', () => {
            this.workWithLocaleStorage.setFiltersFromLocaleStorage();
            const countRibbonFromLocaleStorage = this.workWithLocaleStorage.getCountRibbonFromLocaleStorage();
            this.filter.setCountRibbon(countRibbonFromLocaleStorage);
            const filterWordsFromLocaleStorage = this.workWithLocaleStorage.getFilterWordsFromLocaleStorage();
            this.filter.setFilterWords(filterWordsFromLocaleStorage, data);
            if (localStorage.getItem('sort')) {
                const item = localStorage.getItem('sort') as string;
                select.value = item;
                this.filter.filterSort(data);
            }
        });

        resetAll.addEventListener('click', () => {
            const countAndYear = this.viewRange.getCountAndYear();
            this.resetAll.resetAll(countAndYear, data);
            const resetAllFilterWords = this.resetAll.getResetAllFilterWords();
            this.filter.setFilterWords(resetAllFilterWords, data);
            const countRibbonFromResetAll = this.resetAll.getCountRibbonFromResetAll();
            this.filter.setCountRibbon(countRibbonFromResetAll);
            document.querySelectorAll('.ribbon').forEach((el) => el.classList.remove('ribbon'));
        });
    }
}

export default App;
