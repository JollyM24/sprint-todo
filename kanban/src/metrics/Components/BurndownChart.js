import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';
import '../Metrics.css'

ChartJS.register(
    Title, Tooltip, LineElement, Legend,
    CategoryScale, LinearScale, PointElement, Filler
  )

function BurndownChart( { dates, donesTotal, plan } ) {
    
    const [charData, setCharData] = useState({
        labels: [],
        datasets: []
    })

    useEffect(() => {
        setCharData({
            labels: dates,
            datasets:[
              {
                label:"Фактическая тенденция",
                data: donesTotal,
                borderColor:'red',
                pointBorderColor:'red',
                pointBackgroundColor:'#fff',
                showLine:true
              }, {
                label:"Идеальная тенденция",
                data: plan,
                borderColor:'grey',
                pointBorderColor:'grey',
                pointBackgroundColor:'white',
                showLine:true
              }
            ]
          })
    }, [])
//bla
    return (
        <div className="metric-container">
            <div className="title">
                <h2>Диаграмма сгорания задач</h2>
                <h4>По активному спринту</h4>
            </div>

          <div className="chart">
                <Line data={charData} />
              </div>
        </div>
    )
};

export default BurndownChart;