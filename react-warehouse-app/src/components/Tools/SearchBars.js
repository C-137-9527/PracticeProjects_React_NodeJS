import React from 'react';
import { useRef } from 'react';

import AddNewCartonButton from './AddNewCartonButton';

import classes from './SearchBars.module.css';

import { BiSearch } from 'react-icons/bi';

const SearchBars = ({
  onSetIdFilter,
  onSetSectionFilter,
  onSetShowAddCartonWindow,
}) => {
  // input refs
  const idSearchInputRef = useRef();
  const sectionSearchInputRef = useRef();

  // id search handler
  const cartonFilterHandler = () => {
    // update id filter in app.js
    onSetIdFilter(idSearchInputRef.current.value);
  };

  // section search handler
  const sectionFilterHandler = () => {
    // update section filter in app.js
    onSetSectionFilter(sectionSearchInputRef.current.value);
  };

  return (
    <div className={classes.searchbars}>
      {/* search for carton id */}
      <label>
        <input
          ref={idSearchInputRef}
          type='text'
          placeholder='Search for id'
          onChange={cartonFilterHandler}
        />
        <BiSearch className={classes.icon} />
      </label>

      {/* search for section */}
      <label>
        <input
          ref={sectionSearchInputRef}
          type='text'
          placeholder='Search for section'
          onChange={sectionFilterHandler}
        />
        <BiSearch className={classes.icon} />
      </label>

      <AddNewCartonButton onSetShowAddCartonWindow={onSetShowAddCartonWindow} />
    </div>
  );
};

export default SearchBars;
