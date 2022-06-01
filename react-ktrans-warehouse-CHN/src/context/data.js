import React, { useState, useEffect, createContext } from 'react';

// export data
export const data = createContext({});

// provider
const DataProvider = ({ children }) => {
  // items
  const [items, setItems] = useState([]);

  // manageOptions
  const [manageOptions, setManageOptions] = useState({});

  // update loading state
  const [loading, setLoading] = useState(false);

  // search filters
  const [searchFilters, setSearchFilters] = useState({});

  // avaliable options for units/locations/clients
  const [availableOptions, setAvailableOptions] = useState({});

  // generate new avaliable options whenever manageOptions changes
  useEffect(() => {
    // get preset vlues
    const presetUnits = manageOptions.presetUnits?.split('\n');
    const presetLocations = manageOptions.presetLocations?.split('\n');
    const presetClients = manageOptions.presetClients?.split('\n');

    // loop and render option tags
    const unitOptions = presetUnits?.map((unit) => {
      if (unit)
        return (
          <option key={Math.random()} value={unit}>
            {unit}
          </option>
        );
    });

    const locationOptions = presetLocations?.map((location) => {
      if (location)
        return (
          <option key={Math.random()} value={location}>
            {location}
          </option>
        );
    });

    const clientOptions = presetClients?.map((client) => {
      if (client)
        return (
          <option key={Math.random()} value={client}>
            {client}
          </option>
        );
    });

    setAvailableOptions({ unitOptions, locationOptions, clientOptions });
  }, [manageOptions]);

  // loading data message
  const loadingMessage = (
    <h2 style={{ textAlign: 'center', color: 'coral' }}>
      updating data...please wait
    </h2>
  );

  // update login status
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(
    localStorage.getItem('ktransIdToken')
  );

  // app wide data
  const value = {
    items,
    setItems,
    manageOptions,
    setManageOptions,
    loading,
    setLoading,
    searchFilters,
    setSearchFilters,
    availableOptions,
    loadingMessage,
    userIsLoggedIn,
    setUserIsLoggedIn,
  };

  return <data.Provider value={value}>{children}</data.Provider>;
};

export default DataProvider;
