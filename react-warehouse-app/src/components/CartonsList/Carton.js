import React from 'react';

import classes from './Carton.module.css';

import { BsInboxes } from 'react-icons/bs';
import { GoLocation } from 'react-icons/go';

const Carton = ({
  _ID,
  id,
  quantity,
  section,
  remark,
  onSetEditcarton,
  onSetDataUpdated,
}) => {
  // edit carton handler
  const editcartonHandler = () => {
    // update current carton details in app.js
    onSetEditcarton({ _ID, id, quantity, section, remark });
  };

  // delete carton hanlder
  const deletecartonHandler = async () => {
    try {
      await fetch(
        `https://warehouse-test-f209f-default-rtdb.firebaseio.com/cartonsArr/${_ID}.json`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      // re-render page unpon success update
      onSetDataUpdated({});
    } catch (error) {
      alert(error.message);
    }
  };

  // copy id handler
  const copyIdHandler = (e) => {
    navigator.clipboard.writeText(id);
  };

  return (
    <li className={classes.list}>
      <p>
        <span className={classes.idField} onClick={copyIdHandler}>
          {id}
        </span>
      </p>
      <p>
        <BsInboxes /> {quantity}
      </p>
      <p>
        <GoLocation /> {section}
      </p>
      <p>{remark}</p>
      <div className={classes.buttons}>
        <button onClick={editcartonHandler}>edit</button>
        <button onClick={deletecartonHandler}>delete</button>
      </div>
    </li>
  );
};

export default Carton;
