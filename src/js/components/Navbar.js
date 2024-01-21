import React,{useState,useEffect} from 'react';
import { Link,useNavigate,useMatch,useLocation} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { removeSliderHandler,setSliderHandler } from "../actions/sliderAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser ,faCaretDown} from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import {logoutUser} from "../actions/auth.js"
// import { remote } from 'electron';

const  Navbar = (props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation()
  console.log(pathname,'pathname')

  const [profileShow,setProfileShow] = useState(false)
  const [isOn, setIsOn] = useState(navigator.onLine);

  const dispatch = useDispatch();

  const isAuth = useSelector(state => state.auth)
  const isSlider = useSelector(state => state.slider)
  const isOnline = useSelector(state => state.app)


  useEffect(() => {
    electron.registerShortcut;
    console.log(navigator.onLine,'prooprint')
  
    return () => {
      electron.unregisterShortcut;
    }
  }, [])
  // const intervalId = setInterval(() => {
  //   console.log(navigator,'oo99onlineoffline')
  //     setIsOn(navigator.onLine);
  // }, 5000); // Update every 5 seconds
  
  useEffect(() => {
    function handleOnlineStatus() {
      console.log('oo99onlineoffline')
      setIsOn(navigator.onLine);
    }
    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

      // Check if the user is offline when the component first renders
      if (!navigator.onLine) {
        setIsOn(false);
      }
    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  const showProfileHandler = () => {
    console.log('sph',profileShow)
    setProfileShow(!profileShow)
  }
  const logoutHandler = () => {
    dispatch(logoutUser())
  }
  const sliderChangedHandler= () => {
    if(isSlider.isSlider !== true) {
      console.log(isSlider.isSlider,'iss')
      dispatch(setSliderHandler())
    }else {
      console.log(isSlider.isSlider,'issn')
      dispatch(removeSliderHandler())
    }
  }
//   const passwordChangeHandler = () => {
//     navigate('/forgetpassword')
//   }

  return (
    <div className="chat-navbar">
      <nav className="chat-navbar-inner">
        <div className="slider" onClick={sliderChangedHandler}>
          <div className="slider-element"></div>
          <div className="slider-element"></div>
          <div className="slider-element"></div>
        </div>
        <div className='profile'>
          <div 
            className={classnames(   isOn ? "online_info": "offline_info")}
          ></div>
          <div className="profile-wrap" onClick={showProfileHandler}>
            <FontAwesomeIcon  icon={faUser}
                  style={{ fontSize: '15px',color: 'green' ,marginRight: '5px' }}
                  />
            {isAuth.user ? isAuth.user.name : ''}
            <FontAwesomeIcon
                  icon={faCaretDown}
                  style={{ fontSize: '15px',color: 'green',marginLeft: '5px' }}
                  />
            </div>
            {profileShow ? (
                <div className="profile_list">
                  <ul>
                    {/* <li onClick={passwordChangeHandler}>change password</li> */}
                    <li onClick={logoutHandler}>logout</li>
                  </ul>
              </div>
            ):''}
          
        </div>
      </nav>
    </div>
  )
}
export default Navbar