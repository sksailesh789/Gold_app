import React, { Fragment,useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate} from 'react-router-dom';
import classnames from "classnames";
import Sidebar from "../Dashboard/Sidebar"



const Convertor = () => {

  const [lal , setLal] = useState('')
  const [gram , setGram] = useState('')
  const [errors , setErrors] = useState('')
  const [slider,setSlider] = useState(true)

  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth)
  const sliderState = useSelector(state => state.slider)

  const navigate = useNavigate();


  const onSubmit = (e) => {
    setErrors('')
    let gm , laal;

    e.preventDefault();
    if(lal == ''   & gram == '' ) {
        setErrors('both are empty')
        // console.log('both are empty')
    } else if (lal !== ''  & gram !== '' ) {
        setErrors('please select only one')
        // console.log('please select only one')
    }else if(lal == "" ){
        laal = (100/11.664 )* gram;
        setLal(laal)
    }else if(gram == "" ) {
        gm = (11.664 / 100)* lal ; 
        setGram(gm)
    }
    
  }
 
//   useEffect(() => {
//     setErrors(error)
//     return() => {
//       setErrors('')
//     }
//   }, [error])
  
  useEffect(() => {
    setSlider(sliderState.isSlider)
    
  }, [sliderState])

  
useEffect(() => {
  
  if (!isAuth.isAuthenticated) {
    navigate('/login')
        }

}, [isAuth])
   

    return (
      <Fragment>
        <div className="dashboard_wrapper ">
          <div className="container-fluid">
          <div className="row">
            {/* <div className="w-17"> */}
                <Sidebar />
            {/* </div> */}
            <div 
             className={classnames( slider ? 'w-82' : 'w-100')}>
            <div className='dashboard_right'>
      <section className="container converter">
        <div className= "loginmargin contact-wrap">
        <h4 >Convert Gram & lal</h4>
        {errors ? <p>{errors }</p> : ''}
        <form noValidate className="form" onSubmit={onSubmit}>
          <div className="form-group">
          <label for="lal">lal :</label>
            <input
              type="number"
              placeholder="lal"
              name="lal"
              id="lal"
              value={lal}
              onChange={(e) => setLal(e.target.value)}
            />
            {/* {errors && (
              <div className="invalid-feedback">{errors}</div>
            )} */}
          </div>
          <div className="form-group">
          <label for="gram">Gram :</label>
            <input
              type="number"
              className={classnames({ "is-invalid": errors.gram })}
              placeholder="gram"
              name="gram"
              id="gram"
              value={gram}
              onChange={(e) => setGram(e.target.value)}
            />
            
           
          </div>
         
          <input type="submit" className="btn " value="convert" />
        </form>
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



export default Convertor;

