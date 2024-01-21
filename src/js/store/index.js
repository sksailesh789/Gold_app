import {createStore,applyMiddleware,compose} from "redux"
import thunkMiddleware from 'redux-thunk'
import rootReducers from "../reducers/index"
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
import appMiddleware from "./middlewares/app"

const middlewares = [
    thunkMiddleware,
    appMiddleware
]       
const store = createStore(
    rootReducers,
    composeEnhancers(applyMiddleware(...middlewares))
)
export default store