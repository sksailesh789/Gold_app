import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import modalReducer from "./modalReducer";
import spinnerReducer from "./spinnerReducer";
import sliderReducer from "./sliderReducer.js"
import appReducer from "./app";





export default combineReducers({
    errors: errorReducer,
    auth:authReducer,
    modal:modalReducer,
    spinner:spinnerReducer,
    app:appReducer,
    slider:sliderReducer
});
