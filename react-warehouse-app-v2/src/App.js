// TODO: login page at home route '/'

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

// styles
import './App.css';

function App() {
  // get items and manageOptions data from db
  useHttp();

  return (
    <>
      {/* navbar */}
      <Navbar />

      {/* hero */}
      <Hero />

      {/* routes */}
      <Routes>
        {/* storage detiails page */}
        <Route path='/' element={<StorageDetails />}>
          {/* nested route: add new item form */}
          <Route path='/addNewItem' element={<AddNewItemForm />} />
        </Route>

        {/* manage options page */}
        <Route path='/manageOptions' element={<ManageOptions />} />
      </Routes>
    </>
  );
}

export default App;
