import React, { useContext } from 'react';

import { data } from '../../context/data';

import { CgShutterstock } from 'react-icons/cg';

import classes from './Hero.module.css';

const Hero = () => {
  // access data in data.js
  const ctx = useContext(data);

  // calculate total unique skus
  const itemSkuArr = ctx.items?.map((item) => {
    if (item.sku) {
      return item.sku;
    } else {
      return 'no sku';
    }
  });
  const totalUniqueSkus = new Set(itemSkuArr).size;

  // claculate total quantities
  const itemQuantitiesArr = ctx.items?.map((item) => {
    if (item.quantity) {
      return item.quantity;
    } else {
      return 0;
    }
  });
  const totalQuantities = itemQuantitiesArr.reduce((a, b) => +a + +b, 0);

  return (
    <div className={classes.hero}>
      {/* icon */}
      <CgShutterstock className={classes.icon} />

      <div className={classes.count}>
        {/* total unique skus */}
        <p>
          Total Unique Skus: <span>{totalUniqueSkus}</span>
        </p>

        {/* total quantities */}
        <p>
          Total Quantities: <span>{totalQuantities}</span>
        </p>
      </div>
    </div>
  );
};

export default Hero;
