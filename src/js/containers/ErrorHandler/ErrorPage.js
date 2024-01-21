import React,{useEffect} from 'react'
import { useNavigate} from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux"


const ErrorPage = () => {

  const isAuth = useSelector(state => state.auth)

  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate('/')
  }

  // useEffect(() => {
  
  //   if (!isAuth.isAuthenticated) {
  //     navigate('/login')
  //         }
  
  // }, [isAuth])
  return (
    <>
      <div className='serverdown'>Server is down.Please wait and reload after few minutes.</div>
      <button className='serverbutton' onClick={() => goBackHandler()}>Go back</button>
    </>
  )
}

export default ErrorPage