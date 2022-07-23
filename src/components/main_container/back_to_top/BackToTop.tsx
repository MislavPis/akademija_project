import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp } from '@fortawesome/free-solid-svg-icons';

import style from './BackToTop.module.css';

interface Props {

}

const goToTop = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
};

const BackToTop:React.FunctionComponent<Props> = props => {
    const [showButton, setShowButton] = React.useState<boolean>(false);

    React.useEffect(() => {
        window.addEventListener('scroll', handleScrollEvent);

        return () => window.removeEventListener('scroll', handleScrollEvent)
    }, []);

    
    const handleScrollEvent = () => {
        if (window.scrollY >= 150) {
            setShowButton(true);
        } else if (window.scrollY < 150) {
            setShowButton(false);
        }
    };

    return (
        <button className={`${style.button} ${!showButton ? style.button_not_visible : ''}`} onClick={goToTop}>
            <FontAwesomeIcon className={style.button_icon} icon={faCircleUp} />
        </button>
    );
}

export default React.memo(BackToTop);