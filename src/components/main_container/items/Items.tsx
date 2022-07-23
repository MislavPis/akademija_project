import React from 'react';

import Item from './item/Item';

import { ResponseHackerNews } from '../ReponseHackerNewsData';
import { Data } from '../useLocalStorage';

import style from './Items.module.css';

interface Props {
    data: ResponseHackerNews | undefined;
    bookmarkItems: Data[];

    onBookamark(data: Data): void;
    onRemoveBookmarkItem(objectId: string): void;
}

const Items:React.FunctionComponent<Props> = props => {
    return (
        <div className={style.items_container}>
            {
                props.data?.hits.map((item, index) => {
                    return <Item key={index} bookmarkItems={props.bookmarkItems} onRemoveBookmarkItem={props.onRemoveBookmarkItem} onBookamark={props.onBookamark} item={item} />
                })
            }
        </div>
    )
};

export default Items;