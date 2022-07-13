class FilterByShape {
    public draw(): void {
        const fragment = document.createDocumentFragment() as DocumentFragment;
        const buttonsTemp = document.querySelector('#filterButton') as HTMLTemplateElement;
        const buttonsClone = buttonsTemp.content.cloneNode(true) as HTMLElement;

        (buttonsClone.querySelector('.title') as HTMLHeadingElement).textContent = 'Фильтры по значению';
        (buttonsClone.querySelector('.FilterByShape') as HTMLDivElement).textContent = 'Производитель:';
        (buttonsClone.querySelector('.type-ball') as HTMLButtonElement).textContent = 'Samsung';
        (buttonsClone.querySelector('.type-bell') as HTMLButtonElement).textContent = 'Apple';
        (buttonsClone.querySelector('.type-cone') as HTMLButtonElement).textContent = 'Xiaomi';

        fragment.append(buttonsClone);

        (document.querySelector('.DecorationFilters_container__fvNdr') as HTMLDivElement).innerHTML = '';
        (document.querySelector('.DecorationFilters_container__fvNdr') as HTMLDivElement).appendChild(fragment);
    }
}

export default FilterByShape;
