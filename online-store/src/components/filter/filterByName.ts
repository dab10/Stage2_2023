import Goods from '../goods/goods';
import { IGoods } from '../../types';

class FilterByName {
    private view: Goods;
    private filterWords: string[];

    constructor() {
        this.view = new Goods();
        this.filterWords = [];
    }

    public filter(e: Event, data: IGoods[]): void {
        const target = e.target as HTMLElement;
        //const currentTarget = e.currentTarget as HTMLElement;

        target.classList.toggle('alt');
        if (target.classList.contains('alt')) {
            this.filterWords.push(target.innerHTML);
            console.log(this.filterWords);
            this.view.draw(data.filter((el) => this.filterWords.indexOf(el.companyValue) >= 0));
        } else if (!target.classList.contains('alt') && this.filterWords.includes(target.innerHTML)) {
            this.filterWords = this.filterWords.filter((item) => item !== target.innerHTML);
            console.log(this.filterWords);
            this.filterWords.length === 0
                ? this.view.draw(data)
                : this.view.draw(data.filter((el) => this.filterWords.indexOf(el.companyValue) >= 0));
        } else {
            this.view.draw(data);
        }
    }
}

export default FilterByName;
