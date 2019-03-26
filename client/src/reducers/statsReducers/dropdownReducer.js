import { SELECTED_DROPDOWN_OPTION } from "../../actions/statsActions/dropdownAction";

const initialState = {
  selected: { value: "7", label: "Siste 7 dager" }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SELECTED_DROPDOWN_OPTION:
      return {
        ...state,
        selected: action.payload.data
      };

    default:
      return state;
  }
}
