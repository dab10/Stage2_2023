import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '696e176682f349a7aa615bfb3c53d11c',
        });
    }
}

export default AppLoader;
