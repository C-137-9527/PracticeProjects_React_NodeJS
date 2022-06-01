import React, { useState, useContext } from 'react';
import { createPortal } from 'react-dom';

import UpdateItemForm from '../Forms/UpdateItemForm';

import { data } from '../../context/data';

import classes from './ItemList.module.css';

const ItemList = ({
  id,
  sku = '',
  quantity = '',
  unit = '',
  location = '',
  client = '',
  remark,
}) => {
  // access data.js
  const ctx = useContext(data);

  // update item form
  const [openUpdateItemForm, setOpenUpdateItemForm] = useState(false);

  // delete item handler
  const deleteItemHandler = async () => {
    // start loading
    ctx.setLoading(true);

    try {
      await fetch(
        `https://warehouse-test-f209f-default-rtdb.firebaseio.com/items/${id}.json`,
        {
          method: 'DELETE',
        }
      );

      // refresh page to get newest data from db
      window.location.reload();
    } catch (error) {
      // cancel loading
      ctx.setLoading(false);

      alert(error.message);
    }
  };

  // toggle confirm message window
  const [confirmMessage, setConfirmMessage] = useState(false);

  return (
    <tr className={classes.itemList}>
      {/* item list */}
      <td className={classes.sku}>{sku}</td>
      <td>{quantity + ' ' + unit}</td>
      <td>{location}</td>
      <td>{client}</td>
      <td>{remark}</td>
      <td>
        <button onClick={() => setOpenUpdateItemForm(true)}>编辑</button>
        <button onClick={() => setConfirmMessage(true)}>删除</button>
      </td>

      {/* toggle update item form on off */}
      {openUpdateItemForm &&
        createPortal(
          <UpdateItemForm
            id={id}
            sku={sku}
            quantity={quantity}
            unit={unit}
            location={location}
            client={client}
            remark={remark}
            onSetOpenUpdateItemForm={setOpenUpdateItemForm}
          />,
          document.getElementById('modal')
        )}

      {/* toggle confirm message on off */}
      {confirmMessage &&
        createPortal(
          <div className={classes.deleteConfirmMessage}>
            <p>
              请确认删除 <span>{sku}</span>
            </p>

            <div className={classes.buttons}>
              {/* button: confirm delete */}
              <button onClick={deleteItemHandler}>删除</button>

              {/* button: close window without doing anything */}
              <button onClick={() => setConfirmMessage(false)}>取消</button>
            </div>
          </div>,
          document.getElementById('modal')
        )}
    </tr>
  );
};

export default ItemList;
