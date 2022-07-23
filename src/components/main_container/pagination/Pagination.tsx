import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import style from './Pagination.module.css';

interface Props {
    page: number | undefined;
    nbPages: number | undefined;

    onNextPage(): void;
    onPreviousPage(): void;
}

const Pagination:React.FunctionComponent<Props> = props => {

    if (props.page === undefined || props.nbPages === undefined) {
        return <></>
    }

    return (
        <div className={style.navigation_container}>
            <button className={style.navigation_button + ' ' + style.navigation_button_left} onClick={props.onPreviousPage} disabled={props.page === 0}>
                <FontAwesomeIcon className={style.navigation_button_icon} icon={faArrowLeft} />
            </button>
            <small>{props.page + 1} / {props.nbPages + 1}</small>
            <button className={style.navigation_button + ' ' + style.navigation_button_right} onClick={props.onNextPage} disabled={props.page === props.nbPages}>
                <FontAwesomeIcon className={style.navigation_button_icon} icon={faArrowRight} />
            </button>
        </div>
    );

}

export default Pagination;