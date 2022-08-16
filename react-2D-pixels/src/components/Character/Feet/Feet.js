import React from 'react';
import classes from './Feet.module.css';

const Feet = ({ isWalking }) => {
  // toggle class to update walking animation
  const walkingClass = isWalking ? classes.walking : '';

  return <div className={classes.feet + ' ' + walkingClass}></div>;
};

export default Feet;
