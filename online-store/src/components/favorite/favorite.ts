import './favorite.css';
import './favorite.scss';

class Favorite {
    private count: number;

    constructor() {
        this.count = 0;
    }
    public chooseFavorite(e: Event) {
        const target = e.target as HTMLElement;
        console.log(target);
        //const arr = (e.currentTarget as HTMLElement).querySelectorAll('.item');
        const itemContainer = document.querySelector('.item') as HTMLElement;
        const isItem = target.classList.contains('item');
        const isItemTitle = target.classList.contains('item__title');
        const isItemImg = target.classList.contains('item__img-container');
        // //const isItemContainer = (target.parentNode as HTMLElement).classList.contains('item');
        const hasRibbon = Boolean(itemContainer.querySelector('.ribbon'));
        const counter = document.querySelector('.counter') as HTMLSpanElement;

        // console.log(e.target);
        // console.log(arr);
        if ((isItem || isItemTitle || isItemImg) && !hasRibbon) {
            const ribbon = document.createElement('div');
            ribbon.classList.add('ribbon');
            ribbon.title = 'Добавлено в избранное';
            itemContainer.append(ribbon);
            this.count++;
            counter.textContent = String(this.count);
        }
        if ((isItem || isItemTitle || isItemImg) && hasRibbon) {
            (itemContainer.querySelector('.ribbon') as HTMLElement).remove();
            this.count--;
            counter.textContent = String(this.count);
        }
    }
}
export default Favorite;
