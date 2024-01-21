// import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   PointElement,
//   LineElement
// } from "chart.js";
// import { Line,Bar } from "react-chartjs-2";


// const Dashboardbar = () => {
    

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
//       <Bar options={options} data={data} />;
//     </div>
//   )

// }

// export default Dashboardbar



// import React, { useEffect, useState } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   PointElement,
//   LineElement
// } from "chart.js";
// import { Line, Bar } from "react-chartjs-2";
// import {API} from "../../config";


// const Dashboardbar = () => {
//   ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
//   );

//   const [data, setData] = useState({
//     labels: [],
//     datasets: [],
//   });

//   const options = {
//     plugins: {
//       title: {
//         display: true,
//         text: "Chart.js Bar Chart - Stacked",
//       },
//     },
//     responsive: true,
//     scales: {
//       x: {
//         stacked: true,
//       },
//       y: {
//         stacked: true,
//       },
//     },
//   };

//   useEffect(() => {
//     async function fetchData() {
//       const response = await fetch(`${API}/sales/salesByTopProduct`);
//       const data = await response.json();
//       const labels = data.map((item) => item.month);
//       console.log(data,'d0o')
//       const datasets = data[0].products.map((product) => {
//         // console.log(products,'poooooro')
//         return {
//           label: product.product.name,
//           data: data.map(
//             (item) =>
//               item.products.find((p) => p.product.name === product.product.name)
//                 .totalSales
//           ),
//           backgroundColor: getRandomColor(),
//         };
//       });
//       console.log(datasets,'ds')
//       setData({ labels, datasets });
//     }
//     fetchData();
//   }, []);

//   const getRandomColor = () => {
//     const r = Math.floor(Math.random() * 255);
//     const g = Math.floor(Math.random() * 255);
//     const b = Math.floor(Math.random() * 255);
//     return `rgb(${r}, ${g}, ${b})`;
//   };

//   return (
//     <div>
//       <Bar options={options} data={data} />
//     </div>
//   );
// };

// export default Dashboardbar;
import React, { useEffect, useState } from "react";
import axios from "axios"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import {API} from "../../config";

const Dashboardbar = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch data from API
    axios.get(`${API}/sales/salesByTopProduct`)
      .then(res => {
        // Transform data to match chart format
        const labels = res.data.map(item => item.month);
        const products = [...new Set(res.data.flatMap(item => item.products.map(product => product.product.name)))];
        const datasets = products.map(product => {
          const dataPoints = res.data.map(item => {
            const productItem = item.products.find(p => p.product.name === product);
            return productItem ? productItem.totalSales : 0;
          });
          const backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
          return {
            label: product,
            data: dataPoints,
            backgroundColor,
          };
        });
        // console.log(labels,datasets,'ld')
        setChartData({ labels, datasets });
      })
      .catch(error => console.error(error));
  }, []);

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Product sales Monthly"
      }
    },
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    }
  };

  return (
    <div>
      {chartData ? <Bar options={options} data={chartData} /> : <p>Loading...</p>}
    </div>
  );
};

export default Dashboardbar



// const Dashboardbar = () => {
//   const [salesData, setSalesData] = useState([]);

//   useEffect(() => {
//     axios.get(`${API}/sales/salesByTopProduct`).then(res => {
//       setSalesData(res.data)
//     }).catch(err => {
//       console.log(err,err)
//     })
//   }, []);

//   const parseSalesData = () => {
//     const labels = []; // x-axis labels
//     const productData = {}; // y-axis datasets

//     // Iterate through API response and extract necessary data
//     salesData.forEach((monthData) => {
//       const { year, month, products } = monthData;

//       // Add month label to labels array
//       labels.push(`${month} ${year}`);

//       // Iterate through products and add sales data to productData object
//       products.forEach((product) => {
//         const { name, totalSales } = product.product;
//         if (!productData[name]) {
//           productData[name] = {
//             label: name,
//             data: [],
//           };
//         }
//         productData[name].data.push(totalSales);
//       });
//     });

//     return { labels, datasets: Object.values(productData) };
//   };

//   const chartData = parseSalesData();

//   const chartOptions = {
//     // Add chart options here
//   };

//   return (
//     <div>
//       <h2>Total Sales by Product</h2>
//       <Bar data={chartData} options={chartOptions} />
//     </div>
//   );
// };

// export default Dashboardbar;



// import React, { useState, useEffect } from "react";
// import { Bar } from "react-chartjs-2";
// import {API} from "../../config.js"


// const Dashboarbar = () => {
//   const [chartData, setChartData] = useState({});

//   useEffect(() => {
//     const getChartData = async () => {
//       try {
//         const response = await fetch(`${API}/sales/salesByTopProduct`);
//         const data = await response.json();

//         const months = [];
//         const products = {};

//         // Loop through the API response data and create an object with months and products data
//         data.forEach((item) => {
//           const monthYear = `${item.month} ${item.year}`;

//           if (!months.includes(monthYear)) {
//             months.push(monthYear);
//           }

//           item.products.forEach((product) => {
//             if (!products[product.product.name]) {
//               products[product.product.name] = {
//                 label: product.product.name,
//                 data: [],
//               };
//             }

//             products[product.product.name].data.push(product.totalSales);
//           });
//         });

//         // Convert the data to a format that can be used by Chart.js
//         const datasets = Object.values(products);

//         const chartData = {
//           labels: months,
//           datasets,
//         };

//         setChartData(chartData);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getChartData();
//   }, []);

//   // const setDatasets = () => {
//   //   return chartData.datasets.map((dataset) => {
//   //     return {
//   //       ...dataset,
//   //       backgroundColor: "rgba(75,192,192,0.4)",
//   //       borderColor: "rgba(75,192,192,1)",
//   //       borderWidth: 1,
//   //     };
//   //   });
//   // };
//   // const setDatasets = (data) => {
//   //   if (!data) return [];
  
//   //   const datasets = products.map((product) => {
//   //     const sales = data.map((month) => {
//   //       const productData = month.products.find(
//   //         (p) => p.product._id === product._id
//   //       );
  
//   //       return productData ? productData.totalSales : 0;
//   //     });
  
//   //     return {
//   //       label: product.name,
//   //       data: sales,
//   //       backgroundColor: getRandomColor(),
//   //       borderWidth: 1,
//   //     };
//   //   });
  
//   //   return datasets;
//   // };
  
//   const setDatasets = (data) => {
//     const products = data.map((d) => d.products.map((p) => p.product.name))[0];
//     const datasets = products.map((product) => {
//       const dataByProduct = data.reduce((acc, curr) => {
//         const productData = curr.products.find((p) => p.product.name === product);
//         const totalSales = productData ? productData.totalSales : 0;
//         return [...acc, totalSales];
//       }, []);
//       const color = getRandomColor();
//       return {
//         label: product,
//         backgroundColor: color,
//         borderColor: color,
//         borderWidth: 1,
//         hoverBackgroundColor: color,
//         hoverBorderColor: color,
//         data: dataByProduct,
//       };
//     });
//     return datasets;
//   };
  
//   return (
//     <div>
//       <Bar
//         data={{
//           labels: chartData.labels,
//           datasets: setDatasets(),
//         }}
//         options={{
//           responsive: true,
//           maintainAspectRatio: false,
//         }}
//       />
//     </div>
//   );
// };

// export default Dashboarbar;
