import { API } from 'nouislider';
interface ISetTypeIGoods {
    [key: string]: string;
}
export interface IGoods extends ISetTypeIGoods {
    model: string;
    image: string;
    quantity: string;
    quantityValue: string;
    year: string;
    yearValue: string;
    company: string;
    companyValue: string;
    color: string;
    colorValue: string;
    camera: string;
    cameraValue: string;
    popular: string;
    popularValue: string;
}

interface ISetTypeIFilter {
    [key: string]: string[] | string;
}

export interface IFilter extends ISetTypeIFilter {
    companyValue: string[];
    cameraValue: string[];
    colorValue: string[];
    popularValue: string[];
    quantityValue: string[];
    yearValue: string[];
    model: string;
    ribbon: string;
}

export interface ITargetElement extends HTMLElement {
    noUiSlider: API;
}
