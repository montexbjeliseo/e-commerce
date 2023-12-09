import { useId } from 'react';
import searchIcon from '../../../assets/icons/search.svg'

export const SearchInput = () => {

    const searchInputId = useId();

    return (
        <div className="search-form">
            <label htmlFor={searchInputId}><img src={searchIcon} alt="Search icon" title='Search Icon'/></label>
            <input className="search-input" type="search" name="search" id={searchInputId} placeholder="Search" />
        </div>
    )
}