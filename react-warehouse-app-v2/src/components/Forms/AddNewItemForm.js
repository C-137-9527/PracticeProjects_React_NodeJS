import React, { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { data } from '../../context/data';

import classes from './AddNewItemForm.module.css';

const AddNewItemForm = () => {
  // navigator
  const navigate = useNavigate();

  // access data.js
  const ctx = useContext(data);

  // get any existing available options
  const { unitOptions, locationOptions, clientOptions } = ctx.availableOptions;

  // get inputs values
  const skuInputRef = useRef();
  const quantityInputRef = useRef();
  const unitSelectRef = useRef();
  const locationSelectRef = useRef();
  const clientSelectRef = useRef();
  const remarkInputRef = useRef();

  // post new item to db handler
  const postNewItem = async () => {
    try {
      await fetch(
        'https://warehouse-test-f209f-default-rtdb.firebaseio.com/items.json',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sku: skuInputRef.current.value,
            quantity: quantityInputRef.current.value,
            unit: unitSelectRef.current.value,
            location: locationSelectRef.current.value,
            client: clientSelectRef.current.value,
            remark: remarkInputRef.current.value,
          }),
        }
      );

      // refresh page to get newest data from db
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  // submit form handler
  const submitFormHandler = async (e) => {
    e.preventDefault();

    // call postNewItem
    await postNewItem();

    // refresh page to get newest data from db
    window.location.reload();
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {/* sku */}
      <input
        autoFocus
        required
        type='text'
        placeholder='Sku'
        ref={skuInputRef}
      />

      {/* quantity */}
      <input
        required
        type='number'
        min='1'
        placeholder='Quantity'
        ref={quantityInputRef}
      />

      {/* unit */}
      <select required ref={unitSelectRef}>
        <option value=''>select unit</option>

        {/* avaliable options */}
        {unitOptions}
      </select>

      {/* location */}
      <select required ref={locationSelectRef}>
        <option value=''>select location</option>

        {/* avaliable options */}
        {locationOptions}
      </select>

      {/* client */}
      <select required ref={clientSelectRef}>
        <option value=''>select client</option>

        {/* avaliable options */}
        {clientOptions}
      </select>

      {/* remark */}
      <input type='text' placeholder='Remark' ref={remarkInputRef} />

      <div className={classes.buttons}>
        {/* submit form */}
        <button type='submit'>ADD</button>

        {/* close form without doing anything */}
        <button onClick={() => navigate('/')}>cancel</button>
      </div>
    </form>
  );
};

export default AddNewItemForm;
