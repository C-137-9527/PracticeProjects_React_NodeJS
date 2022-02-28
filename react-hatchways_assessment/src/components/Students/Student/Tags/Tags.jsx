import React, { useEffect, useState, memo } from 'react';
import classes from './Tags.module.css';
import InvalidEntryMessage from '../../../Messages/InvalidEntryMessage';

const Tags = ({ setGetAddedTags }) => {
  // store and update tags
  const [tags, setTags] = useState([]);

  // get and update user entered values
  const [userInput, setUserInput] = useState('');

  // check if user input is valid
  const [isInvalid, setIsInvalid] = useState(false);

  // output tags list
  const tagsList = tags.map((tag, index) => <li key={index}>{tag}</li>);

  // get user input handler
  const userInputHandler = (e) => {
    setUserInput(e.target.value);
    setIsInvalid(false);
  };

  // add a tag handler
  const addTag = (e) => {
    e.preventDefault();
    if (userInput.trim() === '') return setIsInvalid(true);
    setTags((prevTags) => [...prevTags, userInput]);
    setUserInput('');
  };

  // alert invalid entry by toggle className to change input color
  const invalidEntryClass = isInvalid ? 'invalidEntry' : '';

  // pass tags to parent component (Student.jsx)
  useEffect(() => {
    setGetAddedTags(tags);
  }, [setGetAddedTags, tags]);

  return (
    <form className={classes.tags} onSubmit={addTag}>
      <ul>{tagsList}</ul>
      <input
        className={classes[invalidEntryClass]}
        type='text'
        placeholder='Add a tag'
        value={userInput}
        onChange={userInputHandler}
      />

      {/* invalid entry alert message */}
      {isInvalid && <InvalidEntryMessage />}
    </form>
  );
};

export default memo(Tags);
