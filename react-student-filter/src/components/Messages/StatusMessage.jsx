import React from 'react';
import classes from './Messages.module.css';

const StatusMessage = ({ message }) => {
  return <h2 className={classes.statusMessage}>{message}</h2>;
};

export default StatusMessage;
