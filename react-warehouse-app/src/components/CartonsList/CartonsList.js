import React from 'react';

import Carton from './Carton';

import classes from './CartonsList.module.css';

const CartonsList = ({ cartonsArr, onSetEditcarton, onSetDataUpdated }) => {
  // sort carton array: ascending
  const sortedcartonsArr = cartonsArr.sort(function (a, b) {
    const nameA = a.id.toUpperCase(); // ignore upper and lowercase
    const nameB = b.id.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  return (
    <div className={classes.list}>
      {/* list titles */}
      <p className={classes.listTitles}>
        <span>ID</span>
        <span>Quantity</span>
        <span>Section</span>
        <span>Remark</span>
        <span>Operations</span>
      </p>

      {/* check cartons arr length */}
      {sortedcartonsArr.length === 0 ? (
        <h2 className={classes.noData}>no data avaliable</h2>
      ) : (
        ''
      )}

      {/* render carton list based on sorted carton arr */}
      <ul className={classes.cartonsList}>
        {sortedcartonsArr.map((carton) => (
          <Carton
            key={Math.random()}
            _ID={carton._ID}
            id={carton.id}
            quantity={carton.quantity}
            section={carton.section}
            remark={carton.remark}
            onSetEditcarton={onSetEditcarton}
            onSetDataUpdated={onSetDataUpdated}
          />
        ))}
      </ul>
    </div>
  );
};

export default CartonsList;
