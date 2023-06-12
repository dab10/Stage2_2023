import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://rss-news-api.onrender.com/', {
            apiKey: '51504b36bb2f4859a90e65e4990490ec',
        });
    }
}

export default AppLoader;
