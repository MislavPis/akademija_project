import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { SearchOptions } from '../../MainContainerData';

import style from './SearchForm.module.css';

interface Props {
    onSubmit: (searchOptions: SearchOptions) => void;
}

const SearchForm:React.FunctionComponent<Props> = props => {

    const [inputTerm, setInputTerm] = React.useState<string>('');

    const inputRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

    const onClickSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        props.onSubmit({
            search: inputTerm,
            page: 0
        });    

        e.preventDefault();
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setInputTerm((e.target as HTMLInputElement).value);
    }

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div className={style.search_form_container} id='search_container'>
            <form className={style.search_form} onSubmit={onClickSubmit}>
                <input type='text' onChange={handleChange} id='search_value' className={style.search_form_input} placeholder='Pretraži' ref={inputRef} />
                <button type='submit' id='search_submit' className={style.search_form_submit} disabled={!inputTerm}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
        </div>
    )
}

export default SearchForm;