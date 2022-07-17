import Goods from '../goods/goods';
import { IGoods, IFilter, ITargetElement } from '../../types';
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

    public filterByValue(e: Event, data: IGoods[]): void {
        const target = e.target as HTMLElement;

        // console.log(e.target);
        // console.log(e.currentTarget);
        // const countSlider = document.querySelector('.range-slider-by-count') as TargetElement;

        // countSlider.noUiSlider.on('set', () => {
        //     console.log(e.target);
        //     console.log(e.currentTarget);
        //     this.countArr = [];
        //     this.sliderValues = [];
        //     this.sliderValues = countSlider.noUiSlider.get() as string[];
        //     console.log(this.sliderValues);
        //     const countFrom = Number(this.sliderValues[0]);
        //     const countTo = Number(this.sliderValues[1]);
        //     console.log(countFrom, countTo);
        //     for (let i = countFrom; i <= countTo; i++) {
        //         this.countArr.push(i);
        //     }
        //     console.log(this.countArr);
        //     //updateToysView();
        // });

        //const currentTarget = e.currentTarget as HTMLElement;
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
        console.log(e.target);

        // const countSlider = document.querySelector('.range-slider-by-count') as TargetElement;

        // countSlider.noUiSlider.on('set', () => {
        //     this.countArr = [];
        //     this.sliderValues = [];
        //     this.sliderValues = countSlider.noUiSlider.get() as string[];
        //     const countFrom = Number(this.sliderValues[0]);
        //     const countTo = Number(this.sliderValues[1]);
        //     console.log(countFrom, countTo);
        //     for (let i = countFrom; i <= countTo; i++) {
        //         this.countArr.push(String(i));
        //     }
        //     countSlider.noUiSlider.off('set');
        //     console.log(this.countArr);
        //     this.filterWords.quantityValue = this.countArr;
        //     console.log(this.filterWords);
        //     this.filterByValue(this.filterWords, data);
        // });
        //countSlider.noUiSlider.off('set');

        //this.count();
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
        //countSlider.noUiSlider.off('set');
        console.log(this.countArr);
        this.filterWords.quantityValue = this.countArr;
        console.log(this.filterWords);
        this.filterItems(this.filterWords, data);

        //console.log(e.target);

        // const countSlider = document.querySelector('.range-slider-by-count') as TargetElement;

        // countSlider.noUiSlider.on('set', () => {
        //     this.countArr = [];
        //     this.sliderValues = [];
        //     this.sliderValues = countSlider.noUiSlider.get() as string[];
        //     const countFrom = Number(this.sliderValues[0]);
        //     const countTo = Number(this.sliderValues[1]);
        //     for (let i = countFrom; i <= countTo; i++) {
        //         this.countArr.push(String(i));
        //     }
        //     //countSlider.noUiSlider.off('set');
        //     console.log(this.countArr);
        //     this.filterWords.quantityValue = this.countArr;
        //     console.log(this.filterWords);
        //     this.filterByValue(this.filterWords, data);
        // });
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
        //countSlider.noUiSlider.off('set');
        //console.log(this.countArr);
        this.filterWords.yearValue = this.countArr;
        //console.log(this.filterWords);
        this.filterItems(this.filterWords, data);

        //console.log(e.target);

        // const countSlider = document.querySelector('.range-slider-by-count') as TargetElement;

        // countSlider.noUiSlider.on('set', () => {
        //     this.countArr = [];
        //     this.sliderValues = [];
        //     this.sliderValues = countSlider.noUiSlider.get() as string[];
        //     const countFrom = Number(this.sliderValues[0]);
        //     const countTo = Number(this.sliderValues[1]);
        //     for (let i = countFrom; i <= countTo; i++) {
        //         this.countArr.push(String(i));
        //     }
        //     //countSlider.noUiSlider.off('set');
        //     console.log(this.countArr);
        //     this.filterWords.quantityValue = this.countArr;
        //     console.log(this.filterWords);
        //     this.filterByValue(this.filterWords, data);
        // });
    }

    public filterSearch(data: IGoods[]): void {
        // const searchInput = (document.querySelector('.search__input') as HTMLInputElement).value;
        // const elements = document.querySelectorAll<HTMLElement>('.item__title');
        // const cards = document.querySelectorAll<HTMLElement>('.item');
        // //loop through all elements
        // elements.forEach((element, index) => {
        //     //check if text includes the search value
        //     if (element.innerText.includes(searchInput.toUpperCase())) {
        //         //display matching card
        //         cards[index].classList.remove('hide');
        //     } else {
        //         //hide others
        //         cards[index].classList.add('hide');
        //     }
        // });

        // this.filterWords.model = input.value;
        // this.filterItems(this.filterWords, data);

        const input = document.querySelector('.search__input') as HTMLInputElement;

        this.filterWords.model = input.value.toLowerCase();
        console.log(this.filterWords.model);
        this.filterItems(this.filterWords, data);
        //if (data.innerHTML.toLowerCase().indexOf(filter) > -1) {

        //}
        // filterItems.forEach((item) => {
        //     if (item.innerHTML.toLowerCase().indexOf(filter) > -1) {
        //         item.style.display = '';
        //     } else {
        //         item.style.display = 'none';
        //     }
        // });
    }

    public filterSort(e: Event, data: IGoods[]): void {
        if ((e.target as HTMLSelectElement).value == 'sortByNameAscending') {
            data = data.sort((current, next) => {
                return current.model.localeCompare(next.model);
            });
            console.log(data);
            console.log(this.filterWords);
            this.filterItems(this.filterWords, data);
        }
        if ((e.target as HTMLSelectElement).value == 'sortByNameDescending') {
            data = data.sort((current, next) => {
                return next.model.localeCompare(current.model);
            });
            console.log(data);
            console.log(this.filterWords);
            this.filterItems(this.filterWords, data);
        }
        if ((e.target as HTMLSelectElement).value == 'sortByYearAscending') {
            data = data.sort((current, next) => {
                return current.yearValue.localeCompare(next.yearValue);
            });
            console.log(data);
            console.log(this.filterWords);
            this.filterItems(this.filterWords, data);
        }
        if ((e.target as HTMLSelectElement).value == 'sortByYearDescending') {
            data = data.sort((current, next) => {
                return next.yearValue.localeCompare(current.yearValue);
            });
            console.log(data);
            console.log(this.filterWords);
            this.filterItems(this.filterWords, data);
        }
        if ((e.target as HTMLSelectElement).value == 'sortByCountAscending') {
            data = data.sort((a, b) => parseFloat(a.quantityValue) - parseFloat(b.quantityValue));
            console.log(data);
            console.log(this.filterWords);
            this.filterItems(this.filterWords, data);
        }
        if ((e.target as HTMLSelectElement).value == 'sortByCountDescending') {
            data = data.sort((a, b) => parseFloat(b.quantityValue) - parseFloat(a.quantityValue));
            console.log(data);
            console.log(this.filterWords);
            this.filterItems(this.filterWords, data);
        }
    }

    public chooseFavorite(e: Event) {
        const maxItemInBasket = 3;
        const target = e.target as HTMLElement;
        console.log(target);
        //const arr = (e.currentTarget as HTMLElement).querySelectorAll('.item');
        //const itemContainer = (target.parentNode as HTMLElement).querySelector('.item') as HTMLElement;

        const isItem = target.classList.contains('item');
        const isItemTitle = target.classList.contains('item__title');
        const isItemImg = target.classList.contains('item__img-container');
        const isItemRibbon = target.classList.contains('ribbon-class');
        // //const isItemContainer = (target.parentNode as HTMLElement).classList.contains('item');
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
                // const ribbon = document.createElement('div');
                // ribbon.classList.add('ribbon');
                // ribbon.title = 'Добавлено в избранное';
                // target.append(ribbon);
                //const ribbon = document.createElement('div');
                (target.querySelector('.ribbon-class') as HTMLElement).classList.add('ribbon');
                (target.querySelector('.ribbon-class') as HTMLElement).title = 'Добавлено в избранное';
                //target.append(ribbon);
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

        // if (this.count > maxItemInBasket) {
        //     if ((isItemTitle || isItemImg) && !hasRibbonOuter) {
        //         this.count--;
        //         alert('Извините, все слоты заполнены');
        //     }
        //     if (isItem && !hasRibbonInner) {
        //         this.count--;
        //         alert('Извините, все слоты заполнены');
        //     }
        // }
        console.log(this.count);
    }

    public filterItems(filterWords: IFilter, data: IGoods[]): void {
        console.log(filterWords);
        const filterWordsWithoutEmpty = Object.keys(filterWords).filter((key) => filterWords[key].length !== 0);
        console.log(filterWordsWithoutEmpty);
        console.log(data);

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
        console.log(filtered);
        for (let i = 0; i < filtered.length; i++) {
            for (let j = 0; j < filterWords.id.length; j++) {
                if (filterWords.id[j] === filtered[i].id) {
                    filtered[i].classRibbon = 'true';
                }
            }
        }
        // const filtered1 = filtered.forEach((el) => {
        //     if (filterWords.id[0] === el.id) {
        //         return (el.classRibbon = 'true');
        //     }
        // });
        console.log(filtered);
        this.view.draw(filtered);
    }
}

export default Filter;
