import React, { Component, Fragment,useState,useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {API} from "../../config";
import { Link,useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit,faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../Dashboard/Sidebar";
import Modal from "../../components/Modal"
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import { useDispatch,useSelector } from "react-redux"
import { GET_ERRORS } from "../../actions/types";
import classnames from "classnames";


const FiscalYearList = () => {
    const [fiscalYearList , setFiscalYearList] = useState([])
    const [selectedYearId , setSelectedYearId] = useState('')
    const [selectedYear , setSelectedYear] = useState([])
    const [year , setYear] = useState("")
    const [errors , setErrors] = useState("")
    const [deleteID , setDeleteID] = useState("")
    const [showModal , setShowModal] = useState(false)
    const [isDeleted , setIsdeleted] = useState(false)
    const [isDefault , setIsDefault] = useState(false)
    const [wantdelete , setWantdelete] = useState(false)
    const [loading,setLoading] = useState(false)
    const [slider,setSlider] = useState(true)

    const error = useSelector(state => state.errors)
    const isAuth = useSelector(state => state.auth)
    
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const sliderState = useSelector(state => state.slider)

  useEffect(() => {
    setErrors(error)
    console.log(error,'eerree')
  }, [error])

  
useEffect(() => {
  
  if (!isAuth.isAuthenticated) {
    navigate('/login')
        }

}, [isAuth])

  // useEffect(() => {
  //   setLoading(true)
  //       axios
  //       .get(`${API}/fiscalYear`)
  //       .then((res) =>
  //           {console.log(res,'res')
  //           setLoading(false)
  //           setFiscalYearList( res.data)
  //           }
  //           )
  //       .catch((err) => {
  //         console.log(err,'iii')
  //         if(err.response.status == "500") {
  //          return navigate('/error')
  //         }
  //       });
  //       axios
  //       .get(`${API}/fiscalYear/active`)
  //       .then((res) =>
  //           {
  //             console.log(res,'899')
  //             setSelectedYearId(res.data._id)
  //             setSelectedYear([res.data._id])
  //           }
  //           )
  //       .catch((err) => {
  //         console.log(err,'iii')
  //         if(err.response.status == "500") {
  //          return navigate('/error')
  //         }
  //       });
  // }, [])

  async function fetchData() {
    try {
      setLoading(true);
  
      const fiscalYearResponse = await axios.get(`${API}/fiscalYear`);
      setFiscalYearList(fiscalYearResponse.data);
  
      const userReferredResponse = await axios.get(`${API}/fiscalYear/active`);
      setSelectedYearId(userReferredResponse.data._id);
      setSelectedYear([userReferredResponse.data._id])
  
    } catch (error) {
      if (error.response.status === 500) {
        return navigate('/error');
      }
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, []);
   
  useEffect(() => {
    setSlider(sliderState.isSlider)
    
  }, [sliderState])
  

const onDelete = (id) => {
  setWantdelete(false)
    axios
    .post(`${API}/fiscalYear/${id}`)
    .then((res) =>
      { 
        console.log(res,'erres')
        setIsdeleted(true)
        axios
        .get(`${API}/fiscalYear`)
        .then((res) =>
          
        setFiscalYearList(res.data) 
        )
        .catch((err) => console.log(err,'eerr'))}
        )
    .catch(
      (err) => console.log(err, "err97")
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data,
      // })
    ); }

    const onCheckedHandler = (id) => {
      if(selectedYear.includes(id)){
        return
      }
      setSelectedYear([id])
      setSelectedYearId(id)
    }

    const defaultHandler = () => {

      axios
    .post(`${API}/fiscalYear/update/${selectedYearId}`)
    .then((res) =>
      { 
        console.log(res,'res')
        setIsDefault(true)
        setShowModal(true)
        // axios
        // .get(`${API}/fiscalYear`)
        // .then((res) =>
          
        // // setFiscalYearList(res.data.data) 
        // )
        // .catch((err) => console.log(err,'eerr'))
      }
        )
    .catch(
      (err) => console.log(err, "err977")
    );
    }
   
    let fiscalyearlist = fiscalYearList.map((fiscalYear) => (
        <tr key= {fiscalYear._id}>
            <td>
              <input type="checkbox"  onClick={() => onCheckedHandler(fiscalYear._id)} checked={selectedYear.includes(fiscalYear._id)}/>
            </td>
            <td>
              <h6>{fiscalYear.date}</h6>
            </td>
            <td>
              <Link to={`/fiscalyear/edit/${fiscalYear._id}`}>
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{ color: "#54545c", marginRight: "10px" ,fontSize:'14px'}}
                />
              </Link>
            </td>
            <td>
              <FontAwesomeIcon
                icon={faTrash}
                style={{ color: "#54545c",fontSize:'14px' }}
                onClick={() => {
                      setDeleteID (fiscalYear._id)
                      setWantdelete(true)
                      setShowModal(true)
                  }
                }
              
              />
            </td>
          </tr>
    ));
    return (
      <Fragment>
      {showModal ? 
        <Modal 
          show={showModal} 
          handleClose={ () => {setShowModal(false)} } 
        > 
        {isDefault && (
          <Fragment>
          <h5>Default year made Sucessfully</h5> 
          <FontAwesomeIcon
            icon={faCheckCircle}
            style={{fontSize: '30px',display: 'block' ,color: 'red',textAlign: 'center',margin:' auto auto 22px'}}
        />
        <button className="btn-edit" onClick = {() =>{ 
          setShowModal(false)
          setIsDefault (false)}}
          > Close</button>
      </Fragment>
        )}
        {wantdelete && 
            ( 
              <Fragment>
                  <h5>Do you want to delete ?</h5> 
                  <FontAwesomeIcon icon={faTrash} style={{fontSize: '30px',display: 'block' ,color: 'red',textAlign: 'center',margin:' auto auto 22px'}}/> 
                  <div className="btn_wrap  " style={{display:"flex",justifyContent:'space-around'}}>
                    <button className="btn-delete" onClick = { () => onDelete(deleteID)}> Delete</button>
                    <button className="btn-edit" onClick = {() => {
                      setWantdelete(false)
                      setShowModal(false)
                      }}> Cancel</button>
                  </div>
              </Fragment>
        )}
        {isDeleted &&
          (
            <Fragment>
                <h5>Deleted Sucessfully</h5> 
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  style={{fontSize: '30px',display: 'block' ,color: 'red',textAlign: 'center',margin:' auto auto 22px'}}
              />
              <button className="btn-edit" onClick = {() =>{ 
                setShowModal(false)
                setIsdeleted (false)}}
                > Close</button>
            </Fragment>
        )
        }
        {errors.error && (
            <Fragment>
            <h5>{errors.error}</h5> 
            <FontAwesomeIcon
              icon={faCheckCircle}
              style={{fontSize: '30px',display: 'block' ,color: 'red',textAlign: 'center',margin:' auto auto 22px'}}
          />
          <button className="btn-edit" onClick = {() =>{ 
            setShowModal(false)
            setIsdeleted (false)
            dispatch({
              type: GET_ERRORS,
              payload: '',
            })
          }}
            > Close</button>
          </Fragment>
        )}   
        </Modal> 
        : "" 
      } 
        <div className="dashboard_wrapper">
          <div className="container-fluid">
          <div className="row">
            {/* <div className="w-17"> */}
                <Sidebar />
            {/* </div> */}
            <div 
             className={classnames( slider ? 'w-82' : 'w-100')}>
            <div className='dashboard_right'>
              <h3 className=" dashboard-header">
                    FiscalYear
                  </h3>
              <div className="admin_search_container">
                <div className="asc_wrap_container">
                {/* <div className="asc_wrap">
                      <label for="name">Search by Name : </label>
                      <input
                        type="text"
                        // placeholder="name"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                  </div> */}
                </div>
                  
                  <button className="btn-search" onClick={defaultHandler}>make default FiscalYear</button>
              </div>
              <div className="table_wrap">
                <table className= "table" >
                  <thead className= "table-head">
                    <tr className= "table-head-each">
                      <th>--</th>
                      <th>Year</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody >
                    {fiscalyearlist.length > 0  ? fiscalyearlist : <div>no fiscalYear found</div>}
                  </tbody>
                </table>
                </div>
            </div>
          </div>
       </div>
       </div>
       </div>
       </Fragment>
    );
  }


export default ErrorHandler(FiscalYearList,axios)


