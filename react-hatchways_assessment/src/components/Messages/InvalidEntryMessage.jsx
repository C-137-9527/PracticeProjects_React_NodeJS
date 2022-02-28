import React from 'react';
import classes from './Messages.module.css';

const InvalidEntryMessage = () => {
  return (
    <p className={classes.invalidEntryMessage}>please enter something valid</p>
  );
};

export default InvalidEntryMessage;
