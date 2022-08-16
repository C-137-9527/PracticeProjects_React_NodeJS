import React from 'react';
import classes from './SmallScreenAlert.module.css';
import { useState } from 'react';

/* only visible on small screen */
const SmallScreenAlert = () => {
  // close alert window on button click
  const [showAlert, setShowAlert] = useState(true);

  return (
    <>
      {showAlert && (
        <div className={classes.alertWindow}>
          <p>
            WARNING: This app is not designed for small screen or mobile. App
            may not work as expected.
          </p>
          <button onClick={() => setShowAlert(false)}>OK</button>
        </div>
      )}
    </>
  );
};

export default SmallScreenAlert;
