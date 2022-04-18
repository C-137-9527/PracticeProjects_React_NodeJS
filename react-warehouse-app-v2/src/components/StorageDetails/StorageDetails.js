import React, { useContext, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, Outlet } from 'react-router-dom';

import { read, utils, writeFileXLSX } from 'xlsx';

import { SearchBars } from '../index';
import ItemList from './ItemList';
import { data } from '../../context/data';

import classes from './StorageDetails.module.css';

const StorageDetails = () => {
  // navigator
  const navigate = useNavigate();

  // access data in data.js
  const ctx = useContext(data);

  // sort items: ascending. uses useMemo, only re-evaluate if ctx.items changes
  let modifiedItems = useMemo(
    () =>
      ctx.items?.sort(function (a, b) {
        const nameA = a.sku.toUpperCase();
        const nameB = b.sku.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      }),
    [ctx.items]
  );

  // filter items
  if (ctx.searchFilters) {
    // sku filter, non case-sensitive
    if (ctx.searchFilters.skuFilter)
      modifiedItems = modifiedItems.filter((item) =>
        item.sku
          .toUpperCase()
          .includes(ctx.searchFilters.skuFilter.toUpperCase())
      );

    // location filter, non case-sensitive
    if (ctx.searchFilters.locationFilter)
      modifiedItems = modifiedItems.filter((item) =>
        item.location
          .toUpperCase()
          .includes(ctx.searchFilters.locationFilter.toUpperCase())
      );

    // client filter, non case-sensitive
    if (ctx.searchFilters.clientFilter)
      modifiedItems = modifiedItems.filter((item) =>
        item.client
          .toUpperCase()
          .includes(ctx.searchFilters.clientFilter.toUpperCase())
      );
  }

  // loop and render sorted and filtered items
  const itemsList = modifiedItems?.map((item) => (
    <ItemList
      key={item.id}
      id={item.id}
      sku={item.sku}
      quantity={item.quantity}
      unit={item.unit}
      location={item.location}
      client={item.client}
      remark={item.remark}
    />
  ));

  // post item to db handler
  const postNewItem = async (item) => {
    try {
      await fetch(
        'https://warehouse-test-f209f-default-rtdb.firebaseio.com/items.json',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        }
      );
    } catch (error) {
      alert(error.message);
    }
  };

  // export xlsx handler
  const exportXlsxHandler = () => {
    // workbook
    const wb = utils.book_new();

    // worksheet
    const ws = utils.json_to_sheet(modifiedItems);

    // create sheet name
    utils.book_append_sheet(wb, ws, 'items');

    // create file name
    writeFileXLSX(wb, 'K-Trans-Warehouse.xlsx');
  };

  // import xlsx handler
  const importXlsxHandler = (e) => {
    const uploadedFile = e.target.files[0];

    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(uploadedFile);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = read(bufferArray, { type: 'buffer' });

        const firstWorksheet = wb.SheetNames[0];

        const ws = wb.Sheets[firstWorksheet];

        const data = utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (err) => reject(err);
    });

    promise
      .then((data) => {
        // post each item to db
        data.map(async (item, index) => {
          await postNewItem(item);

          // refresh page to get newest data
          if (index === data.length - 1) window.location.reload();
        });
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <div className={classes.tools}>
        {/* search bars */}
        <SearchBars />

        <div className={classes.buttons}>
          {/* button: open add new item form */}
          <button
            className={classes.addNewItemButton}
            onClick={() => navigate('/addNewItem')}
          >
            Add new item
          </button>

          {/* export excel btn */}
          <button className={classes.exportXlsx} onClick={exportXlsxHandler}>
            export xlsx
          </button>

          {/* import excel input */}
          <label className={classes.importXlsx}>
            import xlsx
            <input type='file' onChange={importXlsxHandler} />
          </label>
        </div>
      </div>

      <table className={classes.table}>
        {/* headers */}
        <thead>
          <tr>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Location</th>
            <th>Client</th>
            <th>Remark</th>
            <th>Operations</th>
          </tr>
        </thead>

        {/* items list */}
        <tbody>{itemsList}</tbody>
      </table>

      {/* add new item form, portal to #modal */}
      {createPortal(<Outlet />, document.getElementById('modal'))}
    </>
  );
};

export default StorageDetails;
