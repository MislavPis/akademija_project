import React from 'react';

import style from './Loader.module.css';

interface Props {
    show: boolean;
    children: JSX.Element;
}

const Loader:React.FunctionComponent<Props> = props => {
    return (

        props.show ? 
            <div className={style.loader_container}>
                <h3 className={style.loader_text}>Loading...</h3>
                <div className={style.loader_spinner}></div>
            </div> :
            props.children
    );
    
}

export default Loader;