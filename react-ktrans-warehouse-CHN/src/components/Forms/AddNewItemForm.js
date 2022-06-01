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
    // start loading
    ctx.setLoading(true);

    try {
      const res = await fetch(
        'https://warehouse-test-f209f-default-rtdb.firebaseio.com/items.json',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sku: skuInputRef.current.value.toUpperCase(),
            quantity: quantityInputRef.current.value,
            unit: unitSelectRef.current.value,
            location: locationSelectRef.current.value,
            client: clientSelectRef.current.value,
            remark: remarkInputRef.current.value,
          }),
        }
      );

      const data = await res.json();

      if (data.error) throw new Error(data.error?.message);

      // close form
      navigate('/');

      // refresh page to get newest data from db
      window.location.reload();
    } catch (error) {
      // cancel loading
      ctx.setLoading(false);

      alert(error.message);
    }
  };

  // submit form handler
  const submitFormHandler = async (e) => {
    e.preventDefault();

    // check if sku input value is valid
    if (!skuInputRef.current.value.trim())
      return alert('sku or location value not valid');

    // check is number starts with 0
    if (quantityInputRef.current.value[0] === '0')
      return alert('number cannot start with 0');

    // call postNewItem
    await postNewItem();
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {/* sku */}
      <input
        autoFocus
        required
        type='text'
        placeholder='sku'
        ref={skuInputRef}
      />

      {/* quantity */}
      <input type='number' min='1' placeholder='数量' ref={quantityInputRef} />

      {/* unit */}
      <select ref={unitSelectRef}>
        <option value=''>选择单位</option>

        {/* avaliable options */}
        {unitOptions}
      </select>

      {/* location */}
      <select required ref={locationSelectRef}>
        <option value=''>选择区域</option>

        {/* avaliable options */}
        {locationOptions}
      </select>

      {/* client */}
      <select ref={clientSelectRef}>
        <option value=''>选择客户</option>

        {/* avaliable options */}
        {clientOptions}
      </select>

      {/* remark */}
      <input type='text' placeholder='备注' ref={remarkInputRef} />

      <div className={classes.buttons}>
        {/* submit form */}
        <button type='submit'>添加</button>

        {/* close form without doing anything */}
        <button onClick={() => navigate('/')}>取消</button>
      </div>
    </form>
  );
};

export default AddNewItemForm;
