// import { createStore } from 'redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = { counter: 0, showCounter: true };

// reducer with toolkit
const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    add: (state, action) => {
      state.counter = state.counter + action.payload;
    },
    minus: (state, action) => {
      state.counter = state.counter - action.payload;
    },
    toggle: (state) => {
      state = !state;
    },
  },
});

// reducer func
// const counterReducer = (state = initialState, action) => {
//   if (action.type === 'ADD')
//     return {
//       counter: state.counter + action.amount,
//       showCounter: state.showCounter,
//     };

//   if (action.type === 'MINUS')
//     return {
//       counter: state.counter - action.amount,
//       showCounter: state.showCounter,
//     };

//   if (action.type === 'TOGGLE') {
//     return {
//       counter: state.counter,
//       showCounter: !state.showCounter,
//     };
//   }

//   return state;
// };

// create store
// const store = createStore(counterReducer);

const authSlice = {
  isAuth: 'authentication',
  initialState: { isAuthenticated: false },
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    lougout(state) {
      state.isAuthenticated = false;
    },
  },
};

const store = configureStore({
  reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
});

// subscriber
const subscriber = () => {
  console.log(store.getState());
};

// bind subscriber
store.subscribe(subscriber);

export const counterActions = counterSlice.actions;

export const authActions = authSlice.actions;

export default store;
