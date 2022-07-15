import Goods from '../goods/goods';
import { IGoods } from '../../types';
import { IFilter } from '../../types';
class FilterByName {
    private view: Goods;
    private filterWords: IFilter;

    constructor() {
        this.view = new Goods();
        this.filterWords = {
            companyValue: [],
            cameraValue: [],
            colorValue: [],
            popularValue: [],
        };
    }

    public filter(e: Event, data: IGoods[]): void {
        const target = e.target as HTMLElement;
        //const currentTarget = e.currentTarget as HTMLElement;
        const isCompany = (target.parentNode as HTMLElement).classList.contains('filterByName__company');
        const isCamera = (target.parentNode as HTMLElement).classList.contains('filterBySize__camera');
        const isColor = (target.parentNode as HTMLElement).classList.contains('filterByColor__color');
        const isPopular = (target.parentNode as HTMLElement).classList.contains('filterByPopular__popular');
        target.classList.toggle('alt');
        const hasClassAlt = target.classList.contains('alt');

        if (isCompany && hasClassAlt) {
            this.filterWords.companyValue.push(target.innerHTML);
            this.filterByValue(this.filterWords, data);
        }
        if (isCompany && !hasClassAlt) {
            this.filterWords.companyValue = this.filterWords.companyValue.filter((item) => item !== target.innerHTML);
            this.filterByValue(this.filterWords, data);
        }
        if (isCamera && hasClassAlt) {
            this.filterWords.cameraValue.push(target.innerHTML);
            this.filterByValue(this.filterWords, data);
        }
        if (isCamera && !hasClassAlt) {
            this.filterWords.cameraValue = this.filterWords.cameraValue.filter((item) => item !== target.innerHTML);
            this.filterByValue(this.filterWords, data);
        }
        if (isColor && hasClassAlt) {
            this.filterWords.colorValue.push(target.innerHTML);
            this.filterByValue(this.filterWords, data);
        }
        if (isColor && !hasClassAlt) {
            this.filterWords.colorValue = this.filterWords.colorValue.filter((item) => item !== target.innerHTML);
            this.filterByValue(this.filterWords, data);
        }
        if (isPopular && hasClassAlt) {
            this.filterWords.popularValue.push(target.innerHTML);
            this.filterByValue(this.filterWords, data);
        }
        if (isPopular && !hasClassAlt) {
            this.filterWords.popularValue = this.filterWords.popularValue.filter((item) => item !== target.innerHTML);
            this.filterByValue(this.filterWords, data);
        }
    }

    private filterByValue(filterWords: IFilter, data: IGoods[]): void {
        console.log(filterWords);
        const filterWordsWithoutEmpty = Object.keys(filterWords).filter((key) => filterWords[key].length !== 0);
        console.log(filterWordsWithoutEmpty);
        console.log(data);

        data = data.filter((el) => {
            return filterWordsWithoutEmpty.every((key) => {
                if (Array.isArray(filterWords[key])) {
                    return filterWords[key].includes(el[key]);
                }
                return el[key] === filterWords[key];
            });
        });
        console.log(data);
        this.view.draw(data);
    }
}

export default FilterByName;
