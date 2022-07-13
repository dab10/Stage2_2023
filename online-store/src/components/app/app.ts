import { IGoods } from '../../types';
import Goods from '../goods/goods';
import data from '../goods/goods.json';
import FilterByShape from '../view/buttons';
class App {
    private view: Goods;
    private viewFilterByShape: FilterByShape;
    private data: IGoods[];
    private filterWords: string[];

    constructor() {
        this.view = new Goods();
        this.viewFilterByShape = new FilterByShape();
        this.data = data;
        this.filterWords = [];
    }

    private toggleMenu(company: string): void {
        (document.querySelector(`.${company}`) as HTMLButtonElement).classList.toggle('alt');
    }

    private filter(e: Event, data: IGoods[]): void {
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

    public start(): void {
        this.viewFilterByShape.draw();
        this.view.draw(this.data);
        // (document.querySelector('.type-ball') as HTMLButtonElement).addEventListener('click', () =>
        //     this.toggleMenu('type-ball')
        // );
        // (document.querySelector('.type-bell') as HTMLButtonElement).addEventListener('click', () =>
        //     this.toggleMenu('type-bell')
        // );
        // (document.querySelector('.type-cone') as HTMLButtonElement).addEventListener('click', () =>
        //     this.toggleMenu('type-cone')
        // );
        (document.querySelector('.DecorationFilterGroup') as HTMLDivElement).addEventListener('click', (e) =>
            this.filter(e, data)
        );
    }
}

export default App;
