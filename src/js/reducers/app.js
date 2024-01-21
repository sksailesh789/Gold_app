
import { APP_IS_OFFLINE,APP_IS_ONLINE } from "../actions/types";


const {onLine} = navigator;

export default function (state = onLine, action) {
  switch (action.type) {
    case APP_IS_ONLINE:
      return action.isOnline
    case APP_IS_OFFLINE:
      return action.isOnline
    default:
      return state;
  }
}
