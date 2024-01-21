
import React,{useEffect} from 'react';
import {Provider ,useDispatch,useSelector} from 'react-redux'
import Login from './containers/Authentication/Login';
import Convertor from './containers/Convertor/Convertor';
import Register from './containers/Authentication/Register';
import AddProduct from './containers/Product/AddProduct';
import AdminProductList from './containers/Product/AdminProductLists';
import FiscalYear from "./containers/FiscalYear/AddFiscalYear"
import FiscalYearList from './containers/FiscalYear/FiscalYearList';
import AddUSerReffered from "./containers/UserReffered/addUserReffered"
import UserRefferedList from "./containers/UserReffered/UserRefferedList"

import UserList from "./containers/User/UserList"
import ErrorPage from './containers/ErrorHandler/ErrorPage';


import Dashboard from "./containers/Dashboard/Dashboard"
import AddSales from "./containers/Sales/addSales"
import SalesList from "./containers/Sales/salesList"

// import OrderList from "./containers/Order/OrderList"

// import Home from "./components/Home"
import store from "./store/index"

import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser } from "./actions/auth";
import { listenToConnectionChanges } from './actions/app';
import Navbar from './components/Navbar';

import {
  HashRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info and exp
  const decode = jwt_decode(localStorage.jwtToken);
  decode.isAdmin = localStorage.isAdmin;
  store.dispatch(setCurrentUser(decode));
  
}

 function GoldApp() {

  const dispatch = useDispatch();
  const isOnline = useSelector((state) => state.app)
  const isAuth = useSelector(state => state.auth)

  
  useEffect(() => {
    console.log('dddddddispatch')
    const unSubFromConnection = dispatch(listenToConnectionChanges())

    return () => {
      unSubFromConnection()
    }
  }, [dispatch])

  // if(!isOnline) {
  //   console.log(isOnline,'io')
  //   return <p>offline</p>
  // }
  
  return (
    
        <Router>
          {isAuth.isAuthenticated ? <Navbar /> : null}
        
        <div className='content-wrapper'>
            <Routes>
            <Route path="/login" element={<Login/>}  />
            <Route path="/" exact element={<Dashboard/>}  />
            <Route path="/register" element={<Register/>}  />
            <Route path='/addSales' element={<AddSales />} />
            <Route path='/salesList' element={<SalesList />} />
            <Route path="/addProduct" element={<AddProduct/>}  />
            <Route path="/adminProductList" element={<AdminProductList/>}  />
            <Route  path="/product/edit/:productId" element={<AddProduct/>} />
            <Route path="/addFiscalYear" element={<FiscalYear/>}  />
            <Route  path="/fiscalyear/edit/:fiscalyearId" element={<FiscalYear/>} />
            <Route  path="/fiscalYearList" element={<FiscalYearList/>} />
            <Route path="/UserList" element={<UserList/>}  />
            <Route  path="/addRefferedUser" element={<AddUSerReffered/>} />
            <Route  path="/userRefferedList/edit/:userRefferedId" element={<AddUSerReffered/>} />
            <Route  path="/RefferedUserList" element={<UserRefferedList/>} />
            <Route path="/convert" element={<Convertor/>}  />
            
            <Route path="/error" element={<ErrorPage/>}  />
            </Routes>
        </div>
        </Router>

  )
}


export default function App() {
  return(
    <Provider store={store}>
        <GoldApp />
    </Provider>
  )
}



























// import React from 'react';

// export default function App() {
//     const title= "Hello world";
//     const enhancedTitle = title + '- React App!';

//     const sendNotification = () => {
//         electron.notificationApi.sendNotification('My custom message')
//     }

//     return (
//         <>
//         <h1>{enhancedTitle}</h1>
//         <button onClick={sendNotification}>sendNotification</button>
//         </>
//     )
// }