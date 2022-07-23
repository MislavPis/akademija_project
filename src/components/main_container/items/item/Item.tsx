import React from 'react';

import { Hit } from '../../ReponseHackerNewsData';
import { Data } from '../../useLocalStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

import style from './Item.module.css';

interface Props {
    item: Hit;
    bookmarkItems: Data[];

    onBookamark(data: Data): void;
    onRemoveBookmarkItem(objectId: string): void;
}


const Item:React.FunctionComponent<Props> = props => {
    
    const handleBookmark = () => {
        props.onBookamark({
            objectId: props.item.objectID,
            title: props.item.title,
            url: props.item.url
        });
    };

    const getBookmarkIconColor = (objectId: string) => {
        return props.bookmarkItems.some(i => i.objectId === objectId);
    }

    return (
        <div className={style.item_container}>
            <div className={style.item_header}>
                <h4>
                    <a href={props.item.url} target='_blank noopener noreferrer'>{props.item.title}</a>
                </h4>
                <div className={`${style.item_bookmark} ${getBookmarkIconColor(props.item.objectID) ? style.item_bookmark_red : style.item_bookmark_blue}`} 
                    title='Bookmark' 
                    onClick={getBookmarkIconColor(props.item.objectID) ? () => props.onRemoveBookmarkItem(props.item.objectID) : handleBookmark}>
                        <FontAwesomeIcon icon={faBookmark} />
                </div>
            </div>
            <div className={style.item_details}>
                <h6>Author:</h6>
                <small>{props.item.author}</small>
                <h6>Comments:</h6>
                <small>{props.item.num_comments}</small>
                <h6>Story points:</h6>
                <small>{props.item.points}</small>
                <h6>Created:</h6>
                <small>{new Date(props.item.created_at_i*1000).toLocaleDateString('hr-HR')}</small>
            </div>
        </div>
    );
}

export default Item;