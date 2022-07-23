import { ResponseHackerNews } from "./ReponseHackerNewsData";

export interface DataReducer {
    data: ResponseHackerNews | undefined;
    isLoading: boolean;
    isError: boolean;
}

export interface Actions {
    type: string;
    payload: any;
}

export interface SearchOptions {
    search: string;
    page: number;
}