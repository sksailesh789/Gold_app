import React, { Fragment,useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate} from 'react-router-dom';
import { registerUser } from "../../actions/auth";
import classnames from "classnames";
import Sidebar from "../Dashboard/Sidebar"



const Register = () => {

  const [name , setName] = useState('')
  const [mobileNo , setMobileNo] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [password2 , setPassword2] = useState('')
  const [errors , setErrors] = useState('')
  const [slider,setSlider] = useState(true)

  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth)
  const error = useSelector(state => state.errors)
  const sliderState = useSelector(state => state.slider)

  const navigate = useNavigate();


  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: name,
      mobileNo: mobileNo,
      password: password,
      password2: password2,
      email : email
    };

    dispatch(registerUser(newUser));
  }
 
  useEffect(() => {
    setErrors(error)
    return() => {
      setErrors('')
    }
  }, [error])
  
  useEffect(() => {
    setSlider(sliderState.isSlider)
    
  }, [sliderState])

  const pushLoginHandler = () => {
    navigate('/login')
  }
  
// useEffect(() => {
  
//   if (!isAuth.isAuthenticated) {
//     navigate('/login')
//         }

// }, [isAuth])
   

    return (
      <Fragment>
        <div className="dashboard_wrapper">
          <div className="container-fluid">
          <div className="row">
            {/* <div className="w-17"> */}
                <Sidebar />
            {/* </div> */}
            <div 
             className={classnames( slider ? 'w-82' : 'w-100')}>
            <div className='dashboard_right'>
      <section className="container ">
        <div className= "loginmargin contact-wrap">
        <h4 >Register</h4>
        <p >
          Create Your Account
        </p>
        <form noValidate className="form" onSubmit={onSubmit}>
          <div className="form-group">
          <label for="name">Name :</label>
            <input
              type="text"
              className={classnames({ "is-invalid": errors.name })}
              placeholder="Name"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="number"
              className={classnames({ "is-invalid": errors.mobileNo })}
              placeholder="Mobile No"
              name="mobileNo"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
            />
            {errors.mobileNo && (
              <div className="invalid-feedback">{errors.mobileNo}</div>
            )}
           
          </div>
          <div className="form-group">
            <input
              type="email"
              className={classnames({ "is-invalid": errors.email })}
              placeholder="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
           
          </div>
          <div className="form-group">
            <input
              type="password"
              className={classnames({ "is-invalid": errors.password })}
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              className={classnames({ "is-invalid": errors.password2 })}
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            {errors.password2 && (
              <div className="invalid-feedback">{errors.password2}</div>
            )}
          </div>
          <input type="submit" className="btn " value="Register" />
        </form>
        <div>
          <p onClick={pushLoginHandler}>go to Login Page</p>
        </div>
        </div>
        
      </section>
      </div>
      </div>
      </div>
      </div>
      </div>

      </Fragment>
    );
  }



export default Register;

