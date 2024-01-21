import React,{useState,useEffect} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import "nepali-datepicker-reactjs/dist/index.css"
import Sidebar from "../Dashboard/Sidebar"
import {API} from "../../config";
import { useNavigate} from 'react-router-dom';
import axios from "axios"
import moment from "moment"
import Spinner from "../../components/Spinner"
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import Modal from "../../components/Modal"
import { removeModalHandler } from "../../actions/modalAction";
import { useDispatch,useSelector } from "react-redux"
import { GET_ERRORS,SET_MODAL,SET_SPINNER,REMOVE_SPINNER } from "../../actions/types";
import SalesDetail from "./salesDetail"
 import Pagination from "rc-pagination"
import classnames from "classnames";


const salesList = () => {

    const [fiscalYearList , setFiscalYearList] = useState([])
    const [fiscalYear , setFiscalyear] = useState('')
    const [refferalUserList , setRefferalUserList] = useState([])
    const [refferalUser , setRefferalUser] = useState('')
    const [billno , setBillno] = useState("")
    const [dateType, setDateType] = useState()
    const [dateFrom, setDateFrom] = useState("")
    const [dateTo, setDateTo] = useState("")
    const [partyname, setPartyname] = useState("")
    const [lists,setLists] = useState([])
    const [listsNo,setListsNo] = useState([])
    const [loading,setLoading] = useState(false)
    const [showModal , setShowModal] = useState(false)
    const [errors , setErrors] = useState("")
    const [modalAddress , setModalAddress] = useState("")
    const [modalFiscalYear , setModalFiscalYear] = useState("")
    const [modalBillNo , setModalBillNo] = useState("")
    const [modalDiscount , setModalDiscount] = useState("")
    const [modalParty_name , setModalParty_name] = useState("")
    const [modalItems , setModalItems] = useState([])
    const [modalParty_PAN , setModalParty_PAN] = useState("")
    const [modalPaymentMode , setModalPaymentMode] = useState("")
    const [modalSubTotal , setModalSubTotal] = useState("")
    const [modalTotal , setModalTotal] = useState("")
    const [modalRefferedUser , setModalRefferedUser] = useState("")
    const [modalEnglishDate , setModalEnglishDate] = useState("")
    const [perPage, setPerPage] = useState(20);
    const [size, setSize] = useState(perPage);
    const [current, setCurrent] = useState(1);
    const [paginationType , setPaginationType] = useState('normal')
    const [slider,setSlider] = useState(true)

    
    const dispatch = useDispatch();
    const error = useSelector(state => state.errors)
    const modalState = useSelector(state => state.modal)
    const spinnerState = useSelector(state => state.spinner)
    const sliderState = useSelector(state => state.slider)
    const isAuth = useSelector(state => state.auth)
    const navigate = useNavigate();

    const PerPageChange = (value) => {
        setSize(value);
        const newPerPage = Math.ceil(datatableUsers.length / value);
        if (current > newPerPage) {
            setCurrent(newPerPage);
        }
    }

   

    const PaginationChange = (page, pageSize) => {
        console.log(page,pageSize,'ppsss')
        setLoading(true)
        setCurrent(page);
        setSize(pageSize)
        if(paginationType === 'normal') {
            axios
                .get(`${API}/sales?&page=${page}&party_name=${partyname}&billNo=${billno}&dateFrom=${dateFrom}&dateTo=${dateTo}&fiscalYear=${fiscalYear}&refferal_user=${refferalUser}`)
                .then((res) =>
                    {
                        setLoading(false)
                        console.log(res.data.data,'p99')
                    setLists( res.data.data)
                    setListsNo(res.data.totaldata)
                    }
                    )
                .catch((err) => {
                    setLoading(false)
                    if(err.response.status == "500") {
                    return navigate('/error')
                    }
                });
        }else if(paginationType === 'thisweek') {
            axios
            .get(`${API}/sales/salesThisWeek?&page=${page}`)
            .then((res) =>
                {
                    setLoading(false)
                    setLists( res.data.data)
                    setListsNo(res.data.totaldata)
                }
                )
            .catch((err) => {
                setLoading(false)
              if(err.response.status == "500") {
               return navigate('/error')
              }
            });
        }else if(paginationType === 'lastmonth') {
            axios
            .get(`${API}/sales/salesLastMonth?&page=${page}`)
            .then((res) =>
                {
                    setLoading(false)
                    setLists( res.data.data)
                    setListsNo(res.data.totaldata)
                }
                )
            .catch((err) => {
                setLoading(false)
              if(err.response.status == "500") {
               return navigate('/error')
              }
            });
        }else if(paginationType === 'thismonth') {
            axios
            .get(`${API}/sales/salesThisMonth?&page=${page}`)
            .then((res) =>
                {
                    setLoading(false)
                    setLists( res.data.data)
                    setListsNo(res.data.totaldata)
                }
                )
            .catch((err) => {
                setLoading(false)
              if(err.response.status == "500") {
               return navigate('/error')
              }
            });
        }else if(paginationType === 'today') {
            axios
            .get(`${API}/sales/salesToday?&page=${page}`)
            .then((res) =>
                {
                    setLoading(false)
                    setLists( res.data.data)
                    setListsNo(res.data.totaldata)
                }
                )
            .catch((err) => {
                setLoading(false)
              if(err.response.status == "500") {
               return navigate('/error')
              }
            });
        }else if(paginationType === 'lastsixmonth') {
            axios
            .get(`${API}/sales/salesLastSixMonth?&page=${page}`)
            .then((res) =>
                {
                    setLoading(false)
                    setLists( res.data.data)
                    setListsNo(res.data.totaldata)
                }
                )
            .catch((err) => {
                setLoading(false)
              if(err.response.status == "500") {
               return navigate('/error')
              }
            });
        }
        
    }

    const PrevNextArrow = (current, type, originalElement) => {
        if (type === 'prev') {
            return <button><i className="fa fa-angle-double-left"></i></button>;
        }
        if (type === 'next') {
            return <button><i className="fa fa-angle-double-right"></i></button>;
        }
        return originalElement;
    }

    async function fetchData() {
        try {
          setLoading(true);
      
          const salesResponse = await axios.get(`${API}/sales`);
          setLists(salesResponse.data.data);
          setListsNo(salesResponse.data.totaldata)
          const fyResponse = await axios.get(`${API}/fiscalYear`);
          setFiscalYearList(fyResponse.data);
          const userRefferedResponse = await axios.get(`${API}/userReffered`);
          setRefferalUserList(userRefferedResponse.data.data);
      
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

  useEffect(() => {
    setShowModal(modalState.isModal)
    
  }, [modalState])

  useEffect(() => {
  
    if (!isAuth.isAuthenticated) {
      navigate('/login')
          }
  
  }, [isAuth])

        const getData = (e) => {
            e.preventDefault()
            setLoading(true)
            setPaginationType('normal')
            setCurrent(1)

            axios
            .get(`${API}/sales?&page=${current}&party_name=${partyname}&billNo=${billno}&dateFrom=${dateFrom}&dateTo=${dateTo}&fiscalYear=${fiscalYear}&refferal_user=${refferalUser}`)
            .then((res) =>
                {
                    setLoading(false)
                setLists( res.data.data)
            setListsNo(res.data.totaldata)
                }
                )
            .catch((err) => {
                setLoading(false)
              if(err.response.status == "500") {
               return navigate('/error')
              }
            });

        }

        const getThisWeek = (e) => {
            
            e.preventDefault()
            setLoading(true)
            setPaginationType('thisweek')
            setCurrent(1)

            axios
            .get(`${API}/sales/salesThisWeek`)
            .then((res) =>
                {
                    setLoading(false)
                    setLists( res.data.data)
                    setListsNo(res.data.totaldata)
                }
                )
            .catch((err) => {
                setLoading(false)
              if(err.response.status == "500") {
               return navigate('/error')
              }
            });
        }
        const getThisMonth = (e) => {
            e.preventDefault()
            setLoading(true)
            setPaginationType('thismonth')
            setCurrent(1)

            axios
            .get(`${API}/sales/salesThisMonth`)
            .then((res) =>
                {
                    setLoading(false)
                setLists( res.data.data)
                setListsNo(res.data.totaldata)
                }
                )
            .catch((err) => {
                setLoading(false)
              if(err.response.status == "500") {
               return navigate('/error')
              }
            });
        }
        const getLastMonth = (e) => {
            e.preventDefault()
            setLoading(true)
            setPaginationType('lastmonth')
            setCurrent(1)
            axios
            .get(`${API}/sales/salesLastMonth`)
            .then((res) =>
                {
                    setLoading(false)
                    setLists( res.data.data)
                    setListsNo(res.data.totaldata)
                }
                )
            .catch((err) => {
                setLoading(false)
              if(err.response.status == "500") {
               return navigate('/error')
              }
            });
        }
        const getLastSixMonth = (e) => {
            e.preventDefault()
            setLoading(true)
            setPaginationType('lastsixmonth')
            axios
            .get(`${API}/sales/salesLastSixMonth`)
            .then((res) =>
                {
                    console.log(res.data,'p99')
                setLoading(false)
                setLists( res.data.data)
                setListsNo(res.data.totaldata)
                }
                )
            .catch((err) => {
                setLoading(false)
              if(err.response.status == "500") {
               return navigate('/error')
              }
            });
        }
        const getTodaySales = (e) => {
            setLoading(true)
            e.preventDefault();
            setPaginationType('today')
            setCurrent(1)
            
            axios
            .get(`${API}/sales/salesToday`)
            .then((res) =>
                {
                setLoading(false)
                    setLists( res.data.data)
                    setListsNo(res.data.totaldata)
                }
                )
            .catch((err) => {
                setLoading(false)
              if(err.response.status == "500") {
               return navigate('/error')
              }
            });
        }
    const DateOption = [
        {label: 'Nepali' , value: 'Nepali'},
        {label: 'English' , value: 'English'},
    ]
    const closeModalHandler = () => {
       
        dispatch(removeModalHandler())
    }
    const refreshHandler = (e) => {
        e.preventDefault()
        setBillno("")
        setDateFrom("")
        setDateTo("")
        setPartyname("")
        setFiscalyear("")
        setRefferalUser("")
        // setCurrent(1)
    }

    const showSalesHandler = (id)  => {
        // dispatch({
        //   type: SET_SPINNER,
        // })
        console.log('model')
        setLoading(true)
         axios
            .get(`${API}/sales/${id}`)
            .then((res) =>
           { 
            console.log(res.data,'reee')
            setModalAddress(res.data.address)
            setModalFiscalYear(res.data.fiscalYear)
            setModalBillNo(res.data.billNo)
            setModalDiscount(res.data.address)
            setModalParty_name(res.data.party_name)
            setModalItems(res.data.items)
            setModalParty_PAN(res.data.party_PAN)
            setModalPaymentMode(res.data.paymentmode)
            setModalSubTotal(res.data.subTotal)
            setModalTotal(res.data.total)
            setModalRefferedUser(res.data.refferal_user)
            setModalEnglishDate(res.data.englishDate)
            if(res.status && res.status == 200 || res.status == 201) {
                
                setLoading(false)
              dispatch({
                type: SET_MODAL,
              })
      
            }else {
                setLoading(false)
                console.log(err,'-----------------------')
                // dispatch({
                //   type: REMOVE_SPINNER,
                // })
              }
            }
            )
            .catch((err) => {
                setLoading(false)
              console.log(err,'-----------------------')
            //   dispatch({
            //     type: REMOVE_SPINNER,
            //   })
              dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
              })
             
            });
      };
        
    
  return (
    <>      {showModal ? 
        <Modal 
          show={showModal} 
          large
          handleClose={() => {
            closeModalHandler()
          }} 
        > 
           <SalesDetail fiscalyear= {modalFiscalYear } billno={modalBillNo}  partyname={modalParty_name} address={modalAddress} paymentMethod={modalPaymentMode} partypan={modalParty_PAN} lists={modalItems} total={modalTotal} subTotal={modalSubTotal} refferedId= {modalRefferedUser} engdate= {modalEnglishDate}/>
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
                        <div className='list_container_wrap'>
                            <div className="lc_top">
                                <form className="form" >
                                    <div className="lctop_wrap">
                                    <div className="lct_left">
                                        <div className="form-group ">
                                            <div className="form-group-wrap">
                                                <label for="fiscalyear">Fiscal Year :</label>
                                                <select value={fiscalYear} onChange={(e) => setFiscalyear(e.target.value) }>
                                                <option value=''>please select</option>
                                                    {fiscalYearList.map(opt => (
                                                        <option value={opt._id}>{opt.date}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            {/* <div className="form-group-wrap">
                                                <label for="ru">Date in :</label>
                                                <select id="ru" value={dateType} onChange={(e) => setDateType(e.target.value) }>
                                                    {DateOption.map(opt => (
                                                        <option value={opt.value}>{opt.label}</option>
                                                    ))}
                                                </select>
                                            </div> */}
                                            <div className="form-group-wrap">
                                                <label for="fiscalyear">Reffered User :</label>
                                                <select value={refferalUser} onChange={(e) => setRefferalUser(e.target.value) }>
                                                <option value=''>please select</option>
                                                    {refferalUserList.map(opt => (
                                                        <option value={opt._id}>{opt.name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="lct_middle">
                                        <div className="lctm_top">
                                            <div className="form-group ">
                                                <div className="form-group-wrap">
                                                    <label for="datefrom">Date From:</label>
                                                    <DatePicker id="datefrom" selected={dateFrom} 
                                                    onChange={(date) => {
                                                        console.log(moment(date).format(),'dat')
                                                        setDateFrom(date)
                                                    }
                                                        } />
                                                </div>
                                            </div> 
                                            <div className="form-group ">
                                                <div className="form-group-wrap">
                                                    <label for="dateto">To:</label>
                                                    <DatePicker id="dateto" selected={dateTo} 
                                                        onChange={(date) => {
                                                            setDateTo(date)}} />
                                                </div>
                                            </div> 
                                            <button onClick={(e) => getData(e)}>Get data</button>
                                        </div>
                                        <div className="lctm_bottom">
                                                <p onClick={(e) => getTodaySales(e)}>Today</p>
                                                <p onClick={(e) => getThisWeek(e)}>This week</p>
                                                <p onClick={(e) => getThisMonth(e)}>This month</p>
                                                <p onClick={(e) => getLastMonth(e)}>last month</p>
                                                <p onClick={(e) => getLastSixMonth(e)}>last 6 month</p>
                                        </div>
                                        
                                    </div>
                                    <div className="lct_right">
                                        <div className="form-group ">
                                            <div className="form-group-wrap">
                                                <label for="name">Name :</label>
                                                <input
                                                    type="text"
                                                    placeholder="name"
                                                    id="name"
                                                    name="name"
                                                    value={partyname}
                                                    onChange={(e) => setPartyname(e.target.value)}
                                                    />
                                            </div>
                                            <div className="form-group-wrap">
                                                <label for="billno">Bill no :</label>
                                                <input
                                                    type="text"
                                                    placeholder="bill no"
                                                    id="billno"
                                                    name="billno"
                                                    value={billno}
                                                    onChange={(e) => setBillno(e.target.value)}
                                                />
                                            </div>
                                            <button onClick={(e) => refreshHandler(e)}>Refresh</button>

                                        </div>
                                    </div>
                                    </div>
                                </form> 
                            </div>
                            <div className='lc_bottom'>
                                <div className="lc_table_wrap">

                                
                            <table style={{width:'100%'}}>
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Fiscal Year</th>
                                        <th>Bill No</th>
                                        <th>Customer Name</th>
                                        <th>Customer PAN</th>
                                        <th>Date</th>
                                        <th>Sub Total</th>
                                        <th>Discount</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {lists && lists.map((list,index) => (
                                        <tr key={index} onClick={() => showSalesHandler(list._id)}>
                                            <td>{index + 1 }</td>
                                            <td>{list.fiscalYear.date}</td>
                                            <td>{list.billNo}</td>
                                            <td>{list.party_name}</td>
                                            <td>{list.party_PAN}</td>
                                            <td>{list.englishDate.slice(0, 10)}</td>
                                            <td > {list.subTotal}</td>
                                            <td > {list.discount}</td>
                                            <td > {list.total}</td>


                                        </tr>
                                    ))} 
                                </tbody>
            </table>
            </div>
            <div className="table-filter-info">
                                
                                <Pagination
                                    className="pagination-data"
                                    showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
                                    onChange={PaginationChange}
                                    total={listsNo}
                                    current={current}
                                    pageSize={size}
                                    showSizeChanger={false}
                                    itemRender={PrevNextArrow}
                                    onShowSizeChange={PerPageChange}
                                />
                            </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    </div>
    </>

  )
}

export default ErrorHandler(salesList,axios);
