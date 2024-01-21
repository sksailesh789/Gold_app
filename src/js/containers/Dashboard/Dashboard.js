import React,{useState,useEffect} from 'react'
import Sidebar from "./Sidebar"
import { useNavigate} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import axios from "axios";
import { Line,Bar } from 'react-chartjs-2';
import {API} from "../../config";
import classnames from "classnames";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js';
import Dashboardbar from "./dashboardbar"
import Dashboardnew from "./Dashboardnew"

const Dashboard = (props) => {
  const [msg, setMsg] = useState({});
  const [modal, setModal] = useState(false);
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [slider,setSlider] = useState(true)


  const sliderState = useSelector(state => state.slider)
  const isAuth = useSelector(state => state.auth)
  const navigate = useNavigate();
  
  // let data;
  useEffect(() => {
    setSlider(sliderState.isSlider)
    
  }, [sliderState])

 useEffect(()=> {
  let newdata = [] , newlabel = [];

 let setDataLabelHandler = (data) => {
    data.map(d => {
      newdata.push(d.totalSales)
      newlabel.push(d.monthName)
      // newlabel.push(d.monthName.toString())


    })
    console.log(newdata,newlabel)
    const newData = {
      labels : newlabel,
      datasets: [
        {
          label: 'sales',
          data: newdata,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
    setData(newData);
 }
  axios
        .get(`${API}/sales/salesByEachMonth`)
        .then((res) =>
            {console.log(res,'res')
            setDataLabelHandler(res.data)
            }
            )
        .catch((err) => {
          console.log(err,'iii')
        });
        
 },[])

 
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Sales',
      },
    },
  };
  
  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','august','september','october'];
  
  

  

useEffect(() => {
  
  if (!isAuth.isAuthenticated) {
    navigate('/login')
        }

}, [isAuth])



  return (
    <div className="dashboard_wrapper">
          <div className="container-fluid">
            <div className="row">
              {/* <div className="w-17"> */}
                  <Sidebar />
              {/* </div> */}
              <div 
             className={classnames( slider ? 'w-82' : 'w-100')}
            //  style={{ transition: 'width 0.1s ease' }}
             >
                <div className='dashboard_right'>
                  <div className="line-wrapper">
                    {/* <Line options={options} data={data} /> */}
                    {data && <Line options={options} data={data} />}

                  </div>
                  <div className="bar-wrapper">
                    <Dashboardbar />
                  </div>
                  <div className="bar-wrapper">
                    <Dashboardnew />
                  </div>
                {/* <Bar data={data1} options={options1} /> */}
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default ErrorHandler(Dashboard,axios) 






// import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   // BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   PointElement,
//   LineElement
// } from "chart.js";
// import { Line } from "react-chartjs-2";



// const Dashboard = () => {
//     const options1 = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Chart.js Line Chart',
//       },
//     },
//   };
//   const labels1 = ['January', 'February', 'March', 'April', 'May', 'June', 'July','august','september','october','november','december'];

//      const data1 = {
//     labels1,
//     datasets: [
//       {
//         label: 'Dataset 1',
//         data: [300, 100, 500, 400, 1000, 100, 700,600,1200,1100,1650,700],
//         borderColor: 'rgb(255, 99, 132)',
//         backgroundColor: 'rgba(255, 99, 132, 0.5)',
//       },
//       // {
//       //   label: 'Dataset 2',
//       //   data: [200, 900, 1000, 800, 500, 100, 300,800,500,600,1250,1300],
//       //   borderColor: 'rgb(53, 162, 235)',
//       //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
//       // },
//     ],
//   };

//   ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     // BarElement,
//     Title,
//     Tooltip,
//     Legend
//   );
  
//    const options = {
//     plugins: {
//       title: {
//         display: true,
//         text: "Chart.js Bar Chart - Stacked"
//       }
//     },
//     responsive: true,
//     scales: {
//       x: {
//         stacked: true
//       },
//       y: {
//         stacked: true
//       }
//     }
//   };
  
//   const labels = ["January", "February", "March", "April", "May", "June", "July"];
  
//    const data = {
//     labels,
//     datasets: [
//       {
//         label: "Dataset 1",
//         data: [500, 600, 700, 800, 900, 1000, 1100],
//         backgroundColor: "rgb(255, 99, 132)"
//       },
//       {
//         label: "Dataset 2",
//         data: [500, 900, 600, 400, 200, 1000, 1100],
//         backgroundColor: "rgb(75, 192, 192)"
//       },
//       {
//         label: "Dataset 3",
//         data: [500, 600, 400, 700, 600, 600, 1100],
//         backgroundColor: "rgb(53, 162, 235)"
//       }
//     ]
//   };

//   return (
//     <div>
//       <Line options={options1} data={data1} />

//       {/* <Bar options={options} data={data} />; */}
//     </div>
//   )

// }

// export default Dashboard
