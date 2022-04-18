import React, { useContext } from 'react';

import { data } from '../../context/data';

import { CgShutterstock } from 'react-icons/cg';

import classes from './Hero.module.css';

const Hero = () => {
  // access data in data.js
  const ctx = useContext(data);

  // calculate total unique skus
  const itemSkuArr = ctx.items?.map((item) => item.sku);
  const totalUniqueSkus = new Set(itemSkuArr).size;

  // claculate total quantities
  const itemQuantitiesArr = ctx.items?.map((item) => item.quantity);
  const totalQuantities = itemQuantitiesArr.reduce((a, b) => +a + +b, 0);

  return (
    <div className={classes.hero}>
      {/* icon */}
      <CgShutterstock className={classes.icon} />

      <div className={classes.count}>
        {/* total unique skus */}
        <p>
          total unique Skus: <span>{totalUniqueSkus}</span>
        </p>

        {/* total quantities */}
        <p>
          total quantities: <span>{totalQuantities}</span>
        </p>
      </div>
    </div>
  );
};

export default Hero;
