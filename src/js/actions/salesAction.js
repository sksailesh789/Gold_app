import axios from "axios";
import { GET_ERRORS,SET_MODAL,SET_SPINNER,REMOVE_SPINNER } from "./types";
import { API } from "../config";

export const addSalesHandler = (sales) => (dispatch) => {
  dispatch({
    type: SET_SPINNER,
  })
   axios
      .post(`${API}/sales`, sales)
      .then((res) =>
     { console.log(res,'---------------------------------------')
      if(res.status && res.status == 200 || res.status == 201) {

        dispatch({
          type: REMOVE_SPINNER,
        })
        dispatch({
          type: SET_MODAL,
        })
        electron.printApi.sendPrint(sales)

      }else {
          console.log(err,'-----------------------')
          dispatch({
            type: REMOVE_SPINNER,
          })
        }
      }
      )
      .catch((err) => {
        console.log(err,'-----------------------')
        dispatch({
          type: REMOVE_SPINNER,
        })
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
       
      });
};


export const showSalesHandler = (id) => (dispatch) => {
  dispatch({
    type: SET_SPINNER,
  })
   axios
      .get(`${API}/sales/${id}`)
      .then((res) =>
     { console.log(res,'---------------------------------------')
      if(res.status && res.status == 200 || res.status == 201) {

        dispatch({
          type: REMOVE_SPINNER,
        })
        dispatch({
          type: SET_MODAL,
        })

      }else {
          console.log(err,'-----------------------')
          dispatch({
            type: REMOVE_SPINNER,
          })
        }
      }
      )
      .catch((err) => {
        console.log(err,'-----------------------')
        dispatch({
          type: REMOVE_SPINNER,
        })
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
       
      });
};

