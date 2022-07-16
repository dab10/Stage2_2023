import Goods from '../goods/goods';
import { IGoods } from '../../types';
import { IFilter } from '../../types';
//import Range from '../view/range';
import { TargetElement } from '../../types';
class FilterByName {
    private view: Goods;
    private filterWords: IFilter;
    private countArr: string[];
    private sliderValues: string[];
    //private rangeCountArr: Range;

    constructor() {
        this.view = new Goods();
        this.countArr = [];
        this.sliderValues = [];
        //this.rangeCountArr = new Range();
        this.filterWords = {
            companyValue: [],
            cameraValue: [],
            colorValue: [],
            popularValue: [],
            quantityValue: [],
            yearValue: [],
        };
    }

    public filter(e: Event, data: IGoods[]): void {
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

    public count(data: IGoods[]): void {
        const countSlider = document.querySelector('.range-slider-by-count') as TargetElement;
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
        this.filterByValue(this.filterWords, data);

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

    public year(data: IGoods[]): void {
        const yearSlider = document.querySelector('.range-slider-by-year') as TargetElement;
        this.countArr = [];
        this.sliderValues = [];
        this.sliderValues = yearSlider.noUiSlider.get() as string[];
        const countFrom = Number(this.sliderValues[0]);
        const countTo = Number(this.sliderValues[1]);
        for (let i = countFrom; i <= countTo; i++) {
            this.countArr.push(String(i));
        }
        //countSlider.noUiSlider.off('set');
        console.log(this.countArr);
        this.filterWords.yearValue = this.countArr;
        console.log(this.filterWords);
        this.filterByValue(this.filterWords, data);

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
