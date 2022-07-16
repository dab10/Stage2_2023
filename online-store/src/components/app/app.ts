import { IGoods, ITargetElement } from '../../types';
import Goods from '../goods/goods';
import data from '../goods/goods.json';
import Filter from '../filter/filter';
import Range from '../view/range';

class App {
    private view: Goods;
    private data: IGoods[];
    private Filter: Filter;
    private viewRange: Range;

    constructor() {
        this.view = new Goods();
        this.data = data;
        this.Filter = new Filter();
        this.viewRange = new Range();
    }

    public start(): void {
        const filterByValue = document.querySelector('.filter-by-value') as HTMLDivElement;
        const countSlider = document.querySelector('.range-slider-by-count') as ITargetElement;
        const yearSlider = document.querySelector('.range-slider-by-year') as ITargetElement;
        const input = document.querySelector('.search__input') as HTMLInputElement;

        this.view.draw(this.data);
        this.viewRange.rangeSliderByCount();
        this.viewRange.rangeSliderByYear();
        filterByValue.addEventListener('click', (e) => this.Filter.filterByValue(e, data));
        countSlider.noUiSlider.on('set', () => this.Filter.rangeByCount(data));
        yearSlider.noUiSlider.on('set', () => this.Filter.rangeByYear(data));
        input.addEventListener('input', () => this.Filter.filterSearch(data));
    }
}

export default App;
