import React, { Component, Fragment, useState ,useEffect} from "react";
import classnames from "classnames";
import BeatLoader from "react-spinners/BeatLoader";
import { GET_ERRORS,REMOVE_MODAL } from "../../actions/types";
import { removeModalHandler } from "../../actions/modalAction";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate} from 'react-router-dom';
import { API } from "../../config";
import Sidebar from "../Dashboard/Sidebar"
import Modal from "../../components/Modal"
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import {addProductHandler} from "../../actions/productAction"
import { useDispatch,useSelector } from "react-redux"
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import store from "../../store/index"
import {useParams} from "react-router"
import Spinner from "../../components/Spinner"


const AddProduct = (props) => {
    const [id , setId] = useState('')
    const [name , setName] = useState('')
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

  const { productId } = useParams();

  useEffect(() => {
    setSlider(sliderState.isSlider)
    
  }, [sliderState])
 
useEffect(() => {
  
  if (!isAuth.isAuthenticated) {
    navigate('/login')
        }

}, [isAuth])

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
    if(productId) {
      setLoading(true)
    axios
        .get(`${API}/product/${productId}`)
        .then((res) => {
          console.log(res.data,'rdd')
          setName(res.data.name)
          setId(res.data._id)
          setLoading(false)
        })
        .catch((err) =>{ 
          console.log(err)
          setLoading(false)

        });

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
  
  
  

  const onSubmit = (e) => {
    store.dispatch({
      type: GET_ERRORS,
      payload: '',
    })
    e.preventDefault();
    let fd;
    fd= {
      name:name,
      _id:id
    }
    
   dispatch(addProductHandler(fd))
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
               <h5>Product added successfully</h5> 
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
             className={classnames( slider ? 'w-82' : 'w-100')}
             >
            <div className='dashboard_right'>
                <div className="contact-wrap">
                  <h3 className="large ">
                    {productId ? "Edit Product" : "Add Product"}
                  </h3>
                  
                        <form className="form" onSubmit={onSubmit}>
                        <div className="row">
                          <div className="form-group ">
                            <div className="form-group-wrap">
                              <label for="name">Name :</label>
                                <input
                                  type="text"
                                  placeholder="name"
                                  id="name"
                                  className={classnames({ "is-invalid": errors.name })}
                                  name="name"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                />
                                {errors.name && (
                                  <div className="invalid-feedback">{errors.name}</div>
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






export default ErrorHandler(AddProduct,axios);
