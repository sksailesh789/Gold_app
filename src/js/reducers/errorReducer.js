import { GET_ERRORS,RESET_ERRORS } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
        console.log(action.payload,'apppp')
      return action.payload;
    default:
      return state;
  }
}
