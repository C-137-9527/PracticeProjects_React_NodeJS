import React, { useState, useContext } from 'react';

import { data } from '../../context/data';

import classes from './UpdateItemForm.module.css';

const UpdateItemForm = ({
  id,
  sku,
  quantity,
  unit,
  location,
  client,
  remark,
  onSetOpenUpdateItemForm,
}) => {
  // access data.js
  const ctx = useContext(data);

  // get any existing available options
  const { unitOptions, locationOptions, clientOptions } = ctx.availableOptions;

  // get and update input/select values
  const [skuInputValue, setSkuInputValue] = useState(sku);
  const [quantityInputValue, setQuantityInputValue] = useState(quantity);
  const [unitSelectValue, setUnitSelectValue] = useState(unit);
  const [locationSelectValue, setLocationSelectValue] = useState(location);
  const [clientSelectValue, setClientSelectValue] = useState(client);
  const [remarkInputValue, setRemarkInputValue] = useState(remark);

  // update item handler
  const updateItemHandler = async () => {
    // start loading
    ctx.setLoading(true);

    try {
      const res = await fetch(
        `https://warehouse-test-f209f-default-rtdb.firebaseio.com/items/${id}.json`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sku: skuInputValue.toUpperCase(),
            quantity: quantityInputValue,
            unit: unitSelectValue,
            location: locationSelectValue,
            client: clientSelectValue,
            remark: remarkInputValue,
          }),
        }
      );

      const data = await res.json();

      if (data.error) throw new Error(data.error.message);

      // refresh page to get newest data from db
      window.location.reload();
    } catch (error) {
      // cancel loading
      ctx.setLoading(false);

      alert(error.message);
    }
  };

  //   submit form handler
  const submitFormHandler = (e) => {
    e.preventDefault();

    // call update item
    updateItemHandler();
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {/* sku */}
      <input
        autoFocus
        required
        type='text'
        placeholder='sku'
        value={skuInputValue}
        onChange={(e) => setSkuInputValue(e.target.value)}
      />

      {/* quantity */}
      <input
        required
        type='number'
        min='1'
        placeholder='quantity'
        value={quantityInputValue}
        onChange={(e) => setQuantityInputValue(e.target.value)}
      />

      {/* unit */}
      <select
        required
        value={unitSelectValue}
        onChange={(e) => setUnitSelectValue(e.target.value)}
      >
        <option value=''>select unit</option>

        {/* avaliable options */}
        {unitOptions}
      </select>

      {/* location */}
      <select
        required
        value={locationSelectValue}
        onChange={(e) => setLocationSelectValue(e.target.value)}
      >
        <option value=''>select location</option>

        {/* avaliable options */}
        {locationOptions}
      </select>

      {/* client */}
      <select
        required
        value={clientSelectValue}
        onChange={(e) => setClientSelectValue(e.target.value)}
      >
        <option value=''>select client</option>

        {/* avaliable options */}
        {clientOptions}
      </select>

      {/* remark */}
      <input
        type='text'
        placeholder='remark'
        value={remarkInputValue}
        onChange={(e) => setRemarkInputValue(e.target.value)}
      />

      <div className={classes.buttons}>
        {/* update item to db */}
        <button type='submit'>UPDATE</button>

        {/* close form without doing anything */}
        <button type='button' onClick={() => onSetOpenUpdateItemForm(false)}>
          cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateItemForm;
