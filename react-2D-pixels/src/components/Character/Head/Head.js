import React from 'react';
import classes from './Head.module.css';

const Head = ({ isWalking }) => {
  // toggle class to update walking animation
  const walkingClass = isWalking ? classes.walking : '';

  return (
    <div className={classes.head + ' ' + walkingClass}>
      <div className={classes.head__forehead}></div>
      <div className={classes.head__faceShadow}></div>
    </div>
  );
};

export default Head;
