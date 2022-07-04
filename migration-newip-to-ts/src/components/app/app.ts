import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IData } from '../../types/index';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        (document.querySelector('.sources') as HTMLDivElement).addEventListener('click', (e) =>
            this.controller.getNews(e, (data: Partial<IData>) => this.view.drawNews(data))
        );
        this.controller.getSources((data: Partial<IData>) => this.view.drawSources(data));
    }
}

export default App;
