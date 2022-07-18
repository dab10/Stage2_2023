import Goods from '../goods/goods';
import { IGoods, IFilter, ITargetElement } from '../../types';
import './ribbon.css';
import './ribbon.scss';

class Filter {
    private view: Goods;
    private filterWords: IFilter;
    private countArr: string[];
    private sliderValues: string[];
    private count: number;

    constructor() {
        this.view = new Goods();
        this.countArr = [];
        this.sliderValues = [];
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
        this.count = 0;
    }

    public getFilterWords(): IFilter {
        return this.filterWords;
    }

    public setFilterWords(filterWords: IFilter, data: IGoods[]) {
        this.filterWords = filterWords;
        this.filterItems(this.filterWords, data);
    }

    public setCountRibbon(n: number) {
        const counter = document.querySelector('.counter') as HTMLSpanElement;
        this.count = n;
        counter.textContent = String(this.count);
    }

    public filterByValue(e: Event, data: IGoods[]): void {
        const target = e.target as HTMLElement;
        const isCompany = (target.parentNode as HTMLElement).classList.contains('filter-by-name__company');
        const isCamera = (target.parentNode as HTMLElement).classList.contains('filter-by-size__camera');
        const isColor = (target.parentNode as HTMLElement).classList.contains('filter-by-color__color');
        const isPopular = (target.parentNode as HTMLElement).classList.contains('filter-by-popular__popular');

        if (isCompany || isCamera || isColor || isPopular) {
            target.classList.toggle('alt');
        }

        const hasClassAlt = target.classList.contains('alt');

        if (isCompany && hasClassAlt) {
            this.filterWords.companyValue.push(target.innerHTML);
            this.filterItems(this.filterWords, data);
        }
        if (isCompany && !hasClassAlt) {
            this.filterWords.companyValue = this.filterWords.companyValue.filter((item) => item !== target.innerHTML);
            this.filterItems(this.filterWords, data);
        }
        if (isCamera && hasClassAlt) {
            this.filterWords.cameraValue.push(target.innerHTML);
            this.filterItems(this.filterWords, data);
        }
        if (isCamera && !hasClassAlt) {
            this.filterWords.cameraValue = this.filterWords.cameraValue.filter((item) => item !== target.innerHTML);
            this.filterItems(this.filterWords, data);
        }
        if (isColor && hasClassAlt) {
            this.filterWords.colorValue.push(target.innerHTML);
            this.filterItems(this.filterWords, data);
        }
        if (isColor && !hasClassAlt) {
            this.filterWords.colorValue = this.filterWords.colorValue.filter((item) => item !== target.innerHTML);
            this.filterItems(this.filterWords, data);
        }
        if (isPopular && hasClassAlt) {
            this.filterWords.popularValue.push(target.innerHTML);
            this.filterItems(this.filterWords, data);
        }
        if (isPopular && !hasClassAlt) {
            this.filterWords.popularValue = this.filterWords.popularValue.filter((item) => item !== target.innerHTML);
            this.filterItems(this.filterWords, data);
        }
    }

    public rangeByCount(data: IGoods[]): void {
        const countSlider = document.querySelector('.range-slider-by-count') as ITargetElement;
        this.countArr = [];
        this.sliderValues = [];
        this.sliderValues = countSlider.noUiSlider.get() as string[];
        const countFrom = Number(this.sliderValues[0]);
        const countTo = Number(this.sliderValues[1]);
        for (let i = countFrom; i <= countTo; i++) {
            this.countArr.push(String(i));
        }
        this.filterWords.quantityValue = this.countArr;
        this.filterItems(this.filterWords, data);
    }

    public rangeByYear(data: IGoods[]): void {
        const yearSlider = document.querySelector('.range-slider-by-year') as ITargetElement;
        this.countArr = [];
        this.sliderValues = [];
        this.sliderValues = yearSlider.noUiSlider.get() as string[];
        const countFrom = Number(this.sliderValues[0]);
        const countTo = Number(this.sliderValues[1]);
        for (let i = countFrom; i <= countTo; i++) {
            this.countArr.push(String(i));
        }
        this.filterWords.yearValue = this.countArr;
        this.filterItems(this.filterWords, data);
    }

    public filterSearch(data: IGoods[]): void {
        const input = document.querySelector('.search__input') as HTMLInputElement;

        this.filterWords.model = input.value.toLowerCase();
        this.filterItems(this.filterWords, data);
    }

    public filterSort(data: IGoods[]): void {
        const select = document.querySelector('.sort-list') as HTMLSelectElement;
        const selected = select.options[select.selectedIndex].value;
        if (selected === 'sortByNameAscending') {
            data = data.sort((current, next) => {
                return current.model.localeCompare(next.model);
            });
            this.filterItems(this.filterWords, data);
        }
        if (selected === 'sortByNameDescending') {
            data = data.sort((current, next) => {
                return next.model.localeCompare(current.model);
            });
            this.filterItems(this.filterWords, data);
        }
        if (selected === 'sortByYearAscending') {
            data = data.sort((current, next) => {
                return current.yearValue.localeCompare(next.yearValue);
            });
            this.filterItems(this.filterWords, data);
        }
        if (selected === 'sortByYearDescending') {
            data = data.sort((current, next) => {
                return next.yearValue.localeCompare(current.yearValue);
            });
            this.filterItems(this.filterWords, data);
        }
        if (selected === 'sortByCountAscending') {
            data = data.sort((a, b) => parseFloat(a.quantityValue) - parseFloat(b.quantityValue));
            this.filterItems(this.filterWords, data);
        }
        if (selected === 'sortByCountDescending') {
            data = data.sort((a, b) => parseFloat(b.quantityValue) - parseFloat(a.quantityValue));
            this.filterItems(this.filterWords, data);
        }
    }

    public chooseFavorite(e: Event) {
        const maxItemInBasket = 3;
        const target = e.target as HTMLElement;
        const isItem = target.classList.contains('item');
        const isItemTitle = target.classList.contains('item__title');
        const isItemImg = target.classList.contains('item__img-container');
        const isItemRibbon = target.classList.contains('ribbon-class');
        const hasRibbonInner = Boolean(target.querySelector('.ribbon'));
        const hasRibbonOuter = Boolean((target.parentNode as HTMLElement).querySelector('.ribbon'));
        const counter = document.querySelector('.counter') as HTMLSpanElement;

        if (this.count === maxItemInBasket) {
            if ((isItemTitle || isItemImg) && !hasRibbonOuter) {
                this.count = maxItemInBasket;
                alert('Извините, все слоты заполнены');
            }
            if (isItem && !hasRibbonInner) {
                this.count = maxItemInBasket;
                alert('Извините, все слоты заполнены');
            }
        }
        if (this.count < maxItemInBasket) {
            if ((isItemTitle || isItemImg) && !hasRibbonOuter) {
                ((target.parentNode as HTMLElement).querySelector('.ribbon-class') as HTMLElement).classList.add(
                    'ribbon'
                );
                ((target.parentNode as HTMLElement).querySelector('.ribbon-class') as HTMLElement).title =
                    'Добавлено в избранное';
                this.count++;
                counter.textContent = String(this.count);
                this.filterWords.id.push((target.parentNode as HTMLElement).dataset.id as string);
            }
            if (isItem && !hasRibbonInner) {
                (target.querySelector('.ribbon-class') as HTMLElement).classList.add('ribbon');
                (target.querySelector('.ribbon-class') as HTMLElement).title = 'Добавлено в избранное';
                this.count++;
                counter.textContent = String(this.count);
                this.filterWords.id.push(target.dataset.id as string);
            }

            if ((isItemTitle || isItemImg || isItemRibbon) && hasRibbonOuter) {
                ((target.parentNode as HTMLElement).querySelector('.ribbon') as HTMLElement).classList.remove('ribbon');
                this.count--;
                counter.textContent = String(this.count);
                this.filterWords.id = this.filterWords.id.filter(
                    (item) => item !== (target.parentNode as HTMLElement).dataset.id
                );
            }
            if (isItem && hasRibbonInner) {
                (target.querySelector('.ribbon') as HTMLElement).classList.remove('ribbon');
                this.count--;
                counter.textContent = String(this.count);
                this.filterWords.id = this.filterWords.id.filter((item) => item !== target.dataset.id);
            }
        }
        if (this.count === maxItemInBasket) {
            if ((isItemTitle || isItemImg || isItemRibbon) && hasRibbonOuter) {
                ((target.parentNode as HTMLElement).querySelector('.ribbon') as HTMLElement).classList.remove('ribbon');
                this.count--;
                counter.textContent = String(this.count);
                this.filterWords.id = this.filterWords.id.filter(
                    (item) => item !== (target.parentNode as HTMLElement).dataset.id
                );
            }
            if (isItem && hasRibbonInner) {
                (target.querySelector('.ribbon') as HTMLElement).classList.remove('ribbon');
                this.count--;
                counter.textContent = String(this.count);
                this.filterWords.id = this.filterWords.id.filter((item) => item !== target.dataset.id);
            }
        }
    }

    public filterItems(filterWords: IFilter, data: IGoods[]): void {
        const filterWordsWithoutEmpty = Object.keys(filterWords).filter((key) => filterWords[key].length !== 0);

        const filtered = data.filter((el) => {
            return filterWordsWithoutEmpty.every((key) => {
                if (key !== 'id') {
                    if (Array.isArray(filterWords[key])) {
                        return filterWords[key].includes(el[key]);
                    }
                }
                return el.model.toLowerCase().includes(filterWords.model as string);
            });
        });

        for (let i = 0; i < filtered.length; i++) {
            if (filterWords.id.length === 0) {
                filtered[i].classRibbon = 'false';
            }
            for (let j = 0; j < filterWords.id.length; j++) {
                if (filterWords.id[j] === filtered[i].id) {
                    filtered[i].classRibbon = 'true';
                }
            }
        }

        this.view.draw(filtered);
    }
}

export default Filter;
