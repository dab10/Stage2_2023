import { IGoods } from '../../types';
import Goods from '../goods/goods';
import data from '../goods/goods.json';
import FilterByName from '../filter/filterByName';
import Range from '../view/range';
import { TargetElement } from '../../types';

class App {
    private view: Goods;
    private data: IGoods[];
    private FilterByName: FilterByName;
    private viewRange: Range;

    constructor() {
        this.view = new Goods();
        this.data = data;
        this.FilterByName = new FilterByName();
        this.viewRange = new Range();
    }

    public start(): void {
        const countSlider = document.querySelector('.range-slider-by-count') as TargetElement;
        const yearSlider = document.querySelector('.range-slider-by-year') as TargetElement;
        this.view.draw(this.data);
        this.viewRange.rangeSliderByCount();
        this.viewRange.rangeSliderByYear();
        (document.querySelector('.filter-by-value') as HTMLDivElement).addEventListener('click', (e) =>
            this.FilterByName.filter(e, data)
        );
        countSlider.noUiSlider.on('set', () => {
            this.FilterByName.count(data);
        });
        yearSlider.noUiSlider.on('set', () => {
            this.FilterByName.year(data);
        });
    }
}

export default App;
