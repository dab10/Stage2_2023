import { IGoods } from '../../types';
import Goods from '../goods/goods';
import data from '../goods/goods.json';
import FilterByName from '../filter/filterByName';
import Range from '../view/range';

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

    // private toggleMenu(company: string): void {
    //     (document.querySelector(`.${company}`) as HTMLButtonElement).classList.toggle('alt');
    // }

    // private filter(e: Event, data: IGoods[]): void {
    //     const target = e.target as HTMLElement;
    //     //const currentTarget = e.currentTarget as HTMLElement;

    //     target.classList.toggle('alt');
    //     if (target.classList.contains('alt')) {
    //         this.filterWords.push(target.innerHTML);
    //         console.log(this.filterWords);
    //         this.view.draw(data.filter((el) => this.filterWords.indexOf(el.companyValue) >= 0));
    //     } else if (!target.classList.contains('alt') && this.filterWords.includes(target.innerHTML)) {
    //         this.filterWords = this.filterWords.filter((item) => item !== target.innerHTML);
    //         console.log(this.filterWords);
    //         this.filterWords.length === 0
    //             ? this.view.draw(data)
    //             : this.view.draw(data.filter((el) => this.filterWords.indexOf(el.companyValue) >= 0));
    //     } else {
    //         this.view.draw(data);
    //     }
    //}

    public start(): void {
        this.view.draw(this.data);
        this.viewRange.rangeSliderByCount();
        this.viewRange.rangeSliderByYear();
        (document.querySelector('.filterByValue') as HTMLDivElement).addEventListener('click', (e) =>
            this.FilterByName.filter(e, data)
        );
    }
}

export default App;
