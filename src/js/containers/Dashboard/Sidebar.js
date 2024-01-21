import React,{useState,useEffect} from 'react'
import MultiMenus from './multiMenus';
import { useNavigate,Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux"
import classnames from "classnames";



const Sidebar = (props) => {
    const navigate = useNavigate();
const [slider,setSlider] = useState(true)

  const dispatch = useDispatch();
  const sliderState = useSelector(state => state.slider)

  useEffect(() => {
    setSlider(sliderState.isSlider)
    
  }, [sliderState])

    let lists = [
        
        {
            label: 'Product',
            value: 'Product',
            submenu: [
                {
                    label: 'Add Product',
                    path: '/addProduct'
                },
                {
                    label: 'Product List',
                    path: '/adminProductList'
                }
            ]
        },
        {
            label: 'Sales',
            value: 'Sales',
            submenu: [
                {
                    label: 'Add Sales',
                    path: '/addSales',
                    value:'Add Sales'
                },
                {
                    label: 'Sales List',
                    path: '/salesList',
                    value:'Sales List'
                }
            ]
        },
        {
            label: 'Convert',
            value: 'Convert',
            submenu: [
                {
                    label: 'Convert',
                    path: '/Convert'
                },
            ]
        },
        {
            label: 'FiscalYear',
            value: 'FiscalYear',
            submenu: [
                {
                    label: 'Add FiscalYear',
                    path: '/addFiscalYear',
                    value:'Add FiscalYear'
                },
                {
                    label: 'FiscalYear List',
                    path: '/fiscalYearList',
                    value:'FiscalYear List'
                },
            ]
        },
        {
            label: 'RefferedUser',
            value:'RefferedUser',
            submenu: [
                {
                    label: ' Add RefferedUser',
                    path: '/addRefferedUser',
                    value:'Add RefferedUser'
                    
                },
                {
                    label: 'RefferedUser List',
                    path: '/RefferedUserList',
                    value:'RefferedUser List'
                    
                },
            ]
        },
        {
            label: 'User',
            value: 'User',
            submenu: [
                {
                    label: 'User List',
                    path: '/UserList',
                    value:'User List'
                },
                {
                    label: 'Register',
                    path: '/Register',
                    value:'Register User'
                },
            ]
        }
    ]

  return (
    <div 
    className={classnames({ "d-none": !slider },"w-17")}
    //  className="w-17"
     >
    <div className='dashboard_left'>
            <div className='dashboard_left_wrap'>
                <div className='closed_sidebar'>
                    <i className="fas fa-times"></i>
                </div>
                <div className='dl_left_header'>

                </div>
                <div className='dl_List'>
                    
                    <div className='li_wrap'>
                        <Link to="/"> Dashboard </Link>
                    </div>
                        
                <MultiMenus menus={lists} props={props}/>
                </div>
            </div>
        </div>
        </div>
  )
}

export default Sidebar