import { useContext } from 'react';

// router
import { Routes, Route } from 'react-router-dom';

// components;
import {
  Navbar,
  ManageOptions,
  StorageDetails,
  AddNewItemForm,
  Hero,
} from './components/index';

// custom hook
import useHttp from './http/useHttp';

import { data } from './context/data';

// styles
import './App.css';

function App() {
  // get data from db
  useHttp();

  // access data in data.js
  const ctx = useContext(data);

  return (
    <>
      {/* navbar */}
      <Navbar />

      {/* hero */}
      {ctx.userIsLoggedIn && <Hero />}

      {/* routes */}
      {ctx.userIsLoggedIn && !ctx.loading && (
        <Routes>
          {/* storage detiails page */}
          <Route path='/' element={<StorageDetails />}>
            {/* nested route: add new item form */}
            <Route path='/addNewItem' element={<AddNewItemForm />} />
          </Route>

          {/* manage options page */}
          <Route path='/manageOptions' element={<ManageOptions />} />
        </Routes>
      )}

      {/* loading data message */}
      {ctx.userIsLoggedIn && ctx.loading && ctx.loadingMessage}
    </>
  );
}

export default App;
