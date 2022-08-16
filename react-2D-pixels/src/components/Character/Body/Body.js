import React from 'react';
import classes from './Body.module.css';

const Body = ({ isWalking }) => {
  // toggle class to update walking animation
  const walkingClass = isWalking ? classes.walking : '';

  return <div className={classes.body + ' ' + walkingClass}></div>;
};

export default Body;
