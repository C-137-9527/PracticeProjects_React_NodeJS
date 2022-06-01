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

      if (data.error) throw new Error(data.error?.message);

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

    // check if sku input value is valid
    if (!skuInputValue.trim()) return alert('sku or location value not valid');

    // check is number starts with 0
    if (quantityInputValue[0] === '0')
      return alert('number cannot start with 0');

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
        type='number'
        min='1'
        placeholder='数量'
        value={quantityInputValue}
        onChange={(e) => setQuantityInputValue(e.target.value)}
      />

      {/* unit */}
      <select
        value={unitSelectValue}
        onChange={(e) => setUnitSelectValue(e.target.value)}
      >
        <option value=''>选择单位</option>

        {/* avaliable options */}
        {unitOptions}
      </select>

      {/* location */}
      <select
        required
        value={locationSelectValue}
        onChange={(e) => setLocationSelectValue(e.target.value)}
      >
        <option value=''>选择区域</option>

        {/* avaliable options */}
        {locationOptions}
      </select>

      {/* client */}
      <select
        value={clientSelectValue}
        onChange={(e) => setClientSelectValue(e.target.value)}
      >
        <option value=''>选择客户</option>

        {/* avaliable options */}
        {clientOptions}
      </select>

      {/* remark */}
      <input
        type='text'
        placeholder='备注'
        value={remarkInputValue}
        onChange={(e) => setRemarkInputValue(e.target.value)}
      />

      <div className={classes.buttons}>
        {/* update item to db */}
        <button type='submit'>更新</button>

        {/* close form without doing anything */}
        <button type='button' onClick={() => onSetOpenUpdateItemForm(false)}>
          取消
        </button>
      </div>
    </form>
  );
};

export default UpdateItemForm;
