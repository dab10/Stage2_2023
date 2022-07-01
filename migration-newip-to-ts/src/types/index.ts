export interface INewsApi {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}
export interface INews {
    source: {
        name: string;
    };
    author: string;
    publishedAt: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
}
