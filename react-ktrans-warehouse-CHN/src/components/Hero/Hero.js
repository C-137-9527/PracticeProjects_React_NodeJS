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

  return (
    <div className={classes.hero}>
      {/* icon */}
      <CgShutterstock className={classes.icon} />

      <div className={classes.count}>
        {/* total unique skus */}
        <p>
          SKU总数量（去重）: <span>{totalUniqueSkus}</span>
        </p>
      </div>
    </div>
  );
};

export default Hero;
