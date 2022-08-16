import React from 'react';
import classes from './Ground.module.css';

// generate html ele: grass and bricks
const grassBlocks = [];
const brickBlocks = [];

for (let i = 0; i < 40; i++) {
  grassBlocks.push(
    <div key={Math.random()} className={classes.ground__lawn__grassBlock}></div>
  );

  brickBlocks.push(
    <div
      key={Math.random()}
      className={classes.ground__walkway__brickBlock}
    ></div>
  );
}

const Ground = () => {
  return (
    <div className={classes.ground}>
      {/* left lawn */}
      <div className={classes.ground__lawn}>
        {/* grass */}
        {grassBlocks}
        {/* left flowers */}
        <div className={classes.ground__lawn__flower}></div>
        <div className={classes.ground__lawn__flower}></div>
      </div>

      {/* walkway */}
      <div className={classes.ground__walkway}>{brickBlocks}</div>

      {/* right lawn */}
      <div className={classes.ground__lawn}>
        {/* grass */}
        {grassBlocks}
        {/* right flowers */}
        <div className={classes.ground__lawn__flower}></div>
        <div className={classes.ground__lawn__flower}></div>
        <div className={classes.ground__lawn__flower}></div>
      </div>
    </div>
  );
};

export default Ground;
