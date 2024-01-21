import React, { Component, Fragment,useState,useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {API} from "../../config";
import { Link,useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit,faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../Dashboard/Sidebar";
import Modal from "../../components/Modal"
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import Pagination from "rc-pagination"
import Spinner from "../../components/Spinner"
import classnames from "classnames";


const AdminProductList = () => {
    const [productList , setProductList] = useState([])
    const [productListNo,setProductListNo] = useState('')
    const [name , setName] = useState("")
    const [errors , setErrors] = useState("")
    const [deleteID , setDeleteID] = useState("")
    const [showModal , setShowModal] = useState(false)
    const [isDeleted , setIsdeleted] = useState(false)
    const [perPage, setPerPage] = useState(20);
    const [size, setSize] = useState(perPage);
    const [current, setCurrent] = useState(1);
    const [loading,setLoading] = useState(false)
    const [slider,setSlider] = useState(true)

  const navigate = useNavigate();

  const sliderState = useSelector(state => state.slider)
  const isAuth = useSelector(state => state.auth)

  useEffect(() => {
    setLoading(true)
        axios
        .get(`${API}/product`)
        .then((res) =>
            {console.log(res,'res')
            setLoading(false)
            setProductList( res.data.data)
            setProductListNo( res.data.totaldata)

            }
            )
        .catch((err) => {
          console.log(err,'iii')
          setLoading(false)
          if(err.response.status == "500") {
           return navigate('/error')
          }
        });
  }, [])
   
  useEffect(() => {
    setSlider(sliderState.isSlider)
    
  }, [sliderState])

  useEffect(() => {
  
    if (!isAuth.isAuthenticated) {
      navigate('/login')
          }
  
  }, [isAuth])

   const handleSearch = () => {
      setLoading(true)
      setCurrent(1)
    axios
    .get(`${API}/product?&name=${name}`)
    .then((res) =>
    {
      setLoading(false)
      setProductList( res.data.data)
      setProductListNo( res.data.totaldata)
      }
    )
    .catch((err) => {
      setLoading(false)
      if(err.response.status == "500") {
       return navigate('/error')
      }
    });
  }
  const PerPageChange = (value) => {
    setSize(value);
    const newPerPage = Math.ceil(datatableUsers.length / value);
    if (current > newPerPage) {
        setCurrent(newPerPage);
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

const PaginationChange = (page, pageSize) => {
  console.log(page,pageSize,'ppsss')
  setLoading(true)
  setCurrent(page);
  setSize(pageSize)
      axios
          .get(`${API}/product?&page=${page}&name=${name}`)
          .then((res) =>
              {
                  setLoading(false)
                  console.log(res.data.data,'p99')
              setProductList( res.data.data)
              setProductListNo(res.data.totaldata)
              }
              )
          .catch((err) => {
              setLoading(false)
              if(err.response.status == "500") {
              return navigate('/error')
              }
          });
  
}

const onDelete = (id) => {
  setLoading(true)
    setCurrent(1)

    axios
    .post(`${API}/product/${id}`)
    .then((res) =>
      { 
        setLoading(false)
        setIsdeleted(true)
        axios
        .get(`${API}/product`)
        .then((res) => 
           { 
        setLoading(false)
            setProductList( res.data.data)
            setProductListNo( res.data.totaldata)}
        )
        .catch((err) => {
          setLoading(false)
        })}
        )
    .catch(
      (err) => 
      setLoading(false)
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data,
      // })
    ); }

  
    let productlist = productList.map((product) => (
        <tr key= {product._id}>
            <td>
              <h6>{product.name}</h6>
            </td>
            <td>
              <Link to={`/product/edit/${product._id}`}>
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
                      setDeleteID (product._id)
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
        {!isDeleted ? 
            ( 
              <Fragment>
                  <h5>Do you want to delete ?</h5> 
                  <FontAwesomeIcon icon={faTrash} style={{fontSize: '30px',display: 'block' ,color: 'red',textAlign: 'center',margin:' auto auto 22px'}}/> 
                  <div className="btn_wrap  " style={{display:"flex",justifyContent:'space-around'}}>
                    <button className="btn-delete" onClick = { () => onDelete(deleteID)}> Delete</button>
                    <button className="btn-edit" onClick = {() => setShowModal(false)}> Cancel</button>
                  </div>
              </Fragment>
        ) :(
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
        )}
           
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
              <div className="product-container-wrap">
              
              
              <div className="admin_search_container">
                  <h3 className=" dashboard-header">
                     All Products
                  </h3>
                <div className="asc_wrap_container">
                <div className="asc_wrap">
                      <label for="name">Search by Name : </label>
                      <input
                        type="text"
                        // placeholder="name"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                  </div>
                  <button className="btn-search" onClick={handleSearch}>Search</button>

                </div>
                  
              </div>
              <div className="table_wrap">
                <table className= "table" >
                  <thead className= "table-head">
                    <tr className= "table-head-each">
                      <th>Name</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody >
                    {productList.length > 0  ? productlist : <div>no product found</div>}
                  </tbody>
                </table>
                
                </div>
            </div>
            <div className="table-filter-info">
                                
                                <Pagination
                                    className="pagination-data"
                                    showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
                                    onChange={PaginationChange}
                                    total={productListNo}
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
       </Fragment>
    );
  }


export default ErrorHandler(AdminProductList,axios)


// export default connect(null, {  })(AdminProductList);
