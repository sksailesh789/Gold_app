import React,{useState,useEffect} from 'react'
import classnames from "classnames";
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NepaliDatePicker } from "nepali-datepicker-reactjs"
import "nepali-datepicker-reactjs/dist/index.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit,faCheckCircle } from "@fortawesome/free-solid-svg-icons";
const numWords = require('num-words')
import { useNavigate} from 'react-router-dom';
import Sidebar from "../Dashboard/Sidebar"
import {API} from "../../config";
import {addSalesHandler} from "../../actions/salesAction"
import store from "../../store/index"
import { GET_ERRORS,REMOVE_MODAL } from "../../actions/types";
import { useDispatch,useSelector } from "react-redux"
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import { removeModalHandler } from "../../actions/modalAction";
import Modal from "../../components/Modal"
import Spinner from "../../components/Spinner"

const addSales = () => {

    const [fiscalyear , setFiscalYear] = useState("")
    const [fiscalyearId , setFiscalYearId] = useState("")
    const [billno , setBillno] = useState("")
    const [engdate, setEngdate] = useState(new Date())
    const [nepalidate, setNepalidate] = useState("")
    const [partyname, setPartyname] = useState("")
    const [partypan, setPartypan] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [particular, setParticular] = useState("")
    const [particularId, setParticularId] = useState("")
    const [ornamentType, setOrnamentType] = useState("gold")
    const [weight, setWeight] = useState("")
    const [jarti, setJarti] = useState("")
    const [totalWeight, setTotalWeight] = useState("")
    const [rate, setRate] = useState("")
    const [jyala, setJyala] = useState("")
    const [patthar, setPatthar] = useState("")
    const [price, setPrice] = useState("")
    const [lists,setLists] = useState([])
    const [subTotal, setSubTotal] = useState("")
    const [total, setTotal] = useState("")
    const [discount,setDiscount] = useState("")
    const [products, setProducts] = useState([])
    const [paymentMethod,setPaymentMethod] = useState('Cash')
    const [refferalUser , setRefferalUser] = useState([])
    const [refferedId,setRefferedId] = useState(null)
    const [slider,setSlider] = useState(true)
    const [loading , setLoading] = useState(false)
    const [showModal , setShowModal] = useState(false)


    const [errors , setErrors] = useState("")

    const dispatch = useDispatch();
  const error = useSelector(state => state.errors)
  const modalState = useSelector(state => state.modal)
  const spinnerState = useSelector(state => state.spinner)
  const sliderState = useSelector(state => state.slider)
  const isAuth = useSelector(state => state.auth)
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
        type: GET_ERRORS,
        payload: '',
      })
  }, [])
  

    useEffect(() => {
        subTotalCalculateHandler(lists)
        totalCalculateHandler()
    }, [lists])
    useEffect(() => {
    totalCalculateHandler()
      
    }, [subTotal])
    
    useEffect(() => {
        setSlider(sliderState.isSlider)
        
      }, [sliderState])

    useEffect(() => {
        setShowModal(modalState.isModal)
        
      }, [modalState])

      useEffect(() => {
        setLoading(spinnerState.isSpinner)
        
      }, [spinnerState])
    
    useEffect(() => {
        setErrors(error)
        
      }, [error])

      useEffect(() => {
  
        if (!isAuth.isAuthenticated) {
          navigate('/login')
              }
      
      }, [isAuth])
      
    // useEffect(() => {
    //     setLoading(true)
    //     axios
    //     .get(`${API}/fiscalYear/active`)
    //     .then((res) =>
    //         {console.log(res,'resfisca')
    //         setLoading(false)
    //         setFiscalYearId(res.data._id)
    //         setFiscalYear( res.data.date)
    //         }
    //         )
    //     .catch((err) => {
    //       console.log(err,'iii')
    //         setLoading(false)
    //       if(err.response.status == "500") {
    //        return navigate('/error')
    //       }
    //     });
    //     setLoading(true)
    //     axios
    //     .get(`${API}/userReffered`)
    //     .then((res) =>
    //         {console.log(res,'res')
    //         setLoading(false)
    //         setRefferalUser( res.data.data)
    //         }
    //         )
    //     .catch((err) => {
    //       console.log(err,'iii')
    //       setLoading(false)
    //       if(err.response.status == "500") {
    //        return navigate('/error')
    //       }
    //     });
    //     setLoading(true)
    //     axios
    //     .get(`${API}/billno`)
    //     .then((res) =>
    //         {console.log(res,'res99')
    //         setLoading(true)
    //         setBillno(res.data.seq + 1)
    //         }
    //         )
    //     .catch((err) => {
    //       console.log(err,'iii')
    //       setLoading(false)
    //       if(err.response.status == "500") {
    //        return navigate('/error')
    //       }
    //     });

    // }, [])
    async function fetchData() {
        try {
          setLoading(true);
      
          const fiscalYearResponse = await axios.get(`${API}/fiscalYear/active`);
          setFiscalYearId(fiscalYearResponse.data._id);
          setFiscalYear(fiscalYearResponse.data.date);
      
          const userReferredResponse = await axios.get(`${API}/userReffered`);
          setRefferalUser(userReferredResponse.data.data);
      
          const billNoResponse = await axios.get(`${API}/billno`);
          setBillno(billNoResponse.data.seq + 1);
      
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
      
    const refreshHandler = () => {
       
        setAddress("")
        setLists([])
        setPartyname('')
        // setProducts([])
        setPhone("")
        setRefferedId("")
        setPaymentMethod('Cash')
        setSubTotal("")
        setTotal("")
        setDiscount("")
        dispatch({
            type: GET_ERRORS,
            payload: '',
          })

    }
    

    const itemAddHandler = (e) => {
        e.preventDefault();
        if(particular == "" || ornamentType == "" || weight == "" ||jarti == "" ||jyala == "" || totalWeight == "" || price == "") { 
            console.log('empty')
            return
        }
       
        const newList = [...lists , {particularName:particular,particulars:particularId,ornamentType : ornamentType,weight:weight,jarti:jarti,totalWeight:totalWeight,rate:rate,jyala: jyala,patthar:patthar,price:price}]
       setLists(newList)
       setParticular("")
       setOrnamentType("gold")
       setPrice("")
       setWeight("")
       setParticularId("")
       setJarti("")
       setTotalWeight("")
       setRate("")
       setJyala("")
       setPatthar("")
    //    subTotalCalculateHandler(newList)
    }
    const priceCalculateHandler = () => {
        let value = Number((totalWeight * rate) / 11.664) + Number(jyala) + Number(patthar);
        console.log(value,'value')
        setPrice(Math.round(value))
    }

    const clearAllHandler = (e) => {
        e.preventDefault()
        setLists([])
    }
    const removeItemHandler = (id) => {
         setLists(lists.filter((each,index) => index !== id ))
        // subTotalCalculateHandler(lists)
    }

    const subTotalCalculateHandler = (listss) => {
        const amount = listss.reduce(
            (previousValue, currentValue) => { 
                return previousValue + currentValue.price 
            },
            0
          );
          setSubTotal(amount)
    }
    const productSelectHandler = (name,id) => {
        setParticular(name)
        setParticularId(id)
        setProducts([])
    }
    const totalCalculateHandler = (value) => {
        if(value) {
            console.log('1')

            setDiscount(value)
            setTotal(subTotal-value)
        }else {
            console.log(subTotal,'2')
            setTotal(subTotal- discount)
        }
        
    }

    const productSearchHandler = (name) => {
        if(name.length == 0) {
            setParticular(name)
            setProducts([])
            console.log(name.length , 'nl1')
            return
        }
        console.log(name.length,'nm')
        setParticular(name)
        axios
        .get(`${API}/product?&name=${name}`)
        .then((res) =>
        {
            setProducts(res.data.data)
            console.log(res.data,'rdd')
          }
        )
        .catch((err) => {
          console.log(err,'iii')
       
        })
    }

    let fd;

   

    const paymentModeList = [
        {name: 'Cash' , value: 'Cash'},
        {name: 'Esewa' , value: 'Esewa'},
        {name: 'Mobile Banking' , value: 'Mobile Banking'},
        {name: 'PhonePay' , value: 'PhonePay'},

    ]
    const ornamentList = [
        {name: 'gold' , value: 'gold'},
        {name: 'silver' , value: 'silver'}
    ]

    const printHandler = (e) => {
        console.log('nepalidate',nepalidate)
        e.preventDefault()
        let num = numWords(total)
        fd= {
            fiscalYear:fiscalyearId,
            billNo:billno,
            refferal_user:refferedId,
            englishDate:engdate,
            nepaliDate:nepalidate,
            party_name:partyname,
            paymentmode:paymentMethod,
            phone:phone,
            address:address,
            items: lists,
            subTotal:subTotal,
            total:total,
            discount: discount,
            word: num
          }

         dispatch(addSalesHandler(fd))
        // electron.printApi.sendPrint(fd)
    }

    const closeModalHandler = () => {
        axios
        .get(`${API}/billno`)
        .then((res) =>
            {console.log(res,'res99')
            setBillno(res.data.seq + 1)
            }
            )
        .catch((err) => {
          console.log(err,'iii')
          if(err.response.status == "500") {
           return navigate('/error')
          }
        });
        dispatch(removeModalHandler())
        refreshHandler()

        // setShowModal(false)
        // setName('')
    }
    const refreshAllHandler = (e) => {
            e.preventDefault();
            refreshHandler()
    }
    const setWeightHandler = (value) => {
        setWeight(value)
        let totalw = Number(value) + Number(jarti)
        setTotalWeight(totalw)

    }

    const setJartiHandler = (value) => {
        setJarti(value)
        let totalw = Number(value) + Number(weight)
        setTotalWeight(totalw)
    }

  return (
    <>
    {showModal ? 
            <Modal 
              show={showModal} 
              handleClose={() => {
                closeModalHandler()
              }} 
            > 
               <h5>Sales added successfully</h5> 
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
             className={classnames( slider ? 'w-82' : 'w-100')} >
                <div className='dashboard_right'>
                <div className='sales_container_wrap'>
        <form className="form" >                
            <div className="sc_top">
                <div className="sct_left">
                    <div className="form-group ">
                        <div className="form-group-wrap">
                            <label for="fiscalyear">Fiscal Year :</label>
                            <input
                                type="text"
                                placeholder="Fiscal Year"
                                id="fiscalyear"
                                className={classnames({ "is-invalid": errors.fiscalYear })}
                                name="fiscalyear"
                                value={fiscalyear}
                                disabled
                                onChange={(e) => setFiscalyear(e.target.value)}
                                />
                                {errors.fiscalYear && (
                                  <div className="invalid-feedback">{errors.fiscalYear}</div>
                                )}
                        </div>
                    </div>
                    <div className="form-group ">
                        <div className="form-group-wrap">
                            <label for="billno">Bill No:</label>
                            <input
                                type="text"
                                placeholder="Bill No"
                                id="billno"
                                className={classnames({ "is-invalid": errors.billNo })}
                                name="billno"
                                value={billno}
                                disabled
                                onChange={(e) => setBillno(e.target.value)}
                                />
                                {errors.billNo && (
                                  <div className="invalid-feedback">{errors.billNo}</div>
                                )}
                        </div>
                    </div>     
                </div>
                <div className="sct_right">
                    <div className="form-group ">
                        <div className="form-group-wrap">
                            <label for="engdate">English Date :</label>
                            <DatePicker selected={engdate} onChange={(date) => setEngdate(date)} />
                            {/* <input
                                type="text"
                                placeholder="English date"
                                id="engdate"
                                className={classnames({ "is-invalid": errors.englishDate })}
                                name="engdate"
                                value={engdate}
                                onChange={(e) => setEngdate(e.target.value)}
                                />
                                {errors.englishDate && (
                                  <div className="invalid-feedback">{errors.englishDate}</div>
                                )} */}
                        </div>
                    </div> 
                    <div className="form-group ">
                        <div className="form-group-wrap">
                            <label for="nepalidate">Nepali. Date :</label>
                            <NepaliDatePicker 
                            inputClassName="form-control"
                              className=""
                              value={nepalidate}
                              onChange={(value) => setNepalidate(value)}
                              options={{ calenderLocale: "ne", valueLocale: "en" }} />
                            {/* <input
                                type="text"
                                placeholder="English date"
                                id="nepalidate"
                                className={classnames({ "is-invalid": errors.nepaliDate })}
                                name="nepalidate"
                                value={nepalidate}
                                onChange={(e) => setNepalidate(e.target.value)}
                                />
                                {errors.nepaliDate && (
                                  <div className="invalid-feedback">{errors.nepaliDate}</div>
                                )} */}
                        </div>
                    </div>
                </div>
                    
        </div>
        <div className="sc_mid">
            <div className="scm_left">
                <div className="form-group ">
                    <div className="form-group-wrap">
                        <label for="partyname">Party Name :</label>
                        <input
                            type="text"
                            placeholder="Party name"
                            id="partyname"
                            className={classnames({ "is-invalid": errors.party_name })}
                            name="partyname"
                            value={partyname}
                            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                            onChange={(e) => setPartyname(e.target.value)}
                            />
                        {errors.party_name && (
                            <div className="invalid-feedback">{errors.party_name}</div>
                        )}
                    </div>
                </div>
                <div className="form-group ">
                    <div className="form-group-wrap">
                        <label for="address">Address :</label>
                        <input
                            type="text"
                            placeholder="address"
                            id="address"
                            className={classnames({ "is-invalid": errors.address })}
                            name="address"
                            value={address}
                            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                            onChange={(e) => setAddress(e.target.value)}
                            />
                        {errors.address && (
                            <div className="invalid-feedback">{errors.address}</div>
                        )}
                    </div>
                </div>

            </div>
            <div className="scm_right">
                <div className="form-group ">
                        <div className="form-group-wrap">
                            <label for="paymentmode">Payment Mode :</label>
                            <select id="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value) }>
                                {paymentModeList.map(opt => (
                                    <option value={opt.value}>{opt.name}</option>
                                ))}
                            </select>
                        </div>
                </div>
                <div className="form-group ">
                    <div className="form-group-wrap">
                        <label for="phone">Phone :</label>
                        <input
                            type="text"
                            placeholder="Phone no"
                            id="phone"
                            name="phone"
                            value={phone}
                            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                            onChange={(e) => setPhone(e.target.value)}
                            />
                    </div>
                </div>
                <div className="form-group ">
                    <div className="form-group-wrap">
                        <label for="refferalUser">Refferal User :</label>
                        <select id="refferalUser" value={refferedId} onChange={(e) => setRefferedId(e.target.value) }>
                            <option value=''>please select</option>
                            {refferalUser.map(opt => (
                                <option value={opt._id}>{opt.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

            </div>
        </div>
        <div className="sc_bottom">
            <div className="scb_add">
                <div className="form-group w-45">
                    <div className="form-group-wrap ">
                        <label for="particular">Particulars :</label>
                        <div className="particular_input_wrap">
                            <input
                                type="text"
                                placeholder="particular"
                                id="particular"
                                name="particular"
                                value={particular}
                                onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                                onChange={(e) => productSearchHandler(e.target.value)}
                            />
                            <div className="product_search_list">
                            {products.length > 0 ? products.map(product =>{  
                                console.log(product,'nppp')
                                return (
                                    <p onClick={() => productSelectHandler(product.name,product._id)}> {product.name}</p>
                                )}
                            ):""}
                    </div> 
                        </div>
                          
                        </div>
                       
                </div> 
                <div className="form-group w-21">
                    <div className="form-group-wrap">
                        <label for="type">Type:</label>
                        <select value={ornamentType} onChange={(e) => setOrnamentType(e.target.value) }>
                            {ornamentList.map(opt => (
                                <option value={opt._id}>{opt.name}</option>
                            ))}
                        </select>
                        </div>
                </div>
                <div className="form-group w-33">
                    <div className="form-group-wrap">
                        <label for="weight">तौल:</label>
                        <input
                            type="text"
                            placeholder="gm"
                            id="weight"
                            name="weight"
                            value={weight}
                            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                            onChange={(e) => { 
                                setWeightHandler(e.target.value)
                                // setWeight(e.target.value)
                            }}
                        />  
                        </div>
                </div>
                <div className="form-group w-33">
                    <div className="form-group-wrap">
                        <label for="jarti">जर्ती:</label>
                        <input
                            type="text"
                            placeholder="gm"
                            id="jarti"
                            name="jarti"
                            value={jarti}
                            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                            onChange={(e) => setJartiHandler(e.target.value)}
                        />  
                        </div>
                </div> 
                <div className="form-group w-33 longtext">
                    <div className="form-group-wrap">
                        <label for="totalweight">जर्ती समेतको तौल:</label>
                        <input
                            type="text"
                            placeholder="gm"
                            id="totalweight"
                            name="totalweight"
                            value={totalWeight}
                            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                            // onChange={(e) => setTotalWeight(e.target.value)}
                            disabled
                        />  
                        </div>
                </div>
                <div className="form-group w-33">
                    <div className="form-group-wrap">
                        <label for="rate">Rate:</label>
                        <input
                            type="text"
                            id="rate"
                            name="rate"
                            value={rate}
                            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                            onChange={(e) => setRate(e.target.value)}
                        />  
                        </div>
                </div>  
                <div className="form-group w-33">
                    <div className="form-group-wrap">
                        <label for="jyala">ज्याला:</label>
                        <input
                            type="text"
                            id="jyala"
                            name="jyala"
                            value={jyala}
                            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                            onChange={(e) => setJyala(e.target.value)}
                        />  
                        </div>
                </div> 
                <div className="form-group w-33">
                    <div className="form-group-wrap">
                        <label for="patthar">पत्थर/पोते:</label>
                        <input
                            type="text"
                            id="patthar"
                            name="patthar"
                            value={patthar}
                            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                            onChange={(e) => setPatthar(e.target.value)}
                        />  
                        </div>
                </div> 
                <div className="form-group w-33">
                    <div className="form-group-wrap">
                        <label for="quantity">Price :</label>
                        <input
                            type="text"
                            placeholder="price"
                            id="price"
                            name="price"
                            value={price}
                            disabled
                            // onChange={(e) => setPrice(e.target.value)}
                        />  
                        </div>
                </div>
                <div className="scb_button_wrap">
                <button type='button' onClick={(e) => priceCalculateHandler(e)}>get amount</button>  
                    <button type='button' onClick={(e) => itemAddHandler(e)}>Add</button>  
                </div>

            </div> 
            {errors.items && (
              <div className="invalid-feedback">{errors.items}</div>
            )}
            <div className="scb_table">
                <div 
                className = {`
                table_wrap
                ${errors.items  ? 'is-invalid' : ''}
               `}
                >
            <table style={{width:'100%'}}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>गहनाको विवरण</th>
                        <th>सुनचाँदीको  किसिम</th>
                        <th>तौल gram</th>
                        <th>जर्ती </th>
                        <th>जर्ती समेतको तौल</th>
                        <th>rate</th>
                        <th>ज्याला </th>
                        <th>पत्थर/ पोते</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {lists.map((list,index) => (
                        <tr key={index}>
                            <td>{index + 1 }</td>
                            <td>{list.particularName}</td>
                            <td>{list.ornamentType}</td>
                            <td>{list.weight}</td>
                            <td>{list.jarti}</td>
                            <td>{list.totalWeight}</td>
                            <td>{list.rate}</td>
                            <td>{list.jyala}</td>
                            <td>{list.patthar}</td>
                            <td>{list.price}</td>
                            <td > 
                                <FontAwesomeIcon icon={faTrash} style={{ color: "#54545c",fontSize:'14px' }}
                                                onClick={ () => removeItemHandler(index) }/>
                                        </td>

                        </tr>
                    ))} 
                </tbody>
            </table>
           
            </div>
           
            <div className="salebtn_wrap">
                <button onClick={(e) => clearAllHandler(e)}>Clear All</button>            
            </div>
            </div>               
        </div>
        <div className="sc_footer">
            <div className="scf_left">
                    In Words: {numWords(total)} rupees only
            </div>
            <div className="scf_right">
                <div className="form-group ">
                    <div className="form-group-wrap">
                        <label for="subtotal">SubTotal :</label>
                        <input
                            type="text"
                            id="subtotal"
                            className={classnames({ "is-invalid": errors.subTotal })}
                            name="subTotal"
                            value={subTotal}
                            disabled
                            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                            onChange={(e) => setSubTotal(e.target.value)}
                        />
                        {errors.subTotal && (
                            <div className="invalid-feedback">{errors.subTotal}</div>
                        )}
                    </div>
                </div>
                <div className="form-group ">
                    <div className="form-group-wrap">
                        <label for="discount">Discount :</label>
                        <input
                            type="text"
                            id="discount"
                            name="discount"
                            value={discount}
                            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                            onChange={(e) => totalCalculateHandler(e.target.value) }
                        />
                    </div>
                </div>
                <div className="form-group ">
                    <div className="form-group-wrap">
                        <label for="total">Total :</label>
                        <input
                            type="text"
                            id="total"
                            className={classnames({ "is-invalid": errors.total })}
                            name="total"
                            value={total}
                            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                            onChange={(e) => setTotal(e.target.value)}
                        />
                        
                    </div>
                </div>
                            <div className="button_wrap">
                                <button className='sp_button' onClick={(e)=> printHandler(e)}>Save & Print</button>
                                <button className='r_button' onClick={(e)=> refreshAllHandler(e)}>Refresh</button>

                            </div>
            </div>
        </div>
            </form>
    </div>
                </div>
              </div>
            </div>
          </div>
    </div>
    </>
  )
}

export default ErrorHandler(addSales,axios);
