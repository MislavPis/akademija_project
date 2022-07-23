import axios from 'axios';

import Loader from './loader/Loader';
import Items from './items/Items';
import BackToTop from './back_to_top/BackToTop';

import Pagination from './pagination/Pagination';
import Navigation from './navigation/Navigation';
import Bookmarks from './bookmarks/Bookmarks';

import { ResponseHackerNews } from './ReponseHackerNewsData';
import { Actions, DataReducer, SearchOptions } from './MainContainerData';
import useLocalStorage, { Data } from './useLocalStorage';
import { useCallback, useEffect, useReducer, useState } from 'react';

const HACKER_NEWS_API = 'http://hn.algolia.com/api/v1/search?query=';

interface Props {

}

const dataReducerInit: DataReducer = {
    data: undefined,
    isLoading: false,
    isError: false
}

const dataReducerFunction = (state: DataReducer, action: Actions) => {
    switch (action.type) {
        case process.env.REACT_APP_LOADING_FETCH:
            return {
                ...state,
                isLoading: true,
                data: undefined
            } as DataReducer;
        case process.env.REACT_APP_SUCCESS_FETCH:
            return {
               isLoading: false,
               isError: false,
               data: action.payload
            } as DataReducer;
        case process.env.REACT_APP_ERROR_FETCH:
            return {
                isLoading: false,
                isError: true,
                data: undefined
            } as DataReducer;
        default: 
            return {
                ...state,
                isError: true
            } as DataReducer
    };
}

const MainContainer:React.FunctionComponent<Props> = props => {

    const [showBookmarks, setShowBookmarks] = useState<boolean>(false);
    const [searchOptions, setSearchOptions] = useState<SearchOptions>(
        {
            search: '',
            page: 0
        }
    );

    const [localStateItems, setLocalStateItems] = useLocalStorage('items');

    const [dataReducer, callDataReducerFunction] = useReducer(
        dataReducerFunction,
        dataReducerInit
    );

    const handleSubmit = (searchOptions: SearchOptions) => {
        setSearchOptions(searchOptions);
    };

    const handleNextPage = () => {
        setSearchOptions((options: SearchOptions) => {
            return {
                ...options,
                page: options.page + 1
            }
        });
    }

    const handlePreviousPage = () => {
        setSearchOptions((options: SearchOptions) => {
            return {
                ...options,
                page: options.page - 1,
            }
        });
    };

    const addToBookmark = (data: Data) => {
        setLocalStateItems((items) => {
            return [...items, data];
        });
    };


    const removeFromBookmark = (objectId: string) => {
        setLocalStateItems((items) => {
            return items.filter(i => i.objectId !== objectId);
        });
    };

    const fetchData = useCallback(async () => {
        if (!!!searchOptions.search) {
            return;
        }

        callDataReducerFunction({
            type: process.env.REACT_APP_LOADING_FETCH || '',
            payload: ''
        });

        try {
                const data: ResponseHackerNews = (await axios(`${HACKER_NEWS_API}${searchOptions.search}&page=${searchOptions.page}`)).data;
        
                callDataReducerFunction({
                    type: process.env.REACT_APP_SUCCESS_FETCH || '',
                    payload: data
                });

        } catch (e) {
            callDataReducerFunction({
                type: process.env.REACT_APP_ERROR_FETCH || '',
                payload: ''
            });
        }


    }, [searchOptions]);

    useEffect(() => {
        
        fetchData();

    }, [fetchData]);

    return (
        <Loader show={dataReducer.isLoading}>
            <>
                <Bookmarks bookmarkItems={localStateItems} showBookmarks={showBookmarks} onClickClose={setShowBookmarks} onRemoveBookmarkItem={removeFromBookmark} />

                <Navigation onSubmit={handleSubmit} onClickBookmarks={setShowBookmarks} />
                <Items bookmarkItems={localStateItems} data={dataReducer.data} onRemoveBookmarkItem={removeFromBookmark} onBookamark={addToBookmark} />
                <Pagination page={dataReducer.data?.page} nbPages={dataReducer.data?.nbPages} onNextPage={handleNextPage} onPreviousPage={handlePreviousPage} />

                <BackToTop />
            </>
        </Loader>
    );
}

export default MainContainer;