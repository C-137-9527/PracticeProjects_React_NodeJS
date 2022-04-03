import './App.css';

import { useState, useEffect } from 'react';

import Hero from './components/Hero/Hero';
import SearchBars from './components/Tools/SearchBars';
import CartonsList from './components/CartonsList/CartonsList';
import CartonForm from './components/CartonForm/CartonForm';

function App() {
  // all carton
  let [cartonsArr, setCartonsArr] = useState([]);

  // trigger page re-render
  const [dataUpdated, setDataUpdated] = useState(false);

  // search filters
  const [idFilter, setIdFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');

  // filter cartonsArr if has filters, non case sensitive
  if (idFilter) {
    cartonsArr = cartonsArr.filter((carton) =>
      carton.id.toUpperCase().includes(idFilter.toUpperCase())
    );
  }
  if (sectionFilter) {
    cartonsArr = cartonsArr.filter((carton) =>
      carton.section.toUpperCase().includes(sectionFilter.toUpperCase())
    );
  }

  // store and update currently editing carton details
  const [editCurrentcarton, setEditCurrentcarton] = useState('');

  // toggle add/edit carton window on off
  const [showAddCartonWindow, setShowAddCartonWindow] = useState(false);

  // loading
  const [loading, setLoading] = useState(false);

  // get data from firebase
  const getCartonsArr = async () => {
    try {
      // loading data from server
      setLoading(true);

      const res = await fetch(
        'https://warehouse-test-f209f-default-rtdb.firebaseio.com/cartonsArr.json'
      );
      const data = await res.json();

      // if has no data
      if (!data) {
        setCartonsArr([]);
        setLoading(false);

        return;
      }

      let updatedCartonsArr = [];

      for (const key in data) {
        const _ID = key;
        const { id, quantity, section, remark } = data[key];

        updatedCartonsArr = [
          ...updatedCartonsArr,
          { _ID, id, quantity, section, remark },
        ];
      }
      setCartonsArr(updatedCartonsArr);

      // cancel loading status
      setLoading(false);
    } catch (err) {
      // loading data from server
      setLoading(false);

      alert(err.message);
    }
  };

  // get cartons arr from db on page load and whenever data is updated
  useEffect(() => {
    getCartonsArr();
  }, [dataUpdated]);

  return (
    <div className='app'>
      {/* summaries */}
      <Hero cartonsArr={cartonsArr} />

      {/* search bars */}
      <SearchBars
        onSetIdFilter={setIdFilter}
        onSetSectionFilter={setSectionFilter}
        onSetShowAddCartonWindow={setShowAddCartonWindow}
      />

      {/* loading status */}
      {loading && <h4 className='loading'>loading data, please wait...</h4>}

      {/* cartons list */}
      {!loading && (
        <CartonsList
          cartonsArr={cartonsArr}
          onSetCartonsArr={setCartonsArr}
          onSetEditcarton={setEditCurrentcarton}
          onSetDataUpdated={setDataUpdated}
        />
      )}

      {/* create new carton */}
      {showAddCartonWindow && (
        <CartonForm
          editCurrentCarton=''
          onSetShowAddCartonWindow={setShowAddCartonWindow}
          onSetDataUpdated={setDataUpdated}
        />
      )}

      {/* edit current carton */}
      {editCurrentcarton && (
        <CartonForm
          editCurrentCarton={editCurrentcarton}
          onSetEditCurrentcarton={setEditCurrentcarton}
          onSetDataUpdated={setDataUpdated}
        />
      )}
    </div>
  );
}

export default App;
