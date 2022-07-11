import Goods from '../goods/goods';
import data from '../goods/goods.json';
class App {
    private view: Goods;

    constructor() {
        this.view = new Goods();
    }

    public start(): void {
        this.view.draw(data);
    }
}

export default App;
