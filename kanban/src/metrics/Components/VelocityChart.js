import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import '../Metrics.css'

ChartJS.register(
    CategoryScale, LinearScale, BarElement,
    Title, Tooltip, Legend
  );

function VelocityChart( { dates, donesTotal, donesCount } ) {
    
    const [charData, setCharData] = useState({
        labels: [],
        datasets: [],
        options: []
    })

    useEffect(() => {
            setCharData({
            labels: dates,
            datasets:[
              {
                label:"Запланировано",
                data: donesTotal,
                backgroundColor:'grey'
              }, {
                label:"Сделано",
                data: donesCount,
                backgroundColor:'red'
              }
            ]
          })
    }, [])

    return (
        <div className="metric-container">
            <div className="title">
                <h2>Диаграмма скорости</h2>
                <h4>По активному спринту</h4>
            </div>

            <div className="chart">
                { <Bar data={charData} />}
              </div>
        </div>
    )
};

export default VelocityChart;