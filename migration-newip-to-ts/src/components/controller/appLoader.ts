import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '51504b36bb2f4859a90e65e4990490ec', //51504b36bb2f4859a90e65e4990490ec 696e176682f349a7aa615bfb3c53d11c
        });
    }
}

export default AppLoader;
