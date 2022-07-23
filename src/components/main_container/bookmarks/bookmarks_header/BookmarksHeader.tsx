import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import style from './BookmarksHeader.module.css';

interface Props {
    onClickClose(show: boolean): void;
}

const BookmarksHeader:React.FunctionComponent<Props> = props => {
    return (
        <div className={style.bookmarks_header_container}>
            <div className={style.bookmarks_header_title_container}>
                <span>Bookmarks</span>
            </div>
            <div className={style.bookmarks_header_close_container}>
                <button className={style.bookmarks_header_close_button} onClick={props.onClickClose.bind(null, false)} title='Close Bookmarks'>
                    <FontAwesomeIcon icon={faClose} />
                </button>
            </div>
        </div>
    );
}

export default BookmarksHeader;