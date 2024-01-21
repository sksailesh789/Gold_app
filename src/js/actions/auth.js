import axios from "axios";
import { GET_ERRORS,REMOVE_CURRENT_USER,SET_CURRENT_USER,SET_SPINNER,REMOVE_SPINNER } from "./types";
import { API } from "../config";
import setAuthToken from "../utils/setAuthToken"
import {useDispatch} from "react-redux"
import jwt_decode from "jwt-decode"

export const registerUser = (userData) => (dispatch) => {
  axios
    .post(`${API}/users/register`, userData)
    .then((res) => console.log(res,'response'))
    .catch((err) =>
    {   console.log(err,'error99')
    console.log(dispatch,'dispatch')
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })}
    );
};
export const loginUser = (userData) => (dispatch) => {
  dispatch({
    type: SET_SPINNER,
  })
    axios
      .post(`${API}/users/login`, userData)
      .then((res) => {
        console.log(res,'oooooo')
        dispatch({
          type: REMOVE_SPINNER,
        })
        if (res && res.data && res.data.success == true) {
          const { token,isAdmin } = res.data;
          // set token to ls
          localStorage.setItem("jwtToken", token);
          localStorage.setItem("isAdmin", isAdmin);
  
          // set token to Auth Header
          setAuthToken(token);
          // Decode Token to get user data
          const decoded = jwt_decode(token);
          decoded.isAdmin = isAdmin;
          console.log(decoded,'dc')
          // set current User
          return dispatch(setCurrentUser(decoded));
      }
     
      })
      .catch((err) =>
     {
      dispatch({
        type: REMOVE_SPINNER,
      })
      
      }
      );
  };
  
  // Set logged in user
  export const setCurrentUser = (decoded) => {
    console.log(decoded,'dc5')
    return {
      type: SET_CURRENT_USER,
      payload: decoded,
    };
  };


  export const removeCurrentUser = (decoded) => {
    return {
      type: REMOVE_CURRENT_USER,
      payload: decoded,
    };
  };

    // Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("isAdmin");

  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(removeCurrentUser({}));
};