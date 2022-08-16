import React from 'react';
import classes from './Building.module.css';

const Buidings = () => {
  return (
    <div className={classes.buildings}>
      {/* wall left */}
      <div className={classes.buildings__wall}>
        <div className={classes.buildings__wall__patterns}></div>
      </div>

      {/* main building */}
      <div className={classes.buildings__main}>
        <div className={classes.buildings__main__rooms}>
          <div className={classes.buildings__main__rooms__roomLeft}></div>
          <div className={classes.buildings__main__rooms__roomMid}></div>
          <div className={classes.buildings__main__rooms__roomRight}></div>
        </div>
      </div>

      {/* wall right */}
      <div className={classes.buildings__wall}>
        <div className={classes.buildings__wall__patterns}>
          <div className={classes.buildings__wall__picture}></div>
        </div>
      </div>
    </div>
  );
};

export default Buidings;
