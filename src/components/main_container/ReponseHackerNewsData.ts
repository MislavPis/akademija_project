export interface ResponseHackerNews {
    hits: Hit[];
    page: number;
    nbPages: number;
    nbHits: number;
}

export interface Hit {
    title: string;
    url: string;
    author: String;
    points: number;
    num_comments: number;
    created_at_i: number;
    objectID: string;
}