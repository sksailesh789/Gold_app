import React, { Component,Fragment,useState,useEffect } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/auth";
import classnames from "classnames";
import { useDispatch,useSelector } from 'react-redux';
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import axios from "axios"
import { useNavigate} from 'react-router-dom';
import Spinner from "../../components/Spinner"
import { GET_ERRORS } from "../../actions/types";


const Login = () =>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [errors,setErrors] = useState('')
    const [rememberMe, setRememberMe] = useState(false);
    const [loading , setLoading] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
  const isAuth = useSelector(state => state.auth)
  const error = useSelector(state => state.errors)
  const spinnerState = useSelector(state => state.spinner)


useEffect(() => {
  setErrors(error)
  console.log(error,'error')
}, [error])

useEffect(() => {
  setLoading(spinnerState.isSpinner)
  
}, [spinnerState])

useEffect(() => {
  
  if (isAuth.isAuthenticated) {
    navigate('/')
        }

}, [isAuth])

useEffect(() => {
  dispatch({
    type: GET_ERRORS,
    payload: '',
  })

  const storedEmail = localStorage.getItem("email");
  // const storedPassword = localStorage.getItem("password");
  if (storedEmail ) {
    setEmail(storedEmail);
    // setPassword(storedPassword);
    setRememberMe(true);
  }
}, []);


  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
        email ,
      password
    };

    if (rememberMe) {
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("email");
    }

    dispatch(loginUser(userData));
    
  }

  const registerHandler = () => {
    navigate('/register')
    
  }
  
    // const { errors } = this.state;

    return (
      <Fragment>
        {/* <Header /> */}
        {loading ? <Spinner /> : ''}
      <section className="container  ">
        <div className = "loginmargin contact-wrap">
        <h3 >UKLAXMI JEWELLERY</h3>
        <p className="lead">
          <i className="fas fa-user"></i> Sign into Your Account
        </p>
        <form noValidate className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Email"
              className={classnames({ "is-invalid": errors.email })}
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className={classnames({ "is-invalid": errors.password })}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}

              
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>
            
          <input type="submit" className="btn " value="Login" />
        </form>
        <p className="my-1" onClick={registerHandler}>
          Don't have an account? Sign Up
        </p> 
        </div>
      </section>
      {/* <Footer/> */}
      </Fragment>
    );
  }





export default ErrorHandler(Login,axios) ;
