import { createStore } from "redux";
import { routerReducer } from "react-router-redux";
const initialState = {
  test: []
};
const store = createStore(routerReducer, initialState);
export default store;
