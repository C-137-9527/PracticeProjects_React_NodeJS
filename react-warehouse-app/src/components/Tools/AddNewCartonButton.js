import React from 'react';

import classes from './AddNewCartonButton.module.css';

const AddNewCartonButton = ({ onSetShowAddCartonWindow }) => {
  return (
    <button
      className={classes.addNewCarton}
      onClick={() => {
        onSetShowAddCartonWindow(true);
      }}
    >
      Add New Carton
    </button>
  );
};

export default AddNewCartonButton;
