import React from 'react';
import { useState } from 'react';

import classes from './CartonForm.module.css';

import { AiOutlineCloseCircle } from 'react-icons/ai';

const CartonForm = ({
  editCurrentCarton: {
    _ID = '',
    id = '',
    quantity = '',
    section = '',
    remark = '',
  },
  onSetEditCurrentcarton,
  onSetShowAddCartonWindow,
  onSetDataUpdated,
}) => {
  // get and update input value (two way binding)
  const [idValue, setidValue] = useState(id);
  const [quantityValue, setQuantityValue] = useState(quantity);
  const [sectionValue, setSectionValue] = useState(section);
  const [remarkValue, setRemarkValue] = useState(remark);

  // post new data to db
  const updateCartonsArr = async () => {
    try {
      await fetch(
        'https://warehouse-test-f209f-default-rtdb.firebaseio.com/cartonsArr.json',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: idValue.toUpperCase(),
            quantity: quantityValue,
            section: sectionValue.toUpperCase(),
            remark: remarkValue,
          }),
        }
      );

      // re-render page unpon success update
      onSetDataUpdated({});
    } catch (error) {
      alert(error.message);
    }
  };

  // change existing data on db
  const putCartonsArr = async () => {
    try {
      await fetch(
        `https://warehouse-test-f209f-default-rtdb.firebaseio.com/cartonsArr/${_ID}.json`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: idValue.toUpperCase(),
            quantity: quantityValue,
            section: sectionValue.toUpperCase(),
            remark: remarkValue,
          }),
        }
      );

      // re-render page unpon success update
      onSetDataUpdated({});
    } catch (error) {
      alert(error.message);
    }
  };

  // submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    // if creating new carton: add new carton into carton arr
    if (!_ID) {
      // update data to db
      updateCartonsArr();

      // empty entries
      setidValue('');
      setQuantityValue('');
      setSectionValue('');
      setRemarkValue('');

      // close window
      onSetShowAddCartonWindow(false);
    }

    // if editing current carton: find and update existing data
    if (_ID) {
      // change data on db
      putCartonsArr();

      // close editing window
      onSetEditCurrentcarton('');
    }
  };

  // close window handler
  const closeWindowHandler = () => {
    // close add new carton window
    if (!_ID) onSetShowAddCartonWindow(false);

    // close editing window
    if (_ID) onSetEditCurrentcarton('');
  };

  // toggle classname to change bg color
  const formClassName = _ID ? classes.editCurrentCarton : '';

  return (
    <form
      onSubmit={submitHandler}
      className={classes.form + ' ' + formClassName}
    >
      {/* form title */}
      <p>{_ID ? 'Edit Carton' : 'Add New Carton'}</p>

      <div className={classes.inputs}>
        {/* id input */}
        <input
          type='text'
          placeholder='id'
          value={idValue}
          onChange={(e) => setidValue(e.target.value)}
          required
          autoFocus
        />

        {/* quantity input */}
        <input
          type='number'
          placeholder='quantity'
          value={quantityValue}
          min='0'
          onChange={(e) => setQuantityValue(e.target.value)}
          required
        />

        {/* section input */}
        <input
          type='text'
          placeholder='section'
          value={sectionValue}
          onChange={(e) => setSectionValue(e.target.value)}
          required
        />

        {/* remark input */}
        <input
          type='text'
          placeholder='remark'
          value={remarkValue}
          onChange={(e) => setRemarkValue(e.target.value)}
        />
      </div>

      {/* submit form with new data */}
      <button type='submit'>{_ID ? 'Update' : 'Add'}</button>

      {/* close window */}
      <AiOutlineCloseCircle
        className={classes.close}
        onClick={closeWindowHandler}
      />
    </form>
  );
};

export default CartonForm;
