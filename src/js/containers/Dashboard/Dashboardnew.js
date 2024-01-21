import React,{useState,useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from "axios";
import {API}  from "../../config.js"
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const Dashboardnew = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });



  useEffect(() => {
    let newLabel = [], newData = []
    let labelHandler = (data1) => {
        data1.map(d => {
          newLabel.push(d.name)
          newData.push(d.points)
        })
        // setLabel(newLabel)
        // setLabeldata(newData)
        const data = {
          labels: newLabel,
          datasets: [
            {
              label: 'User reffered',
              data: newData,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            // {
            //   label: 'Dataset 2',
            //   data: [500, 600, 400, 700, 600, 600, 1100],
            //   borderColor: 'rgb(53, 162, 235)',
            //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
            // },
          ],
        };
        setData(data)
    }
    axios.get(`${API}/userReffered`).then(res =>{
      console.log(res.data.data,'rddddd')
      labelHandler(res.data.data)
      
    }).catch(err => console.log(err))
  
    
  }, [])
  

  const options = {
    indexAxis: 'y' ,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right' ,
      },
      title: {
        display: true,
        text: 'User Refered Points',
      },
    },
  };
  
 
  
   
return (
  <Bar options={options} data={data} />
)  
}

export default Dashboardnew;

