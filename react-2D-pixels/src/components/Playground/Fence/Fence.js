import React from 'react';
import classes from './Fence.module.css';

// generate fence patterns - bars
const fenceBars = [];

for (let i = 0; i < 15; i++) {
  fenceBars.push(
    <div key={Math.random()} className={classes.fence__patterns__longBar}></div>
  );

  fenceBars.push(
    <div
      key={Math.random()}
      className={classes.fence__patterns__shortBar}
    ></div>
  );
}

const Fence = () => {
  return (
    <div className={classes.fence}>
      <div className={classes.fence__patterns}>{fenceBars}</div>
    </div>
  );
};

export default Fence;
