import { IGoods, ITargetElement } from '../../types';
import Goods from '../goods/goods';
import data from '../goods/goods.json';
import Filter from '../filter/filter';
import Range from '../view/range';
import ResetFilter from '../filter/reset-filter';
import WorkWithLocaleStorage from '../localeStorage/workWithLocaleStorage';

class App {
    private view: Goods;
    private data: IGoods[];
    private filter: Filter;
    private viewRange: Range;
    private resetFilter: ResetFilter;
    private workWithLocaleStorage: WorkWithLocaleStorage;

    constructor() {
        this.view = new Goods();
        this.data = data;
        this.filter = new Filter();
        this.viewRange = new Range();
        this.resetFilter = new ResetFilter();
        this.workWithLocaleStorage = new WorkWithLocaleStorage();
    }

    public start(): void {
        const filterByValue = document.querySelector('.filter-by-value') as HTMLDivElement;
        const countSlider = document.querySelector('.range-slider-by-count') as ITargetElement;
        const yearSlider = document.querySelector('.range-slider-by-year') as ITargetElement;
        const input = document.querySelector('.search__input') as HTMLInputElement;
        const select = document.querySelector('.sort-list') as HTMLSelectElement;
        const favoriteItems = document.querySelector('.item-list') as HTMLDivElement;
        const resetFilter = document.querySelector('.reset-filter') as HTMLButtonElement;
        //const resetAll = document.querySelector('.reset-all') as HTMLButtonElement;

        this.view.draw(this.data);
        this.viewRange.rangeSliderByCount();
        this.viewRange.rangeSliderByYear();

        filterByValue.addEventListener('click', (e) => this.filter.filterByValue(e, data));
        countSlider.noUiSlider.on('set', () => this.filter.rangeByCount(data));
        yearSlider.noUiSlider.on('set', () => this.filter.rangeByYear(data));
        input.addEventListener('input', () => this.filter.filterSearch(data));
        //select.addEventListener('change', (e) => this.filter.filterSort(e, data));
        select.addEventListener('change', () => this.filter.filterSort(data));
        //const favoriteItems = document.querySelectorAll<HTMLDivElement>('.item');
        //console.log(favoriteItems);
        favoriteItems.addEventListener('click', (e) => this.filter.chooseFavorite(e));
        // favoriteItems.forEach((tab) => {
        //     tab.addEventListener('click', (e) => this.favoriteItem.chooseFavorite(e));
        // });

        resetFilter.addEventListener('click', () => {
            const filterWords = this.filter.getFilterWords();
            const countAndYear = this.viewRange.getCountAndYear();
            this.resetFilter.resetFilter(filterWords, countAndYear, data);
        });
        window.addEventListener('beforeunload', () => {
            const filterWords = this.filter.getFilterWords();
            // const count = countSlider.noUiSlider.get();
            // const year = yearSlider.noUiSlider.get();
            //const countRibbon = this.filter.getCountRibbon();
            //console.log(countRibbon);
            const valueSelect = select.options[select.selectedIndex].value;
            this.workWithLocaleStorage.setLocalStorage(filterWords, valueSelect);
        });
        window.addEventListener('load', () => {
            this.workWithLocaleStorage.getLocaleStorage();
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
        // resetAll.addEventListener('click', () => {
        //     localStorage.clear();
        //     location.reload();
        // });
    }
}

export default App;
