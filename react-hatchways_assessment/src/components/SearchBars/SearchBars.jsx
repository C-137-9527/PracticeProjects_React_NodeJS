import React, { useState, useEffect } from 'react';
import classes from './SearchBars.module.css';
import InvalidEntryMessage from '../Messages/InvalidEntryMessage';

const SearchBar = ({ onFilter }) => {
  // store and update name filter
  const [nameFilter, setNameFilter] = useState('');

  // store and update tag filter
  const [tagFilter, setTagFilter] = useState('');

  // check if user input is valid
  const [isInvalid, setIsInvalid] = useState(false);

  // update name filter handler
  const handleNameFilter = (e) => {
    setNameFilter(e.target.value.trim());
    setIsInvalid(false);
  };

  // update tag filter handler
  const handleTagFilter = (e) => {
    setTagFilter(e.target.value.trim());
    setIsInvalid(false);
  };

  // on submit validate user input
  const submithandler = (e) => {
    e.preventDefault();
    if (!nameFilter && !tagFilter) setIsInvalid(true);
  };

  // alert invalid entry by toggle className to change input color
  const invalidEntryClass = isInvalid ? 'invalidEntry' : '';

  // pass newest filter state to app.jsx
  useEffect(() => {
    onFilter({ nameFilter, tagFilter });
  }, [onFilter, nameFilter, tagFilter]);

  return (
    <form className={classes.searchBar} onSubmit={submithandler}>
      {/* name search bar */}
      <input
        className={classes[invalidEntryClass]}
        type='input'
        placeholder='Search by name'
        onChange={handleNameFilter}
      />
      {/* tag search bar */}
      <input
        className={classes[invalidEntryClass]}
        type='input'
        placeholder='Search by tag'
        onChange={handleTagFilter}
      />
      {/* allow form submission */}
      <button type='submit' hidden></button>

      {/* invalid entry alert message */}
      {isInvalid && <InvalidEntryMessage />}
    </form>
  );
};

export default SearchBar;
