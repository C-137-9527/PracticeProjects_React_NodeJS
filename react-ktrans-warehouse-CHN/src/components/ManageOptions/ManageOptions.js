import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { data } from '../../context/data';

import classes from './ManageOptions.module.css';

const ManageOptions = () => {
  // navigator
  const navigate = useNavigate();

  // access data.js
  const ctx = useContext(data);

  // get any existing manageOptions and update textarea values
  const manageOptions = ctx.manageOptions;
  const presetUnits = manageOptions.presetUnits;
  const presetLocations = manageOptions.presetLocations;
  const presetClients = manageOptions.presetClients;

  // change fetch to post/put based on if has existing manageOptions in db
  const fetchMethod = manageOptions.id ? 'PUT' : 'POST';
  const fetchUrl = manageOptions.id ? '/' + manageOptions.id : '';

  // post/put data to db handler
  const updateManageOptions = async () => {
    // start loading
    ctx.setLoading(true);

    try {
      const res = await fetch(
        `https://warehouse-test-f209f-default-rtdb.firebaseio.com/manageOptions${fetchUrl}.json`,
        {
          method: fetchMethod,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(manageOptions),
        }
      );

      const data = await res.json();

      if (data.error) throw new Error(data.error?.message);

      // go back home
      navigate('/');

      window.location.reload();
    } catch (error) {
      alert('error.message');

      // cancel loading
      ctx.setLoading(false);
    }
  };

  // submit form handler
  const submitFormHandler = (e) => {
    e.preventDefault();

    // call updateManageOptions
    updateManageOptions();
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.textareas}>
        {/* units */}
        <label>
          Units
          <textarea
            autoFocus
            cols='30'
            rows='10'
            value={presetUnits}
            onChange={(e) =>
              ctx.setManageOptions((prev) => {
                return {
                  ...prev,
                  presetUnits: e.target.value,
                };
              })
            }
          ></textarea>
        </label>

        {/* locations */}
        <label>
          Locations
          <textarea
            cols='30'
            rows='10'
            value={presetLocations}
            onChange={(e) =>
              ctx.setManageOptions((prev) => {
                return {
                  ...prev,
                  presetLocations: e.target.value,
                };
              })
            }
          ></textarea>
        </label>

        {/* clients */}
        <label>
          Clients
          <textarea
            cols='30'
            rows='10'
            value={presetClients}
            onChange={(e) =>
              ctx.setManageOptions((prev) => {
                return {
                  ...prev,
                  presetClients: e.target.value,
                };
              })
            }
          ></textarea>
        </label>
      </div>

      {/*  submit */}
      <div>
        <button type='submit'>Update</button>
      </div>
    </form>
  );
};

export default ManageOptions;
