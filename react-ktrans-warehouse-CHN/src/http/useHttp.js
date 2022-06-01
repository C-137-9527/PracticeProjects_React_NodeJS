import React, { useEffect, useContext } from 'react';
import { data } from '../context/data';

const useHttp = () => {
  // access data.js
  const ctx = useContext(data);

  // get items from db
  const getItems = async () => {
    // start loading
    ctx.setLoading(true);

    try {
      const res = await fetch(
        'https://warehouse-test-f209f-default-rtdb.firebaseio.com/items.json'
      );

      const data = await res.json();

      if (!data) return;

      if (data.error) throw new Error(data.error?.message);

      // if has data, update items in data.js
      let items = [];
      for (const key in data) {
        const id = key;
        const { sku, quantity, unit, location, client, remark } = data[key];

        items.push({
          id,
          sku,
          quantity,
          unit,
          location,
          client,
          remark,
        });
      }

      ctx.setItems(items);
    } catch (error) {
      alert(error.message);
    }

    // cancel loading
    ctx.setLoading(false);
  };

  // get manageOptions from db
  const getManageOptions = async () => {
    // start loading
    ctx.setLoading(true);

    try {
      const res = await fetch(
        'https://warehouse-test-f209f-default-rtdb.firebaseio.com/manageOptions.json'
      );

      const data = await res.json();

      if (!data) return;

      if (data.error) throw new Error(data.error?.message);

      //  if has data, update manageOptions in data.js (will always only loop once)
      let manageOptions = {};
      for (const key in data) {
        const id = key;
        const { presetUnits, presetLocations, presetClients } = data[key];

        manageOptions = {
          id,
          presetUnits,
          presetLocations,
          presetClients,
        };
      }

      ctx.setManageOptions(manageOptions);
    } catch (error) {
      alert(error.message);
    }

    // cancel loading
    ctx.setLoading(false);
  };

  // call get items and manageOptions at page load
  useEffect(() => {
    getManageOptions();

    getItems();
  }, []);

  return <></>;
};

export default useHttp;
