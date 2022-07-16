import { API } from 'nouislider';
interface setTypeIGoods {
    [key: string]: string;
}
export interface IGoods extends setTypeIGoods {
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

interface setTypeIFilter {
    [key: string]: string[] | string;
}
export interface IFilter extends setTypeIFilter {
    companyValue: string[];
    cameraValue: string[];
    colorValue: string[];
    popularValue: string[];
    quantityValue: string[];
    yearValue: string[];
}

export interface TargetElement extends HTMLElement {
    noUiSlider: API;
}
