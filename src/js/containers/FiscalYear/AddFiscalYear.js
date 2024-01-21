import React, { Component, Fragment, useState ,useEffect} from "react";
import classnames from "classnames";
import BeatLoader from "react-spinners/BeatLoader";
import { GET_ERRORS,REMOVE_MODAL } from "../../actions/types";
import { removeModalHandler } from "../../actions/modalAction";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API } from "../../config";
import Sidebar from "../Dashboard/Sidebar"
import Modal from "../../components/Modal"
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import {addFiscalYearHandler} from "../../actions/fiscalYearAction"
import { useDispatch,useSelector } from "react-redux"
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import store from "../../store/index"
import {useParams} from "react-router"
import Spinner from "../../components/Spinner"
import { useNavigate} from 'react-router-dom';


const AddFiscalYear = (props) => {
    const [id , setId] = useState('')
    const [date , setDate] = useState('')
    const [errors , setErrors] = useState('')
    const [loading , setLoading] = useState(false)
    const [showModal , setShowModal] = useState(false)
    const [slider,setSlider] = useState(true)

  const dispatch = useDispatch();
  const error = useSelector(state => state.errors)
  const modalState = useSelector(state => state.modal)
  const spinnerState = useSelector(state => state.spinner)
  const sliderState = useSelector(state => state.slider)
  const isAuth = useSelector(state => state.auth)
  const navigate = useNavigate();

  const { fiscalyearId } = useParams();

  
 

  useEffect(() => {
    setErrors(error)
    
  }, [error])
  useEffect(() => {
    setShowModal(modalState.isModal)
    
  }, [modalState])
  useEffect(() => {
    setLoading(spinnerState.isSpinner)
    
  }, [spinnerState])

  useEffect(() => {
    setSlider(sliderState.isSlider)
    
  }, [sliderState])
  
  useEffect(() => {
    if(fiscalyearId) {

    axios
        .get(`${API}/fiscalYear/${fiscalyearId}`)
        .then((res) => {
          console.log(res,'letssee')
          setDate(res.data.date)
          setId(res.data._id)
        })
        .catch((err) => console.log(err,'letsse'));

      }
      dispatch({
        type: GET_ERRORS,
        payload: '',
      })
      return () => {
        dispatch({
          type: GET_ERRORS,
          payload: '',
        })
      }
  }, [])
  
  useEffect(() => {
  
    if (!isAuth.isAuthenticated) {
      navigate('/login')
          }
  
  }, [isAuth])

  

  const onSubmit = (e) => {
    store.dispatch({
      type: GET_ERRORS,
      payload: '',
    })
    e.preventDefault();
    let fd;
    fd= {
      date:date,
      _id:id
    }
    

   dispatch(addFiscalYearHandler(fd))
  }
 
    const closeModalHandler = () => {
        dispatch(removeModalHandler())
        // setShowModal(false)
        setName('')
    }

    return (
      <Fragment>
          {showModal ? 
            <Modal 
              show={showModal} 
              handleClose={() => {
                closeModalHandler()
              }} 
            > 
               <h5>Fiscal year added successfully</h5> 
               <FontAwesomeIcon
                icon={faCheckCircle}
                style={{ fontSize: '40px',display: 'block',color: 'green' ,textAlign: 'center', margin: 'auto auto 22px' }}
                />
              <button className="btn-edit" 
                  onClick = {() => {
                    closeModalHandler()
              }}> Close</button>
            </Modal> 
            : "" 
          } 
          {loading ? <Spinner /> : ''}

        <div className="dashboard_wrapper">
          <div className="container-fluid">
          <div className="row">
            {/* <div className="w-17"> */}
                <Sidebar />
            {/* </div> */}
            <div 
             className={classnames( slider ? 'w-82' : 'w-100')}>
            <div className='dashboard_right'>
                <div className="contact-wrap">
                  <h3 className="large ">
                    {fiscalyearId ? "Edit Fiscal Year" : "Add Fiscal Year"}
                  </h3>
                  
                        <form className="form" onSubmit={onSubmit}>
                        <div className="row">
                          <div className="form-group ">
                            <div className="form-group-wrap">
                              <label for="date">Date :</label>
                                <input
                                  type="text"
                                  placeholder="date"
                                  id="date"
                                  className={classnames({ "is-invalid": errors.date })}
                                  name="date"
                                  value={date}
                                  onChange={(e) => setDate(e.target.value)}
                                />
                                {errors.date && (
                                  <div className="invalid-feedback">{errors.date}</div>
                                )}
                            </div>
                          </div>
                          
                         
                        </div>
                        <div className="submit-btn ">
                            <input type="submit" className="btn " value="Submit" />
                          </div>
                      </form>
                  
                  
                </div>
    
          </div>
            </div>
          </div>
          
        </div>
        
        </div>
      </Fragment>
    );
  }






export default ErrorHandler(AddFiscalYear,axios);
