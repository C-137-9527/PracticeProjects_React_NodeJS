import { createStore } from "redux";
import { createSlice } from "@reduxjs/toolkit";

createSlice({ name: "counter" });

const counterReducer = (state = { counter: 0 }, action) => {
  const type = action.type;

  if (type === "INCREMENT") {
    return { counter: state.counter + action.amount };
  }
  if (type === "DECREMENT") {
    return { counter: state.counter - 1 };
  }
  return state;
};

const store = createStore(counterReducer);

export default store;
