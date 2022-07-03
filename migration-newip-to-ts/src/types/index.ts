export interface IData {
    status: string;
    sources: Array<ISources>;
    totalResults: number;
    articles: Array<IArticles>;
}

export interface ISources {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface IArticles {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export type Callback<T> = (data: T) => void;

export enum HTTPErrors {
    Unauthorized = 401,
    NotFound = 404,
}
