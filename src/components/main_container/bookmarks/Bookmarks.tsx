import React from 'react';

import BookmarksHeader from './bookmarks_header/BookmarksHeader';

import { Data } from '../useLocalStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import style from './Bookmarks.module.css';

interface Props {
    bookmarkItems: Data[];
    showBookmarks: boolean;

    onClickClose(show: boolean): void;
    onRemoveBookmarkItem(objectId: string): void;
}

const Bookmarks:React.FunctionComponent<Props> = props => {
    const {showBookmarks} = props;

    return (
        <div className={`${style.bookmarks_container} ${showBookmarks ? style.bookmarks_header_container_show : style.bookmarks_header_container_hidden}`}>
            <BookmarksHeader onClickClose={props.onClickClose}/>
            <div className={style.bookmark_items_container}>
                {
                    props.bookmarkItems.map(item => {
                        return (
                            <div key={item.objectId} className={style.bookmark_item}>
                                <a href={item.url} target='_blank noopener noreferrer'>{item.title}</a>
                                <button>
                                    <FontAwesomeIcon icon={faClose} onClick={() => props.onRemoveBookmarkItem(item.objectId)} />
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Bookmarks;