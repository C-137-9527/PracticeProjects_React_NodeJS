import React from 'react';

import classes from './Hero.module.css';

import { IoLogoBuffer } from 'react-icons/io';

const Hero = ({ cartonsArr }) => {
  // caculate total unique IDs
  const cartonIdsArr = cartonsArr.map((carton) => carton.id);
  const UniqueIDs = new Set(cartonIdsArr);

  // calculate total quantities
  const cartonQuantities = cartonsArr.map((carton) => +carton.quantity);
  const totalQuantity = cartonQuantities.reduce(
    (prevValue, currentValue) => prevValue + currentValue,
    0
  );

  return (
    <div className={classes.hero}>
      <div>
        <IoLogoBuffer className={classes.icon} />
        <h1>K Trans</h1>
      </div>

      <div>
        <h4>
          total unqiue IDs:{' '}
          <span className={classes.count}>{UniqueIDs.size}</span>
        </h4>
        <h4>
          total quantities:{' '}
          <span className={classes.count}>{totalQuantity}</span>
        </h4>
      </div>
    </div>
  );
};

export default Hero;
