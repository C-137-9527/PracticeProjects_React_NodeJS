import React, { useRef, useContext } from 'react';

import { data } from '../../context/data';

import { BsSearch } from 'react-icons/bs';

import classes from './SearchBars.module.css';

const SearchBars = () => {
  // access data.js
  const ctx = useContext(data);

  // get inputs values
  const skuSearchInputRef = useRef();
  const locationSearchInputRef = useRef();
  const clientSearchInputRef = useRef();

  // get search filters handler
  const getSearchFilters = () => {
    // update search filters in data.js
    ctx.setSearchFilters({
      skuFilter: skuSearchInputRef.current.value,
      locationFilter: locationSearchInputRef.current.value,
      clientFilter: clientSearchInputRef.current.value,
    });
  };

  return (
    <div className={classes.searchbars}>
      {/* sku search bar */}
      <div>
        <input
          type='text'
          placeholder='search for sku'
          ref={skuSearchInputRef}
          onChange={getSearchFilters}
        />

        {/* search icon */}
        <BsSearch className={classes.searchIcon} />
      </div>

      {/* location search bar */}
      <div>
        <input
          type='text'
          placeholder='search for location'
          ref={locationSearchInputRef}
          onChange={getSearchFilters}
        />

        {/* search icon */}
        <BsSearch className={classes.searchIcon} />
      </div>

      {/* client search bar */}
      <div>
        <input
          type='text'
          placeholder='search for client'
          ref={clientSearchInputRef}
          onChange={getSearchFilters}
        />

        {/* search icon */}
        <BsSearch className={classes.searchIcon} />
      </div>
    </div>
  );
};

export default SearchBars;
