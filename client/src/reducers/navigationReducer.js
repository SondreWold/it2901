import { SET_NAME } from "./../actions/navigationAction";

//The name of the kindergarten
const initialState = {
  name: "Brøset Barnehage"
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_NAME: {
      return {
        ...state,
        name: action.payload
      };
    }
    default:
      return state;
  }
}
