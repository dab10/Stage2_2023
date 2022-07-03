import { Callback, IData, HTTPErrors } from '../../types/index';
class Loader {
    readonly baseLink: string;
    readonly options: { apiKey: string };

    constructor(baseLink: string, options: { apiKey: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} }: { endpoint: string; options?: { sources: string } | Record<string, never> },
        callback: Callback<Partial<IData>> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === HTTPErrors.Unauthorized || res.status === HTTPErrors.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Record<string, never>, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
        });

        return url.slice(0, -1);
    }

    private load(
        method: string,
        endpoint: string,
        callback: Callback<Pick<IData, 'status' | 'sources'> | Pick<IData, 'status' | 'totalResults' | 'articles'>>,
        options = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: Pick<IData, 'status' | 'sources'> | Pick<IData, 'status' | 'totalResults' | 'articles'>) =>
                callback(data)
            )
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
