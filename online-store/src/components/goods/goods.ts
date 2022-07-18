import './goods.css';
import './goods.scss';
import { IGoods } from '../../types';

class Goods {
    public draw(data: IGoods[]): void {
        const fragment = document.createDocumentFragment() as DocumentFragment;
        const goodsTemp = document.querySelector('#items') as HTMLTemplateElement;
        const containerData = document.querySelector('.item-list') as HTMLDivElement;
        const containerNoResult = document.querySelector('.no-result') as HTMLDivElement;
        const ribbon = document.createElement('div');
        ribbon.classList.add('ribbon');
        ribbon.title = 'Добавлено в избранное';

        data.forEach((item: IGoods) => {
            const goodsClone = goodsTemp.content.cloneNode(true) as HTMLElement;

            (goodsClone.querySelector('.item') as HTMLHeadingElement).dataset.id = item.id;
            (goodsClone.querySelector('.item__title') as HTMLHeadingElement).textContent = item.model;
            (goodsClone.querySelector('.item__img') as HTMLImageElement).alt = item.model;
            (goodsClone.querySelector('.item__img') as HTMLImageElement).src = item.image;
            (goodsClone.querySelector('.item__props li:nth-child(1)') as HTMLLIElement).textContent =
                item.quantity + item.quantityValue;
            (goodsClone.querySelector('.item__props li:nth-child(2)') as HTMLLIElement).textContent =
                item.year + item.yearValue;
            (goodsClone.querySelector('.item__props li:nth-child(3)') as HTMLLIElement).textContent =
                item.company + item.companyValue;
            (goodsClone.querySelector('.item__props li:nth-child(4)') as HTMLLIElement).textContent =
                item.color + item.colorValue;
            (goodsClone.querySelector('.item__props li:nth-child(5)') as HTMLLIElement).textContent =
                item.camera + item.cameraValue;
            (goodsClone.querySelector('.item__props li:nth-child(6)') as HTMLLIElement).textContent =
                item.popular + item.popularValue;
            if (item.classRibbon === 'true')
                (goodsClone.querySelector('.ribbon-class') as HTMLHeadingElement).classList.add('ribbon');

            fragment.append(goodsClone);
        });

        containerData.innerHTML = '';
        containerData.appendChild(fragment);

        if (containerData.innerHTML === '') {
            containerNoResult.innerHTML = '';
            const noResult = document.createElement('h2');
            noResult.classList.add('no-result__title');
            noResult.textContent = 'Извините, совпадений не обнаружено';
            containerNoResult.append(noResult);
        }
        if (containerData.innerHTML !== '' && containerNoResult.innerHTML !== '') containerNoResult.innerHTML = '';
    }
}

export default Goods;
