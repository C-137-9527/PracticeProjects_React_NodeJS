import classes from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../store/store';

const Counter = () => {
  const dispatch = useDispatch();

  const counter = useSelector((state) => state.counter.counter);

  const showCounter = useSelector((state) => state.showCounter);

  const addHandler = () => {
    dispatch(counterActions.add(5));
  };

  const minusHandler = () => {
    dispatch({ type: 'MINUS', amount: 5 });
  };

  const toggleCounterHandler = () => {
    dispatch({ type: 'TOGGLE' });
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{showCounter && counter}</div>
      <div>
        <button onClick={addHandler}>add</button>
        <button onClick={minusHandler}>minus</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
