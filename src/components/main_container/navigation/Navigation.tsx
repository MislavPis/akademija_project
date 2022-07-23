import React from 'react';

import SearchForm from './search_form/SearchForm';

import { SearchOptions } from '../MainContainerData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import style from './Navigation.module.css';

interface Props {
    onSubmit(searchOptions: SearchOptions): void;
    onClickBookmarks(show: boolean): void;
}

const Navigation:React.FunctionComponent<Props> = props => {
    return (
        <div className={style.navigation_container}>
            <div className={style.navigation_bookmarks_container}>
                <button className={style.navigation_bookmarks_button} onClick={() => props.onClickBookmarks(true)} title='Show Bookmarks'>
                    <FontAwesomeIcon className={style.navigation_bookmarks_button_icon} icon={faBars} />
                </button>
            </div>
            <SearchForm  onSubmit={props.onSubmit} />
        </div>
    );
}

export default Navigation;