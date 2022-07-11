import './goods.css';
import './goods.scss';

interface IGoods {
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

class Goods {
    public draw(data: IGoods[]): void {
        console.log(data);
        const fragment = document.createDocumentFragment() as DocumentFragment;
        const goodsTemp = document.querySelector('#goodsItem') as HTMLTemplateElement;

        data.forEach((item: IGoods) => {
            const goodsClone = goodsTemp.content.cloneNode(true) as HTMLElement;

            (goodsClone.querySelector('.DecorationItem__title') as HTMLHeadingElement).textContent = item.model;
            (goodsClone.querySelector('.DecorationItem__img') as HTMLImageElement).alt = item.model;
            (goodsClone.querySelector('.DecorationItem__img') as HTMLImageElement).src = item.image;
            (goodsClone.querySelector('.DecorationItem__props li:nth-child(1)') as HTMLLIElement).textContent =
                item.quantity + item.quantityValue;
            (goodsClone.querySelector('.DecorationItem__props li:nth-child(2)') as HTMLLIElement).textContent =
                item.year + item.yearValue;
            (goodsClone.querySelector('.DecorationItem__props li:nth-child(3)') as HTMLLIElement).textContent =
                item.company + item.companyValue;
            (goodsClone.querySelector('.DecorationItem__props li:nth-child(4)') as HTMLLIElement).textContent =
                item.color + item.colorValue;
            (goodsClone.querySelector('.DecorationItem__props li:nth-child(5)') as HTMLLIElement).textContent =
                item.camera + item.cameraValue;
            (goodsClone.querySelector('.DecorationItem__props li:nth-child(6)') as HTMLLIElement).textContent =
                item.popular + item.popularValue;

            fragment.append(goodsClone);
        });

        (document.querySelector('.DecorationListing') as HTMLDivElement).innerHTML = '';
        (document.querySelector('.DecorationListing') as HTMLDivElement).appendChild(fragment);
    }
}

export default Goods;
